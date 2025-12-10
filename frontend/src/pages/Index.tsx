// rfce
import { useEffect, useState } from "react";
import Banner from "@/components/home/Banner";
import CategoryMenu from "@/components/home/CategoryMenu";
import LastView from "@/components/home/LastView";
import ProductSection from "@/components/home/ProductSection";
import CollectionSection from "@/components/home/CollectionSection";
import PromoBanner from "@/components/home/PromoBanner";
import Partner from "@/components/home/Partner";
import { bannerImages } from "@/constants/banner";
import { categories } from "@/constants/categories";
import { collections } from "@/constants/collections";
import { shop } from "@/constants/shop";
import { getProducts } from "@/api/products";
import type { Product } from "@/types/product";
import toast from "react-hot-toast";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch products";
        toast.error(message);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <Banner bannerImages={bannerImages} />
      <CategoryMenu categories={categories} />
      <LastView title="ดูล่าสุด" products={products.slice(0, 8)} />
      <ProductSection
        title="สินค้ายอดนิยม / แนะนำ"
        products={products.slice(0, 8)}
        viewAllLink="/product-list"
      />
      <ProductSection
        title="Xclusive Deal"
        products={products.slice(0, 8)}
        viewAllLink="/product-list"
        flag="product"
      />
      <CollectionSection
        collections={collections}
        products={products.slice(0, 2)}
        viewAllLink="/product-list"
      />
      <PromoBanner />
      <Partner items={shop} />
    </main>
  );
};

export default Index;
