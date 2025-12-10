import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 44px;
  font-weight: bold;
  color: #252525;
`;

const Subtitle = styled.p`
  margin-bottom: 30px;
  font-size: 26px;
  color: #252525;
`;

const HomeLink = styled(Link)`
  width: 300px;
  height: 56px;
  border: none;
  cursor: pointer;
  background: #e13b30;
  border-radius: 24px;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }
`;

const NotFound = () => {
  const location = useLocation();
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    titleRef.current?.focus();
  }, [location.pathname]);

  return (
    <Wrapper>
      <Content>
        <Title tabIndex={-1} ref={titleRef} aria-live="assertive">
          404
        </Title>
        <Subtitle>Oops! Page not found</Subtitle>
        <HomeLink to="/" aria-label="Return to Home">
          Return to Home
        </HomeLink>
      </Content>
    </Wrapper>
  );
};

export default NotFound;
