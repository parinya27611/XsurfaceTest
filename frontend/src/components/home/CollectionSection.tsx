import Slider from "react-slick";
import type { CustomArrowProps } from "react-slick";
import { Link } from "react-router-dom";
import { ChevronRight, Eye } from "lucide-react";
import type { Collection, Product } from "@/types/product";
import styled from "styled-components";
import next from "@/assets/home/next.png";
import back from "@/assets/home/back.png";
import squarePlus from "@/assets/home/squarePlus.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SliderComponent = (Slider as any).default ?? Slider;

interface CollectionSectionProps {
  collections: Collection[];
  products: Product[];
  viewAllLink?: string;
}

const Wrapper = styled.div`
  width: 100%;
  background: linear-gradient(#e5e3cd 55%, #ffffff 0%);
  margin: 50px 0;
`;

const Section = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: 30px 100px 50px;
  position: relative;
`;

const SliderWrapper = styled(SliderComponent)`
  max-width: 1140px;
  margin: 0 auto;

  :focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .slick-dots {
    bottom: -32px;

    li {
      width: 32px;
      height: 4px;
      margin: 0 8px;
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
    }

    li.slick-active button:before {
      background: #e13b30;
    }
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 60px 60px;
  color: #252525;

  div {
    font-size: 16px;
    color: #6c6c70;
    margin-top: 20px;
    width: 257px;
  }
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 400;
  color: #e13b30;
  transition: color 0.2s;
  text-decoration: none;
`;

const CollectionContainer = styled.div``;

const CollectionCard = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  min-height: 300px;
  width: 100%;
  margin: 10px;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const DetailsWrapper = styled.div`
  width: 100%;
  max-width: 450px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 10px;
`;

const Card = styled.div`
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px 0px #00000033;
  min-height: 340px;

  &:hover img {
    opacity: 0.7;
  }
`;

const CardImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
`;

const DetailWrapper = styled.div`
  padding: 15px;
`;

const Name = styled.h3`
  font-weight: 600;
  color: #252525;
  font-size: 16px;
  margin: 0;

  div {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  display: flex;
  justify-content: space-between;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Code = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #6c6c70;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: flex;
    gap: 5px;
  }
`;

const Type = styled.div`
  font-weight: 400;
  font-size: 10px;
  color: #6c6c70;
`;
const Size = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #252525;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0 0 0;
  font-size: 16px;
  font-weight: 600;
  color: #252525;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #6c6c70;
  }
`;

const IconArrow = styled.img`
  width: 42px;
  height: 42px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0px -30px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const NextArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      aria-label="Next collection"
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <IconArrow src={next} alt="" aria-hidden="true" />
    </IconButton>
  );
};

const PrevArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      aria-label="Previous collection"
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <IconArrow src={back} alt="" aria-hidden="true" />
    </IconButton>
  );
};

const CollectionSection = ({
  collections = [],
  products = [],
  viewAllLink,
}: CollectionSectionProps) => {
  const API_BASE = import.meta.env.VITE_API_BASE;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Wrapper>
      <Section aria-label="Collections">
        <HeaderRow>
          <Title>
            Collections
            <div>
              ค้นหาแรงบันดาลใจ ผ่านการออกแบบ
              และคัดสรรวัสดุที่น่าสนใจเข้าไว้ด้วยกัน
            </div>
          </Title>

          {viewAllLink && (
            <ViewAllLink to={viewAllLink}>
              คอลเลคชั่นทั้งหมด
              <ChevronRight size={16} />
            </ViewAllLink>
          )}
        </HeaderRow>
        <SliderWrapper {...settings}>
          {collections.map((collection) => (
            <CollectionContainer key={collection.id}>
              <CollectionCard>
                <ImageWrapper>
                  <img
                    src={collection.image}
                    alt={collection.name}
                    loading="lazy"
                  />
                </ImageWrapper>
                <DetailsWrapper>
                  <ProductsGrid>
                    {products.slice(0, 2).map((product) => (
                      <CardLink
                        to={`/product-list/${product._id}`}
                        key={product._id}
                      >
                        <Card>
                          <CardImageWrapper>
                            <Image
                              src={
                                product.images?.[0]
                                  ? `${API_BASE}${product.images[0]}`
                                  : ""
                              }
                              alt={product.name}
                              loading="lazy"
                            />
                          </CardImageWrapper>
                          <DetailWrapper>
                            <Name>
                              <div>{product.name}</div>
                              <img src={squarePlus} alt="" aria-hidden="true" />
                            </Name>
                            <Code>
                              {product.code}
                              <span>
                                <Eye size={16} />
                                1000
                              </span>
                            </Code>
                            <Type>กระจก</Type>
                            <Size>W60 x H100 x D4.5 cm.</Size>
                            <Price>
                              <div>
                                ${product.price.toLocaleString("th-TH")}
                                <span> /ตรม.</span>
                              </div>
                            </Price>
                          </DetailWrapper>
                        </Card>
                      </CardLink>
                    ))}
                  </ProductsGrid>
                </DetailsWrapper>
              </CollectionCard>
            </CollectionContainer>
          ))}
        </SliderWrapper>
      </Section>
    </Wrapper>
  );
};

export default CollectionSection;
