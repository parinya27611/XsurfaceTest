import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash } from "lucide-react";
import search from "@/assets/header/search.png";
import type { Product } from "@/types/product";
import styled from "styled-components";
import Slider from "react-slick";
import { getProducts, deleteProduct } from "@/api/products";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SliderComponent = (Slider as any).default ?? Slider;

const Wrapper = styled.div`
  flex: 1;
  min-height: 100%;
  background: var(--background);
`;

const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 620px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin: 10px 0 40px 10px;
  color: #252525;

  @media (max-width: 620px) {
    margin: 0 0 10px 10px;
  }
`;

const SearchRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 10px;

  @media (min-width: 640px) {
    flex-direction: row;
    margin-bottom: 30px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  height: inherit;
  align-items: center;
  position: relative;
`;

const IconSearch = styled.img`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translate(0px, -50%);
  z-index: 1;
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  border-radius: 24px;
  padding-left: 45px;
  position: relative;
  color: #bcbcc0;
  font-weight: 400;
  font-size: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 20px;

  &::placeholder {
    color: #bcbcc0;
    opacity: 1;
    transition: color 0.2s ease;
  }

  &:focus {
    outline: none;
    border-color: #b0b0b0ff;
    background: #ffffff;

    ::placeholder {
      color: #ccc;
    }
  }
`;

const UploadBtn = styled(Link)`
  width: 240px;
  height: 44px;
  border: none;
  cursor: pointer;
  background: #e13b30;
  border-radius: 24px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1rem;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 50px;
  gap: 10px;

  @media (min-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 680px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 620px) {
    padding: 0;
    gap: 0px;
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  padding: 10px;
  position: relative;
  justify-content: center;
`;

const CardLink = styled(Link)`
  width: 100%;
  max-width: 200px;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s;
  box-shadow: 0px 4px 10px 0px #0000001a;
  display: block;
  text-decoration: none;

  &:hover img {
    opacity: 0.7;
  }
`;
const GroupButton = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  max-width: 200px;
  top: 3px;
  right: 50%;
  transform: translate(50%, 0px);
  display: flex;
  justify-content: flex-end;
`;
const EditBtn = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ef4444;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

const DeleteBtn = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ef4444;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

const SliderWrapper = styled(SliderComponent)`
  :focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .slick-dots {
    bottom: 12px;

    li {
      width: 16px;
      height: 2px;
      margin: 0 2px;
    }

    li button {
      padding: 0;
      width: 100%;
      height: 100%;
    }

    li button:before {
      content: "";
      width: 100%;
      height: 100%;
      border-radius: 2px;
      opacity: 1 !important;
      background: #d9d9d9;
      margin: 3px 0;
    }

    li.slick-active button:before {
      background: #e13b30;
    }
  }
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: 620px) {
    height: 150px;
  }

  @media (max-width: 400px) {
    height: 120px;
  }
`;

const DetailWrapper = styled.div`
  padding: 12px;
`;

const Name = styled.h3`
  font-weight: 400;
  color: #252525;
  font-size: 1rem;
  overflow: hidden;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Code = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: #6c6c70;
  margin: 5px 0;
`;

const Price = styled.p`
  margin: 20px 0 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #e13b30;
  text-align: right;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;

  p:first-child {
    font-size: 1.8rem;
    color: #252525;
  }

  p:last-child {
    margin-top: 8px;
    font-size: 1.25rem;
    color: #252525;
  }
`;

const ProductList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
  };
  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch products";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmed) return;
      await deleteProduct(productId);
      fetchData();
      toast.success("Product deleted successfully");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to deleted product";
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, products]);

  return (
    <Wrapper>
      <Main>
        <Title>Product list</Title>
        <SearchRow>
          <SearchWrapper>
            <IconSearch src={search} alt="" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Name, Catalogue, Code"
              aria-label="Search products by name or code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>

          <UploadBtn to="/product-list/upload">
            <Plus size={16} />
            Upload Product
          </UploadBtn>
        </SearchRow>

        {filteredProducts.length > 0 ? (
          <ProductsGrid>
            {filteredProducts.map((product) => (
              <Card key={product._id}>
                <GroupButton>
                  <EditBtn
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/product-list/upload/${product._id}`);
                    }}
                  >
                    <Pencil size={16} />
                  </EditBtn>
                  <DeleteBtn
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(product._id);
                    }}
                  >
                    <Trash size={16} />
                  </DeleteBtn>
                </GroupButton>
                <CardLink to={`/product-list/${product._id}`}>
                  <SliderWrapper {...settings}>
                    {product.images.map((image, imgIndex) => (
                      <Slide key={`${image}-${imgIndex}`}>
                        <SlideImage
                          src={`${API_BASE}${image}`}
                          alt={`${product.name} ${imgIndex + 1}`}
                          loading="lazy"
                        />
                      </Slide>
                    ))}
                  </SliderWrapper>
                  <DetailWrapper>
                    <Name>{product.name}</Name>
                    <Code>Code: {product.code}</Code>
                    <Price>฿{product.price.toLocaleString("th-TH")}</Price>
                  </DetailWrapper>
                </CardLink>
              </Card>
            ))}
          </ProductsGrid>
        ) : loading ? (
          <p>กำลังโหลดสินค้า...</p>
        ) : (
          <EmptyState>
            <p>No products found</p>
            <p>Try adjusting your search or filter criteria</p>
          </EmptyState>
        )}
      </Main>
    </Wrapper>
  );
};

export default ProductList;
