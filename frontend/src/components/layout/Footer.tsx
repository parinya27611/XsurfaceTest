import styled from "styled-components";
import { Link } from "react-router-dom";
import facebook from "@/assets/home/facebook.png";
import instagram from "@/assets/home/instagram.png";
import tiktok from "@/assets/home/tiktok.png";
import logo from "@/assets/home/logo_footer.png";

const FooterWrapper = styled.footer`
  background: #363638;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 50px 30px;
`;

const Logo = styled.img`
  width: 180px;
  height: 35px;
  margin: auto;
  display: block;
`;

const Title = styled.h2`
  margin: 30px 0 30px;
  font-weight: 400;
  font-size: 0.87rem;
  text-align: center;
  color: #ffffff;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 4fr 3fr;
    gap: 50px;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 0.87rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
  font-size: 0.87rem;

  li,
  a {
    color: #8e8e93;
    list-style: none;
    text-decoration: none;

    span {
      color: #fff;
    }
  }

  address {
    font-style: normal;
  }
`;
const LiLink = styled(Link)`
  color: #8e8e93;
  text-decoration: none;

  &:hover {
    color: #e13b30;
  }
`;

const ButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e13b30;
  color: #fff;
  transition: background 0.2s;
  max-width: 295px;
  width: 100%;
  height: 37px;
  border-radius: 20px;
  font-weight: 400;
  font-size: 0.87rem;
  text-decoration: none;

  &:hover {
    background: #e2594f;
  }
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  img {
    width: 30px;
    height: 30px;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const Divider = styled.div`
  color: #8e8e93;
  text-align: center;
  font-weight: 400;
  font-size: 0.87rem;
  margin-top: 10px;

  span {
    font-weight: 400;
    font-size: 0.87rem;
    color: #fff;
  }
`;

const SubDivider = styled.div`
  color: #8e8e93;
  font-weight: 400;
  font-size: 0.75rem;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Logo src={logo} alt="Xsurface logo" />
        <Title>
          เมื่อวัสดุปิดผิว การตกแต่ง มารวมกันในแพตฟอร์มที่เน้นการออกแบบ
        </Title>
        <Grid>
          <div>
            <SectionTitle>เกี่ยวกับเรา</SectionTitle>
            <List>
              <li>
                <LiLink to="/">เกี่ยวกับเรา</LiLink>
              </li>
              <li>
                <LiLink to="/">สมัครงาน</LiLink>
              </li>
              <li>
                <LiLink to="/">คำถามที่พบบ่อย</LiLink>
              </li>
            </List>
          </div>
          <div>
            <SectionTitle>ติดต่อเรา</SectionTitle>
            <List>
              <li>
                <address>
                  เอ็กซ์เซอร์เฟส 53 ซอย สุขุมวิท 62, บางจาก, พระโขนง, กรุงเทพฯ
                  10260
                </address>
              </li>
              <li>
                <span>อีเมล:</span>
                <a href="mailto:support@xsurface.com"> support@xsurface.com</a>
                <span> เบอร์:</span>
                <a href="tel:+66656562887"> +66 65-656-2887</a>
              </li>
            </List>
          </div>

          <div>
            <SectionTitle>
              สมัครง่ายๆ ก็ลงขายกับเราได้เลย ฟรี ไม่มีค่าใช้จ่าย
            </SectionTitle>
            <ButtonLink to="/">ลงขายสินค้ากับเรา</ButtonLink>
          </div>
        </Grid>
        <Social>
          <LiLink to="/">
            <img src={facebook} alt="Facebook" />
          </LiLink>
          <LiLink to="/">
            <img src={instagram} alt="Instagram" />
          </LiLink>
          <LiLink to="/">
            <img src={tiktok} alt="TikTok" />
          </LiLink>
        </Social>
        <Divider>
          © {new Date().getFullYear()} . Copyright of{" "}
          <span>XSURFACE Co. , Ltd.</span>
        </Divider>
        <SubDivider>
          <LiLink to="/">นโยบายความเป็นส่วนตัว</LiLink>
          <LiLink to="/">ข้อกำหนด และนโยบาย</LiLink>
        </SubDivider>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
