import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Order, { IPaymentResult } from "../models/orderModel";
import { IOrderItem, IShippingAddress } from "../models/orderModel";

export interface ICreateOrderBody {
  // user: Schema.Types.ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
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
export const createOrder: RequestHandler<
  unknown,
  unknown,
  ICreateOrderBody,
  unknown
> = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      user: req.session.userId,
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
  const order = await Order.findById(orderId).populate("user", "name email");
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
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }

  if (order.user.toString() !== req.session.userId?.toString()) {
    res.status(400);
    throw new Error("Unauthorized");
  }

  if (!!order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  }
});

// @desc - Update order to delivered (private - admin only)
// @path - PATCH /api/orders/:id/deliver
export const updateOrderToDelivered: RequestHandler<
  IGetOneOrderParams,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  res.status(200).send("Update order to delivered");
});

// @desc - Get all orders (private - admin only)
// @path - GET /api/orders
export const getOrders: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const orders = await Order.find();
    res.status(200).json(orders);
  }
);
