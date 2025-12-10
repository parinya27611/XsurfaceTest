import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  margin-bottom: 100px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin: 10px 0 40px 0;
  color: #252525;
`;

const Row = styled.div<{ $bottom?: boolean }>`
  display: grid;
  gap: 50px;
  justify-items: center;
  grid-template-columns: ${(p) =>
    p.$bottom ? "repeat(3, 1fr)" : "repeat(4, 1fr)"};
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
