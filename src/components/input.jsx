import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Input = ({ content, size, i, j, type }) => {
  const [value, setValue] = useState(type === "empty" ? "" : content);
  return (
    <motion.div initial={{ height: "44px" }} animate={{ height: "66px" }}>
      <InputContainer size={size} type={type}>
        <motion.div
          className="background"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: (i + j) * 0.03,
            },
          }}
        ></motion.div>
        <input
          type={"text"}
          value={value}
          placeholder={content}
          onChange={(e) => setValue(e.target.value)}
        />
      </InputContainer>
    </motion.div>
  );
};

const InputContainer = styled.div`
  height: fit-content;
  width: fit-content;
  display: grid;
  grid-template-columns: 3px 50fr 3px;
  grid-template-rows: 3px 40fr 3px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:hover {
    .background {
      background-color: ${(props) =>
        props.type === "empty" ? "#00b900" : "#c4c4c4"};
    }
  }

  .background {
    grid-area: 1 / 1 / 4 / 4;
    background-color: ${(props) =>
      props.type === "empty" ? "#018601" : "#565656"};
    border-radius: 8px;
  }

  input {
    z-index: 1;
    grid-area: 2 / 2 / 3 / 3;
    background-color: ${(props) =>
      props.type === "empty" ? "#edffd2" : "rgb(16, 17, 21)"};
    color: ${(props) => (props.type === "empty" ? "#018601;" : "white")};

    border: none;
    border-radius: 5px;
    font-size: 1rem;
    text-align: center;

    &::placeholder {
      color: ${(props) => (props.type === "empty" ? "#018601;" : "white")};
    }
  }
`;

export default Input;
