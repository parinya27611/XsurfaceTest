import Slider from "react-slick";
import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SliderComponent = (Slider as any).default ?? Slider;

const Section = styled.section`
  position: relative;
`;

const SliderWrapper = styled(SliderComponent)`
  :focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .slick-dots {
    bottom: 32px;

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
      background: #ffffff;
    }

    li.slick-active button:before {
      background: #6c6c70;
    }
  }
`;

const Slide = styled.div`
  position: relative;
  height: 300px;

  @media (min-width: 640px) {
    height: 400px;
  }

  @media (min-width: 768px) {
    height: 472px;
  }

  @media (min-width: 1440px) {
    height: 500px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Banner = ({ bannerImages = [] }: { bannerImages?: string[] }) => {
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

  return (
    <Section>
      <SliderWrapper {...settings}>
        {bannerImages.map((image, index) => (
          <Slide key={index}>
            <SlideImage src={image} alt={`Banner ${index + 1}`} />
          </Slide>
        ))}
      </SliderWrapper>
    </Section>
  );
};

export default Banner;
