import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Jeux de plateaux</h1>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #1a1c22;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  h1 {
    font-weight: bold;
    font-size: 3rem;
  }
`;

export default Header;
