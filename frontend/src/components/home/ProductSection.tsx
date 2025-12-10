import Slider from "react-slick";
import type { CustomArrowProps } from "react-slick";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import next from "@/assets/home/next.png";
import back from "@/assets/home/back.png";
import type { Product } from "@/types/product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SliderComponent = (Slider as any).default ?? Slider;

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  flag?: string;
}

const Wrapper = styled.div<{ $isFlag: boolean }>`
  width: 100%;
  background: ${(p) =>
    `linear-gradient(${p.$isFlag ? "#252525" : "#BCCCC3"} 58%, #ffffff 50%)`};
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
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2<{ $isFlag: boolean }>`
  font-size: ${(p) => (!p.$isFlag ? "32px" : "24px")};
  font-weight: 400;
  margin: 0 0 10px 0;
  color: ${(p) => (p.$isFlag ? "#ffffff" : "#252525")};

  &::first-letter {
    color: ${(p) => (p.$isFlag ? "#E13B30" : "inherit")};
  }
  line-height: 50px;
`;

const ViewAllLink = styled(Link)<{ $isFlag: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 400;
  color: ${(p) => (p.$isFlag ? "#ffffff" : "#E13B30")};
  transition: color 0.2s;
  text-decoration: none;
`;

const SlideItem = styled.div``;

const IconButton = styled.img`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0px -20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
`;

const NextArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      aria-label="Next"
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      src={next}
      alt=""
      aria-hidden="true"
    ></IconButton>
  );
};

const PrevArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      aria-label="Previous"
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      src={back}
      alt=""
      aria-hidden="true"
    ></IconButton>
  );
};

const ProductSection = ({
  title,
  products,
  viewAllLink,
  flag = "default",
}: ProductSectionProps) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1100,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 980,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 760,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 520,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 1 },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Wrapper $isFlag={flag === "product"}>
      <Section>
        <HeaderRow>
          <Title $isFlag={flag === "product"}>{title}</Title>

          {viewAllLink && (
            <ViewAllLink $isFlag={flag === "product"} to={viewAllLink}>
              สินค้าทั้งหมด
              <ChevronRight size={16} />
            </ViewAllLink>
          )}
        </HeaderRow>

        <SliderWrapper {...settings}>
          {products.map((product) => (
            <SlideItem key={product._id}>
              <ProductCard product={product} />
            </SlideItem>
          ))}
        </SliderWrapper>
      </Section>
    </Wrapper>
  );
};

export default ProductSection;
