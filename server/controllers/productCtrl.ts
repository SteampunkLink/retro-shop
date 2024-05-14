import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Product, { IReview } from "../models/productModel";

export interface IGetOneProdParams {
  id: string;
}

interface IGetOneProdQuery {
  pageNumber?: number;
  keyword?: string;
}

// @desc - get all of the products (public)
// @path - GET /api/products
export const getAllProducts: RequestHandler<
  unknown,
  unknown,
  unknown,
  IGetOneProdQuery
> = asyncHandler(async (req, res, next) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keywordQuery = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keywordQuery });
  const allProducts = await Product.find({ ...keywordQuery })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res
    .status(200)
    .json({ products: allProducts, page, pages: Math.ceil(count / pageSize) });
});

// @desc - get one product by id (public)
// @path - GET /api/products/:id
export const getOneProduct: RequestHandler<
  IGetOneProdParams,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res, next) => {
  const prodId = req.params.id;
  const product = await Product.findById(prodId);
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }
  res.status(200).json(product);
});

// @desc - create a product (private - admin only)
// @path - POST /api/products/
export const createProduct: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.session.userId,
      image: "/image/sample.jpg",
      brand: "Sample brand",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  }
);

interface ICreateProductBody {
  name: string;
  price: number;
  description: string;
  brand: string;
  tags: string;
  countInStock: number;
  image: string;
}

// @desc - edit one product by id (private - admin only)
// @path - PATCH /api/products/:id
export const updateProduct: RequestHandler<
  IGetOneProdParams,
  unknown,
  ICreateProductBody,
  unknown
> = asyncHandler(async (req, res, next) => {
  const { name, price, description, brand, tags, countInStock, image } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.tags = tags.split(", ");
    product.countInStock = countInStock;
    product.image = image;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// @desc - delete one product by id (private - admin only)
// @path - DELETE /api/products/:id
export const deleteProduct: RequestHandler<
  IGetOneProdParams,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

interface ICreateReviewBody {
  rating: number;
  comment: string;
}

// @desc - create a new review (private)
// @path - POST /api/products/:id/reviews
export const createProductReview: RequestHandler<
  IGetOneProdParams,
  unknown,
  ICreateReviewBody,
  unknown
> = asyncHandler(async (req, res, next) => {
  const newReview: IReview = {
    user: req!.session!.userId!,
    name: req!.session!.userName!,
    comment: req.body.comment,
    rating: req.body.rating,
  };
  const productToReview = await Product.findById(req.params.id);
  if (productToReview) {
    const alreadyReviewed = productToReview.reviews.find(
      (review) => review.user.toString() === req.session.userId?.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    productToReview.reviews.push(newReview);
    productToReview.numReviews = productToReview.reviews.length;
    productToReview.rating =
      productToReview.reviews.reduce((acc, review) => acc + review.rating, 0) /
      productToReview.reviews.length;

    await productToReview.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// @desc - get top products (public)
// @path - GET /api/products/top
export const getTopProducts: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const products = await Product.find({ countInStock: { $gt: 0 } })
      .sort({ rating: -1 })
      .limit(3);
    if (!products) {
      res.status(404);
      throw new Error("Product Not Found");
    }
    res.status(200).json(products);
  }
);
