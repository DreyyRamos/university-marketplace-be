import type { User } from "./user.types.ts";

export interface Product {
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  product_description: string;
  product_details: string;
  rating: number;
  condition: "LINE_NEW" | "GOOD" | "STILL_USABLE";
  location: string;
  selled_id?: string;
  seller?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductPayload {
  product_name: string;
  product_price: number;
  product_image: string;
  product_description: string;
  product_details: string;
  rating: number;
  condition: "LIKE_NEW" | "GOOD" | "STILL_USABLE";
  location: string;
}
