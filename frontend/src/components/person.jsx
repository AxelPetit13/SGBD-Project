import React from "react";
import styled from "styled-components";
import FaceIcon from "@mui/icons-material/Face2";
import Face2Icon from "@mui/icons-material/Face2";
import Face3Icon from "@mui/icons-material/Face3";
import Face4Icon from "@mui/icons-material/Face4";
import Face5Icon from "@mui/icons-material/Face5";
import Face6Icon from "@mui/icons-material/Face6";
import { Face3 } from "@mui/icons-material";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const faces = [
  <FaceIcon style={{ fontSize: "10rem", color: COLORS[0] }} />,
  <Face2Icon style={{ fontSize: "10rem", color: COLORS[1] }} />,
  <Face3Icon style={{ fontSize: "10rem", color: COLORS[2] }} />,
  <Face4Icon style={{ fontSize: "10rem", color: COLORS[3] }} />,
  <Face5Icon style={{ fontSize: "10rem", color: COLORS[1] }} />,
  <Face6Icon style={{ fontSize: "10rem", color: COLORS[2] }} />,
];

const Person = ({ firstName, lastName, states, i }) => {
  return (
    <PersonContainer>
      <div className="icon">{faces[i % 6]}</div>
      <div className="identity">
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>

      <div className="states">
        {states.map((state) => (
          <span>{state}</span>
        ))}
      </div>
    </PersonContainer>
  );
};

const PersonContainer = styled.div`
  background-color: #1a1c22;
  /*border: 1px solid white;*/
  border-radius: 8px;
  padding: 10px;
  width: calc(20% - 9px);
  aspect-ratio: 1/1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 300ms ease;

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

  &:hover {
    box-shadow: 1px 1px 3px 3px #363636;
    transform: scale(1.05);
    z-index: 100;
  }

  .icon {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Person;
