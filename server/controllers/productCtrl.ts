import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Products from "../models/productModel";

export default interface IGetOneProdParams {
  id: string;
}

// @desc - get all of the products (public)
// @path - GET /api/products
export const getAllProducts: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const allProducts = await Products.find();
    res.status(200).json(allProducts);
  }
);

// @desc - get one product by id (public)
// @path - GET /api/products/:id
export const getOneProduct: RequestHandler<
  IGetOneProdParams,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res, next) => {
  const prodId = req.params.id;
  const product = await Products.findById(prodId);
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }
  res.status(200).json(product);
});
