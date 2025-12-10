import Slider from "react-slick";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { Category } from "@/types/product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SliderComponent = (Slider as any).default ?? Slider;

const Section = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px 50px 0;
`;

const SliderWrapper = styled(SliderComponent)`
  :focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .slick-dots {
    bottom: -50px;

    li button:before {
      opacity: 1 !important;
      color: #d9d9d9;
      font-size: 14px;
    }

    li.slick-active button:before {
      color: #e13b30;
    }
  }
`;

const CategoryLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 136px;
  text-decoration: none;

  &:hover img {
    opacity: 0.7;
  }
`;

const CategoryImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 16px;
  object-fit: cover;
  transition: all 0.3s;
`;

const CategoryName = styled.p`
  margin: auto 0 0 0;
  font-size: 16px;
  font-weight: 400;
  transition: color 0.3s;
  color: #000000;
`;

const CategoryMenu = ({ categories = [] }: { categories?: Category[] }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1140,
        settings: { slidesToShow: 8 },
      },
      {
        breakpoint: 1020,
        settings: { slidesToShow: 7 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 780,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 520,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <Section aria-label="Category menu">
      <SliderWrapper {...settings}>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryLink to={`/`}>
              <CategoryImage
                src={category.image}
                alt={category.name}
                loading="lazy"
              />
              <CategoryName>{category.name}</CategoryName>
            </CategoryLink>
          </div>
        ))}
      </SliderWrapper>
    </Section>
  );
};

export default CategoryMenu;
