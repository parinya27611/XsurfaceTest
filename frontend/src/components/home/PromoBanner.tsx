import { Link } from "react-router-dom";
import styled from "styled-components";
import wallpast from "@/assets/home/wallpast.png";
import arrow from "@/assets/home/arrow.png";
import wallpaper from "@/assets/home/wallpaper.png";

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto 60px;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
`;

const ImgBackground = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.6) 33.33%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const Content = styled.div`
  margin: 55px 0 0 100px;
`;

const ImgHeader = styled.img`
  width: 132px;
  height: 117px;
`;

const Line = styled.div`
  border-bottom: 1px solid #ffffff;
  width: 460px;
  margin: 50px 0 70px;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  width: 86%;
  margin-bottom: 80px;
`;

const ButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  text-decoration: none;
  border: 1px solid #ffffff;
  border-radius: 20px;
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  width: 280px;
  height: 40px;

  img {
    width: 40px;
    margin-left: 20px;
  }

  &:hover {
    background-color: rgba(206, 206, 206, 0.183);
    color: #fff;
  }
`;

const PromoBanner = () => {
  return (
    <Section aria-label="Promotional banner">
      <ImgBackground src={wallpaper} alt="" aria-hidden="true" loading="lazy" />
      <Overlay>
        <Content>
          <ImgHeader src={wallpast} alt="Wallpast" loading="lazy" />
          <Line />
          <Description>
            บริการตกแต่งผนังที่ให้คุณได้เลือกสไตล์ วัสดุ และ accessories ได้เอง
            โดยมีระบบการผลิตที่เป็นมาตราฐานโดยใช้เครื่องจักรและการกำหนดค่า
            ที่มีความละเอียดสูง รวมไปถึงระบบการติดตั้งที่ง่ายและรวดเร็ว
            เพื่อให้คุณได้ผนังสวยถูกใจเหมือนมีผู้ออกแบบมืออาชีพมาทำให้
            บ้านของคุณสวยด้วย Wallplast
          </Description>
          <ButtonLink to="/product-list" aria-label="View more products">
            View More
            <img src={arrow} alt="" aria-hidden="true" loading="lazy" />
          </ButtonLink>
        </Content>
      </Overlay>
    </Section>
  );
};

export default PromoBanner;
