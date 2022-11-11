import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <h2>Jeux de plateaux</h2>
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

  h2 {
    font-weight: bold;
    font-size: 2rem;
  }
`;

export default Header;
