import type {
  Product,
  CreateProductDto,
  ProductFormData,
} from "@/types/product";

const API_BASE = import.meta.env.VITE_API_BASE + "/api/products";
export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.error || "Failed to fetch GetProducts";
    throw new Error(message);
  }
  return (await res.json()) as Product[];
};

export const getProductById = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.error || "Failed to fetch GetProduct";
    throw new Error(message);
  }
  const data = await res.json();
  return data as Product;
};

export const createProduct = async (formData: FormData) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || "Failed to create product");
  }
  return (await res.json()) as CreateProductDto;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || "Failed to update product");
  }
  return (await res.json()) as ProductFormData;
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || "Failed to delete product");
  }
};
