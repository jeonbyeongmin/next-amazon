export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
}

export interface ProductPayloadType extends ProductType {
  quantity: number;
}

export interface CartType {
  cartItems: ProductType[];
}
