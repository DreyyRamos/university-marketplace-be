import type { Product as PrismaProduct } from "../generated/prisma/client.ts";

export enum Category {
  Electronics,
  Books,
  Furniture,
  Clothing,
  Sports,
  Other,
}

export enum Status {
  Active,
  Sold,
  Unavailable,
}

export type Product = PrismaProduct;

export interface CreateProductPayload {
  product_name: string;
  product_price: number;
  product_image: string[];
  product_description: string;
  product_details: string;
  product_status?: Status;
  category: Category;
  rating?: number;
  condition: "LIKE_NEW" | "GOOD" | "STILL_USABLE";
  location: string;
  imageUrl?: string;
}

export interface UpdateProductPayload {
  product_name: string;
  product_price: number;
  product_image: string[];
  product_description: string;
  product_details: string;
  product_status?: Status;
  category: Category;
  rating?: number;
  condition: "LIKE_NEW" | "GOOD" | "STILL_USABLE";
  location: string;
}
