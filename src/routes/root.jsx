import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Menu from "../components/menu.jsx";
import Header from "../components/header.jsx";

const Root = () => {
  return (
    <RootContainer>
      <div className="div1">
        <Header />
      </div>
      <div className="div2">
        <Menu />
      </div>
      <div className="div3">
        <Outlet />
      </div>
    </RootContainer>
  );
};

const RootContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr repeat(4, 2fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100vh;
  width: 100vw;

  .div1 {
    grid-area: 1 / 2 / 2 / 6;
  }
  .div2 {
    grid-area: 1 / 1 / 6 / 2;
  }
  .div3 {
    grid-area: 2 / 2 / 6 / 6;
  }
`;

export default Root;
