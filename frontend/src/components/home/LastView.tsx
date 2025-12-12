import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import type { CustomArrowProps } from "react-slick";
import styled from "styled-components";
import next from "@/assets/home/next.png";
import back from "@/assets/home/back.png";
import type { Product } from "@/types/product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SliderComponent = (Slider as any).default ?? Slider;

interface LastViewProps {
  title: string;
  products?: Product[];
}

const Wrapper = styled.div`
  width: 100%;
  margin: 50px 0;
`;

const Section = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: 50px 100px;
  position: relative;

  @media (max-width: 620px) {
    padding: 20px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 10px 0;
  color: #252525;
  line-height: 50px;
`;

const SliderWrapper = styled(SliderComponent)`
  max-width: 910px;
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

  @media (max-width: 620px) {
    .slick-prev {
      display: none !important;
    }
    .slick-next {
      display: none !important;
    }
  }
`;

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 10px;
`;

const Card = styled.div`
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s;

  &:hover img {
    opacity: 0.7;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  transition: transform 0.3s;

  @media (max-width: 620px) {
    height: 100px;
  }
`;

const DetailWrapper = styled.div`
  padding: 20px 0 0 0;
`;

const Name = styled.h3`
  font-weight: 400;
  color: #252525;
  font-size: 0.75rem;
  overflow: hidden;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Price = styled.p`
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #252525;

  span {
    font-size: 0.87rem;
    font-weight: 400;
    color: #6c6c70;
  }
`;

const IconButton = styled.img`
  margin: -20px -20px 0;
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

const LastView = ({ title, products = [] }: LastViewProps) => {
  const [slidesToShow, setSlidesToShow] = useState(6);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 520) setSlidesToShow(3);
      else if (width < 980) setSlidesToShow(4);
      else if (width < 1100) setSlidesToShow(5);
      else setSlidesToShow(6);
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
    arrows: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 980,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 520,
        settings: { slidesToShow: 3 },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Wrapper>
      <Section>
        <HeaderRow>
          <Title>{title}</Title>
        </HeaderRow>

        <SliderWrapper {...settings} key={slidesToShow}>
          {products.map((product) => (
            <div key={product._id}>
              <CardLink to={`/product-list/${product._id}`}>
                <Card>
                  <ImageWrapper>
                    <Image
                      src={product.images?.[0] ? product.images[0] : ""}
                      alt={product.name}
                      loading="lazy"
                    />
                  </ImageWrapper>
                  <DetailWrapper>
                    <Name>{product.name}</Name>
                    <Price>
                      ${product.price.toLocaleString("th-TH")}
                      <span> /ตรม.</span>
                    </Price>
                  </DetailWrapper>
                </Card>
              </CardLink>
            </div>
          ))}
        </SliderWrapper>
      </Section>
    </Wrapper>
  );
};

export default LastView;
