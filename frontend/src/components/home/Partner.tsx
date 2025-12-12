import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  margin-bottom: 100px;

  @media (max-width: 640px) {
    gap: 20px;
  }

  @media (max-width: 520px) {
    gap: 10px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 10px 0 40px 0;
  color: #252525;

  @media (max-width: 520px) {
    margin: 10px 0 20px 0;
  }
`;

const Row = styled.div<{ $bottom?: boolean }>`
  display: grid;
  gap: 50px;
  justify-items: center;
  grid-template-columns: ${(p) =>
    p.$bottom ? "repeat(3, 1fr)" : "repeat(4, 1fr)"};

  @media (max-width: 900px) {
    gap: 30px;
  }

  @media (max-width: 640px) {
    gap: 20px;
  }

  @media (max-width: 520px) {
    gap: 10px;
  }

  @media (max-width: 370px) {
    grid-template-columns: ${(p) =>
      p.$bottom ? "repeat(2, 1fr)" : "repeat(2, 1fr)"};
  }
`;

const ImageBox = styled.div`
  width: 128px;
  height: 128px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 110px;
    height: 110px;
  }

  @media (max-width: 640px) {
    width: 90px;
    height: 90px;
  }

  @media (max-width: 520px) {
    width: 80px;
    height: 80px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Partner = ({ items = [] }: { items?: string[] }) => {
  const topRow = items.slice(0, 4);
  const bottomRow = items.slice(4, 7);

  return (
    <Wrapper>
      <Title>ร้านค้าที่ร่วมขายกับเรา</Title>
      <Row>
        {topRow.map((img, i) => (
          <ImageBox key={`${img}-${i}`}>
            <Img src={img} alt="Partner logo" loading="lazy" />
          </ImageBox>
        ))}
      </Row>

      <Row $bottom>
        {bottomRow.map((img, i) => (
          <ImageBox key={`${img}-${i}`}>
            <Img src={img} alt="Partner logo" loading="lazy" />
          </ImageBox>
        ))}
      </Row>
    </Wrapper>
  );
};

export default Partner;
