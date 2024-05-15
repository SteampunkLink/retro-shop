import { Model, Schema, model, Types } from "mongoose";

export interface IReview {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

type ReviewModel = Model<IReview>;

const reviewSchema = new Schema<IReview, ReviewModel>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

interface IProduct {
  user: Schema.Types.ObjectId;
  name: string;
  image: string;
  description: string;
  brand: string;
  tags: string[];
  price: number;
  countInStock: number;
  reviews: IReview[];
  rating: number;
  numReviews: number;
  isPublished: boolean;
}

type ProductModel = Model<IProduct>;

const productSchema = new Schema<IProduct, ProductModel>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, default: "Unknown" },
    tags: { type: [String] },
    price: { type: Number, required: true },
    countInStock: { type: Number, default: 0 },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product: ProductModel = model<IProduct, ProductModel>(
  "Product",
  productSchema
);
export default Product;
