import React from "react";
import styled from "styled-components";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Header = () => {
  return (
    <HeaderContainer>
      <h1>
        <span className={"blue"}>J</span>
        <span className={"green"}>e</span>
        <span className={"yellow"}>u</span>
        <span className={"orange"}>x </span>
        <span className={"blue"}>d</span>
        <span className={"green"}>e </span>
        <span className={"yellow"}>P</span>
        <span className={"orange"}>l</span>
        <span className={"blue"}>a</span>
        <span className={"green"}>t</span>
        <span className={"yellow"}>e</span>
        <span className={"orange"}>a</span>
        <span className={"blue"}>u</span>
        <span className={"green"}>x</span>
      </h1>
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

  .blue {
    color: #0088fe;
  }
  .green {
    color: #00c49f;
  }
  .yellow {
    color: #ffbb28;
  }
  .orange {
    color: #ff8042;
  }
`;

export default Header;
