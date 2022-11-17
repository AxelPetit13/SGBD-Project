import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Input from "./input.jsx";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const backgroundColor = (type, edit, isHovered) => {
  if (type === "head") {
    return "#1a1c22";
  } else if (type === "empty") {
    return "#00C49F";
  } else if (isHovered) {
    return "rgb(198,84,84)";
  } else if (edit) {
    return "#1a1c22";
  } else {
    return "rgb(16, 17, 21)";
  }
};

const backgroundColorAnimation = (type, edit, isHovered) => {
  if (type === "head") {
    return { backgroundColor: "#1a1c22" };
  } else if (edit) {
    if (type === "empty") {
      return { backgroundColor: "#00C49F" };
    } else if (isHovered) {
      return { backgroundColor: "rgb(198,84,84)" };
    } else {
      return { backgroundColor: "#1a1c22" };
    }
  }
};

const Row = ({ data, edit, i, alreadyExist, type, isHovered }) => {
  const size = data.length;

  return (
    <RowContainer
      size={size}
      type={type}
      edit={edit}
      isHovered={isHovered}
      className={type}
    >
      {(type === "head" &&
        data.map((item) => <span key={uuidv4()}>{item}</span>)) ||
        (!edit && data.map((item) => <span key={uuidv4()}>{item}</span>)) ||
        data.map((item, j) => (
          <div className={"input-container"} key={uuidv4()}>
            <Input
              content={item}
              i={i}
              j={j}
              edit={edit}
              alreadyExist={alreadyExist}
              type={type}
            />
          </div>
        ))}
    </RowContainer>
  );
};

const RowContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 44px;
  border-radius: 16px;
  font-size: ${(props) => (props.type === "head" ? "1.3rem" : "1rem")};
  font-weight: ${(props) => (props.type === "head" ? 900 : 400)};

  transition: all 300ms ease;
  background-color: ${(props) =>
    backgroundColor(props.type, props.edit, props.isHovered)};

  &:hover {
    background-color: ${(props) => (props.type === "empty" ? "" : "#1a1c22")};
    transform: ${(props) =>
      props.type === "head"
        ? "translateX(0)"
        : props.edit
        ? "translateX(0)"
        : "translateX(5px)"};
  }

  span,
  .input-container {
    width: ${(props) => 100 / props.size + "%"};
    text-align: center;
  }
`;

export default Row;
