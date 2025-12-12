import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import styled from "styled-components";
import type { Product } from "@/types/product";
import { getProductById } from "@/api/products";
import toast from "react-hot-toast";

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 40px;
`;

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 40px;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1280px) {
    max-width: 900px;
  }
`;

const MainImage = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  margin-bottom: 10px;
  position: relative;
  padding-top: 100%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

const ThumbButton = styled.button`
  border: none;
  border-radius: 12px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 90px;
    object-fit: cover;
    display: block;

    @media (max-width: 1280px) {
      height: 60px;
    }

    @media (max-width: 1024px) {
      height: 110px;
    }

    @media (max-width: 650px) {
      height: 90px;
    }
  }

  &:hover img {
    opacity: 0.7;
  }
`;

const InfoWrapper = styled.div`
  padding-top: 50px;
  padding-left: 0;
  position: relative;

  @media (min-width: 1024px) {
    padding-left: 40px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #252525;
  margin: 30px 0;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Code = styled.p`
  color: #6c6c70;
  font-size: 1rem;
`;

const Price = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: #252525;
`;

const DescriptionWrapper = styled.div`
  margin-bottom: 30px;

  h3 {
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    color: #6c6c70;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonAdd = styled.button`
  width: 48%;
  height: 56px;
  border: 1px solid #e13b30;
  cursor: pointer;
  background: #f7cecb;
  border-radius: 24px;
  color: #e13b30;
  font-weight: 500;
  font-size: 1rem;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    opacity: 0.7;
  }
`;

const ButtonBuy = styled.button`
  width: 48%;
  height: 56px;
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
  gap: 10px;

  &:hover {
    opacity: 0.7;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
`;

const ButtonBack = styled(ButtonBuy)`
  margin-top: 20px;
  width: 300px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  color: #252525;
  margin-bottom: 25px;
  transition: color 0.2s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #bfbfbf;
  }
`;

const ProductDetail = () => {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch product";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(0);
  if (loading) {
    return (
      <Main>
        <p>กำลังโหลดสินค้า...</p>
      </Main>
    );
  }

  if (!product) {
    return (
      <Main>
        <Title>Product not found</Title>
        <ButtonBack>
          <StyledLink to="/">
            <ChevronLeft size={22} />
            Back to Home
          </StyledLink>
        </ButtonBack>
      </Main>
    );
  }

  return (
    <Grid>
      <div>
        <BackLink to="/product-list">
          <ChevronLeft size={22} />
          Back to Products
        </BackLink>
        <MainImage>
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            loading="lazy"
          />
        </MainImage>

        <ThumbnailGrid>
          {product.images.map((image, index) => (
            <ThumbButton
              key={image + index}
              type="button"
              aria-pressed={selectedImage === index}
              aria-label={`Select image ${index + 1}`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                loading="lazy"
              />
            </ThumbButton>
          ))}
        </ThumbnailGrid>
      </div>

      <InfoWrapper>
        <Title>{product.name}</Title>

        <Code>Code: {product.code}</Code>

        <Price>฿{product.price.toLocaleString("th-TH")}</Price>

        {product.description && (
          <DescriptionWrapper>
            <h3>Description</h3>
            <p>{product.description}</p>
          </DescriptionWrapper>
        )}

        <ButtonRow>
          <ButtonAdd type="button" aria-label="Add to cart">
            <ShoppingCart />
            เพิ่มไปยังรถเข็น
          </ButtonAdd>

          <ButtonBuy type="button" aria-label="Buy product">
            ซื้อสินค้า
          </ButtonBuy>
        </ButtonRow>
      </InfoWrapper>
    </Grid>
  );
};

export default ProductDetail;
