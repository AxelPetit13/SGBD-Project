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
      <span className={"value"}>{value}</span>
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
  grid-column-gap: 0px;
  grid-row-gap: 0px;

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
    font-size: 24px;
  }
  .info {
    grid-area: 4 / 7 / 5 / 8;
  }
`;

export default Element;
