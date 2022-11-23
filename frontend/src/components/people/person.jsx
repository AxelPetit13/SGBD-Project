import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face2";
import Face2Icon from "@mui/icons-material/Face2";
import Face3Icon from "@mui/icons-material/Face3";
import Face4Icon from "@mui/icons-material/Face4";
import Face5Icon from "@mui/icons-material/Face5";
import Face6Icon from "@mui/icons-material/Face6";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const faces = [
  <FaceIcon style={{ fontSize: "8rem", color: COLORS[0] }} />,
  <Face2Icon style={{ fontSize: "8rem", color: COLORS[1] }} />,
  <Face3Icon style={{ fontSize: "8rem", color: COLORS[2] }} />,
  <Face4Icon style={{ fontSize: "8rem", color: COLORS[3] }} />,
  <Face5Icon style={{ fontSize: "8rem", color: COLORS[0] }} />,
  <Face6Icon style={{ fontSize: "8rem", color: COLORS[1] }} />,
];

const Person = ({ id, name, firstName, mail }) => {
  const [selected, setSelected] = useState(false);
  return (
    <Link
      to={`/people${id}`}
      style={{ textDecoration: "none", color: "white" }}
    >
      <PersonContainer>
        <div className="id">#{id}</div>
        <div className="icon">{faces[(id - 1) % 6]}</div>
        <div className="identity">
          <span>{firstName}</span>
          <span>{name}</span>
        </div>

        {/*<div className="states">
        {states.map((state) => (
          <span key={uuidv4()}>{state}</span>
        ))}
      </div>*/}
      </PersonContainer>
    </Link>
  );
};

const PersonContainer = styled.div`
  background-color: #1a1c22;
  /*border: 1px solid white;*/
  border-radius: 8px;
  padding: 10px;
  width: 200px;
  aspect-ratio: 1/1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 300ms ease;
  /*transform: ${(props) => `scale(${props.scale})`};*/

  .id {
    position: absolute;
    left: 5px;
    top: 5px;
    color: gray;
    font-size: 0.7rem;
  }

  .identity {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
  .states {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .hidden {
    display: none;
  }

  /*&:hover {
    box-shadow: 1px 1px 3px 3px #363636;
  }*/

  .icon {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Person;
