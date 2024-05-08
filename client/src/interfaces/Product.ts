export interface IReview {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IProduct {
  _id: string;
  name: string;
  subheading: string;
  image: string;
  description: string;
  brand: string;
  tags: string[];
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}
