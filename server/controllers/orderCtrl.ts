import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
import Order, { IPaymentResult } from "../models/orderModel";
import { IOrderItem } from "../models/orderModel";
import { IAddress } from "../models/addressModel";
import { calcPrices } from "../utils/calculatePrices";
import { verifyPayPalPayment, checkIfNewTransaction } from "../utils/paypal";

export interface ICreateOrderBody {
  orderItems: IOrderItem[];
  shippingAddress: IAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export interface IGetOneOrderParams {
  id: string;
}

// @desc - create new order (private)
// @path - POST /api/orders
export const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x: IOrderItem) => x.product) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient: IOrderItem) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) =>
          itemFromDB._id.toString() === itemFromClient.product.toString()
      );
      return {
        ...itemFromClient,
        product: itemFromClient.product,
        price: matchingItemFromDB!.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.session.userId,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc - get logged in user's orders (private)
// @path - GET /api/orders/myorders
export const getUserOrders: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const orders = await Order.find({ user: req.session.userId });
    res.status(200).json(orders);
  }
);

// @desc - get one of logged in user's orders (private)    FUUUUUUUUUCKK!!!!
// @path - GET /api/orders/myorders/:id
export const getUserOrderById: RequestHandler<
  IGetOneOrderParams,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (order?.user.toString() !== req.session.userId) {
    res.status(401);
    throw new Error("Not authorized.");
  } else {
    res.status(200).json(order);
  }
});

// @desc - get one order (private - admin only)
// @path - GET /api/orders/:id
export const getOrderById: RequestHandler<
  IGetOneOrderParams,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId).populate(
    "user",
    "_id name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

// @desc - Update order to paid (private)
// @path - PATCH /api/orders/:id/pay
export const updateOrderToPaid: RequestHandler<
  IGetOneOrderParams,
  unknown,
  IPaymentResult,
  unknown
> = asyncHandler(async (req, res, next) => {
  // NOTE: here we need to verify the payment was made to PayPal before marking
  // the order as paid
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error("Payment not verified");

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error("Transaction has been used before");

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc - Update order to delivered (private - admin only)
// @path - PATCH /api/orders/:id/delivered
export const updateOrderToDelivered: RequestHandler<
  IGetOneOrderParams,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  console.log("Hello from order", { order });
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

// @desc - Get all orders (private - admin only)
// @path - GET /api/orders
export const getOrders: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const orders = await Order.find({}).populate("user", "_id name");
    res.status(200).json(orders);
  }
);
