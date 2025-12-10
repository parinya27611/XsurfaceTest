import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/header/logo.png";
import search from "@/assets/header/search.png";
import searchImage from "@/assets/header/searchImage.png";
import collection from "@/assets/header/collection.png";
import material_album from "@/assets/header/material_album.png";
import material_board from "@/assets/header/material_board.png";
import cart from "@/assets/header/cart.png";
import profile from "@/assets/header/profile.png";
import setting from "@/assets/header/setting.png";
import { Menu, X } from "lucide-react";

import styled from "styled-components";

const HeaderSticky = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #ffffff;
  border-bottom: 1px solid #e7e3da;
`;

const Container = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 14px 100px;
  box-sizing: border-box;

  @media (max-width: 1300px) {
    padding: 14px 14px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 16px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    height: 30px;
    width: auto;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  height: inherit;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
  position: relative;
`;

const IconSearch = styled.img`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translate(0px, -50%);
  z-index: 1;
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  border-radius: 24px;
  padding-left: 45px;
  position: relative;
  color: #bcbcc0;
  font-weight: 400;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 20px;

  &::placeholder {
    color: #bcbcc0;
    opacity: 1;
    transition: color 0.2s ease;
  }

  &:focus {
    outline: none;
    border-color: #b0b0b0ff;
    background: #ffffff;

    ::placeholder {
      color: #ccc;
    }
  }
`;

const ButtonSearch = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translate(0px, -50%);
  width: 120px;
  height: 34px;
  background-color: #f3f1f2;
  border: none;
  border-radius: 16px;
  font-weight: 400;
  font-size: 12px;
  color: #e13b30;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  img {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #e9e9e9ff;
  }
`;

const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const MobileNav = styled.nav`
  position: absolute;
  width: 100%;
  top: 65px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;

  a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    font-size: 16px;
    padding: 10px 15px;
    margin-bottom: 5px;
    box-sizing: border-box;

    img {
      margin-right: 10px;
    }

    &:hover {
      background-color: #f3f1f2;
    }
  }

  button {
    margin-top: 10px;
    width: 100%;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavIcon = styled(Link)`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.3s ease;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  color: #252525;
  padding: 6px;

  &:hover {
    background: #f3f1f2;
  }

  img {
    height: 16px;
    width: 16px;
    pointer-events: none;
  }
`;

const ButtonLogin = styled.button`
  width: 79px;
  height: 40px;
  border-radius: 16px;
  padding: 0 16px;
  margin: 0 6px;
  background-color: #e13b30;
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const Setting = styled.div`
  width: 21px;
  height: 21px;
  margin: 0 6px;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 15px;
  }
`;

const MobileMenuButton = styled.button`
  @media (min-width: 1024px) {
    display: none;
  }

  background: transparent;
  border: none;
  cursor: pointer;

  svg {
    height: 20px;
    width: 20px;
  }
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <HeaderSticky>
      <Container>
        <HeaderRow>
          <LogoLink to="/">
            <img src={logo} alt="Xsurface logo" />
          </LogoLink>

          <SearchWrapper>
            <IconSearch src={search} alt="" aria-hidden="true" />
            <Input
              type="text"
              placeholder="ค้นหาสินค้า"
              value={searchQuery}
              aria-label="ค้นหาสินค้า"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ButtonSearch type="button">
              <img src={searchImage} alt="" aria-hidden="true" />
              ค้นหาด้วยรูป
            </ButtonSearch>
          </SearchWrapper>
          <DesktopNav role="navigation" aria-label="Main navigation">
            <NavIcon to="/product-list" title="Collections">
              <img src={collection} alt="" aria-hidden="true" />
              คอลเลคชั่น
            </NavIcon>
            <NavIcon to="/product-list" title="Material Album">
              <img src={material_album} alt="" aria-hidden="true" />
              แมททีเรียลอัลบัม
            </NavIcon>
            <NavIcon to="/product-list" title="Material Board">
              <img src={material_board} alt="" aria-hidden="true" />
              แมททีเรียลบอร์ด
            </NavIcon>
            <NavIcon to="/cart" title="Cart">
              <img src={cart} alt="" aria-hidden="true" />
              ตะกร้า
            </NavIcon>
            <NavIcon to="/profile" title="Profile">
              <img src={profile} alt="" aria-hidden="true" />
              โปรไฟล์
            </NavIcon>
            <ButtonLogin type="button">Login</ButtonLogin>
            <Setting>
              <img src={setting} alt="" aria-hidden="true" />
            </Setting>
          </DesktopNav>

          <MobileMenuButton
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </MobileMenuButton>
        </HeaderRow>
      </Container>

      {mobileMenuOpen && (
        <MobileNav id="mobile-nav" role="navigation" aria-label="Mobile menu">
          <NavIcon to="/collections">
            <img src={collection} alt="" aria-hidden="true" />
            <span>Collections</span>
          </NavIcon>
          <NavIcon to="/albums">
            <img src={material_album} alt="" aria-hidden="true" />
            <span>Material Album</span>
          </NavIcon>
          <NavIcon to="/boards">
            <img src={material_board} alt="" aria-hidden="true" />
            <span>Material Board</span>
          </NavIcon>
          <NavIcon to="/cart">
            <img src={cart} alt="" aria-hidden="true" />
            <span>Cart</span>
          </NavIcon>
          <NavIcon to="/profile">
            <img src={profile} alt="" aria-hidden="true" />
            <span>Profile</span>
          </NavIcon>
          <ButtonLogin type="button">Login</ButtonLogin>
        </MobileNav>
      )}
    </HeaderSticky>
  );
};

export default Header;
