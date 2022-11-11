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
  ]);
  useEffect(() => {}, elementState);
  return (
    <MenuContainer>
      <div className="menu-header">
        <span>SGBD</span>
      </div>
      <div className="menu-options">
        <Link to={"/home"} className={"link"}>
          <MenuElement
            onClick={() => {
              setElementState([true, false, false, false]);
            }}
            className={`${elementState[0] ? "selected" : ""}`}
          >
            <HomeOutlinedIcon />
            <h3>Accueil</h3>
          </MenuElement>
        </Link>
        <Link to={"/games"} className={"link"}>
          <MenuElement
            onClick={() => {
              setElementState([false, true, false, false]);
            }}
            className={`${elementState[1] ? "selected" : ""}`}
          >
            <GridViewOutlinedIcon />
            <h3>Jeux</h3>
          </MenuElement>
        </Link>
        <Link to={"/players"} className={"link"}>
          <MenuElement
            onClick={() => {
              setElementState([false, false, true, false]);
            }}
            className={`${elementState[2] ? "selected" : ""}`}
          >
            <Person4OutlinedIcon />
            <h3>Joueurs</h3>
          </MenuElement>
        </Link>
        <Link to={"/comments"} className={"link"}>
          <MenuElement
            onClick={() => {
              setElementState([false, false, false, true]);
            }}
            className={`${elementState[3] ? "selected" : ""}`}
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
  grid-template-rows: 1fr 10fr;
  padding: 23px;
  .menu-header {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-weight: bold;
    }
  }

  .menu-options {
    display: flex;
    flex-flow: column nowrap;

    .link {
      text-decoration: none;
      color: white;
    }
  }

  .selected {
    background-color: #6d61ff;
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

  h3 {
    width: 70%;
  }
`;

export default Menu;
