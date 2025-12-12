import styled from "styled-components";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import discount from "@/assets/home/discount.png";
import deal from "@/assets/home/deal.png";
import squarePlus from "@/assets/home/squarePlus.png";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 10px;
`;

const Card = styled.div`
  background: var(--card);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(var(--border-rgb), 0.5);
  transition: transform 0.3s;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px 0px #00000033;
  min-height: 340px;

  &:hover img {
    opacity: 0.7;
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
  @media (max-width: 768px) {
    height: 177px;
  }
`;

const ImgDeal = styled.img`
  position: absolute;
  top: 10px;
  left: 15px;
  width: 70px;
  height: 16px;
`;

const GroupImgSquare = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;

  img {
    width: 34px;
    height: 16px;
  }
  div {
    position: absolute;
    top: 0;
    font-weight: 500;
    font-size: 0.65rem;
    width: 100%;
    color: #ffffff;
    text-align: center;
  }
`;

const DetailWrapper = styled.div`
  padding: 15px;
`;

const Title = styled.h3`
  font-weight: 600;
  color: #252525;
  font-size: 1rem;
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
  font-size: 0.75rem;
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
  font-size: 0.65rem;
  color: #6c6c70;
`;

const Size = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  color: #252525;
`;

const Discount = styled.div`
  font-weight: 400;
  font-size: 0.65rem;
  color: #6c6c70;
  text-decoration: line-through;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0 0 0;
  font-size: 1rem;
  font-weight: 600;
  color: #e13b30;

  span {
    font-size: 0.87rem;
    font-weight: 400;
    color: #6c6c70;
  }
`;

const InStock = styled.div`
  font-weight: 400;
  font-size: 0.75rem;

  color: #00990d;
`;

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <CardLink to={`/product-list/${product._id}`}>
      <Card>
        <ImageWrapper>
          <Image
            src={product.images?.[0] ? product.images[0] : ""}
            alt={product.name}
            loading="lazy"
          />
          <ImgDeal src={deal} alt="" aria-hidden="true" />
          <GroupImgSquare>
            <img src={discount} alt="" aria-hidden="true" />
            <div>-50%</div>
          </GroupImgSquare>
        </ImageWrapper>
        <DetailWrapper>
          <Title>
            <div>{product.name}</div>
            <img src={squarePlus} alt="" aria-hidden="true" />
          </Title>
          <Code>
            {product.code}
            <span>
              <Eye size={16} />
              1000
            </span>
          </Code>
          <Type>กระจก</Type>
          <Size>W60 x H100 x D4.5 cm.</Size>
          <Discount>฿990.00</Discount>
          <Price>
            <div>
              ${product.price.toLocaleString("th-TH")}
              <span> /ตรม.</span>
            </div>
            <InStock>In stock</InStock>
          </Price>
        </DetailWrapper>
      </Card>
    </CardLink>
  );
};

export default ProductCard;
