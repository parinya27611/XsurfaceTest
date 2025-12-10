export interface Product {
  _id: string;
  name: string;
  code: string;
  price: number;
  category: string;
  images: string[];
  description?: string;
  createdAt?: Date;
}

export interface CreateProductDto {
  name: string;
  code: string;
  price: number;
  images: string[];
}

export type ProductFormData = Partial<CreateProductDto>;

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
}
