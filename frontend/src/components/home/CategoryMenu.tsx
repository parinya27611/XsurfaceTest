import Slider from "react-slick";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { Category } from "@/types/product";
import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SliderComponent = (Slider as any).default ?? Slider;

const Section = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px 50px 0;

  @media (max-width: 620px) {
    padding: 20px;
  }
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
      font-size: 0.87rem;
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

  @media (max-width: 640px) {
    width: 80px;
    height: 80px;
  }
`;

const CategoryName = styled.p`
  margin: auto 0 0 0;
  font-size: 1rem;
  font-weight: 400;
  transition: color 0.3s;
  color: #000000;
`;

const CategoryMenu = ({ categories = [] }: { categories?: Category[] }) => {
  const [slidesToShow, setSlidesToShow] = useState(10);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 400) setSlidesToShow(3);
      else if (width < 520) setSlidesToShow(4);
      else if (width < 780) setSlidesToShow(5);
      else if (width < 900) setSlidesToShow(6);
      else if (width < 1020) setSlidesToShow(7);
      else if (width < 1140) setSlidesToShow(8);
      else setSlidesToShow(10);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow,
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
        breakpoint: 520,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 3 },
      },
    ],
  };
  return (
    <>
      <Section aria-label="Category menu" className="slider-container">
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
    </>
  );
};

export default CategoryMenu;
