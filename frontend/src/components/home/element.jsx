import React from "react";
import styled from "styled-components";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import HandymanIcon from "@mui/icons-material/Handyman";

const icons = [
  <AddBoxIcon fontSize={"large"} />,
  <FileUploadIcon fontSize={"large"} />,
  <IndeterminateCheckBoxIcon fontSize={"large"} />,
  <HandymanIcon fontSize={"large"} />,
];

const Element = ({ title, value, info, idxIcon }) => {
  return (
    <ElementContainer>
      <div className="icon">{icons[idxIcon]}</div>
      <h2>{title}</h2>
      <span className="value">{value}</span>
      <span className="info">{info}</span>
    </ElementContainer>
  );
};

const ElementContainer = styled.div`
  background-color: #1a1c22;
  height: 100%;
  display: grid;
  grid-template-columns: 20px repeat(6, 1fr) 20px;
  grid-template-rows: 20px 2fr 1fr 2fr 20px;

  .icon {
    grid-area: 2 / 2 / 3 / 3;
  }
  h2 {
    grid-area: 2 / 4 / 3 / 7;
    font-weight: 400;
    font-size: 14px;
    color: #9a9a9a;
  }
  .value {
    grid-area: 4 / 2 / 5 / 5;
    font-weight: 500;
    font-size: 0.5rem;
  }
  .info {
    grid-area: 3 / 6 / 5 / 8;
    font-size: 13px;
    display: grid;
    place-items: center;
  }
`;

export default Element;
