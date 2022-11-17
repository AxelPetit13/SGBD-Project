import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined.js";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { Link } from "react-router-dom";

const Menu = () => {
  const [elementState, setElementState] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  useEffect(() => {}, elementState);
  return (
    <MenuContainer>
      <div className="menu-header">
        <Link to={"/"} className={"link"}>
          <span className={"blue"}>S</span>
          <span className={"green"}>G</span>
          <span className={"yellow"}>B</span>
          <span className={"orange"}>D</span>
        </Link>
      </div>

      <div className="menu-options">
        <Link to={"/home"} className={"link"}>
          <MenuElement
            onClick={() => {
              setElementState([true, false, false, false, false]);
            }}
            bgColor={elementState[0] ? "#0088fe" : ""}
          >
            <HomeOutlinedIcon />
            <h3>Accueil</h3>
          </MenuElement>
        </Link>
        <Link to={"/people"} className={"link"}>
          <MenuElement
            onClick={() => {
              setElementState([false, true, false, false, false]);
            }}
            bgColor={elementState[1] ? "#fe0072" : ""}
          >
            <HomeOutlinedIcon />
            <h3>Personnes</h3>
          </MenuElement>
        </Link>
        <Link to={"/games"} className={"link"}>
          <MenuElement
            onClick={() => {
              setElementState([false, false, true, false, false]);
            }}
            bgColor={elementState[2] ? "#00c49f" : ""}
          >
            <GridViewOutlinedIcon />
            <h3>Jeux</h3>
          </MenuElement>
        </Link>
        <Link to={"/players"} className={"link"}>
          <MenuElement
            onClick={() => {
              setElementState([false, false, false, true, false]);
            }}
            bgColor={elementState[3] ? "#ffbb28" : ""}
          >
            <Person4OutlinedIcon />
            <h3>Joueurs</h3>
          </MenuElement>
        </Link>
        <Link to={"/comments"} className={"link"}>
          <MenuElement
            onClick={() => {
              setElementState([false, false, false, false, true]);
            }}
            bgColor={elementState[4] ? "#ff8042" : ""}
          >
            <SmsOutlinedIcon />
            <h3>Commentaires</h3>
          </MenuElement>
        </Link>
      </div>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  background-color: #1a1c22;
  height: 100%;

  display: grid;
  grid-template-rows: 1fr repeat(4, 2fr);
  grid-template-columns: 1fr;

  .menu-header {
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-weight: bold;
      font-size: 2rem;
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
  }

  .menu-options {
    grid-area: 2 / 1 / 6 / 2;
    padding: 20px;
    display: flex;
    flex-flow: column nowrap;
    align-items: start;
    .link {
      width: fit-content;
      height: 44px;
      margin: 8px;
    }
  }
  .link {
    text-decoration: none;
    color: white;
  }
`;

const MenuElement = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 9px;
  height: 44px;
  width: 210px;
  margin-bottom: 15px;
  transition: all 300ms ease;
  background-color: ${(props) => props.bgColor};

  h3 {
    width: 70%;
    text-align: center;
  }
`;

export default Menu;
