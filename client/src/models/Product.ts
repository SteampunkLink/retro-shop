export default interface IProduct {
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
