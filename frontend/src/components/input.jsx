import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Input = ({ content, i, j, edit, alreadyExist, type }) => {
  const [value, setValue] = useState(type === "empty" ? "" : content);
  return (
    <InputContainer type={type}>
      <motion.input
        layout
        initial={
          alreadyExist
            ? { backgroundColor: "rgb(17,18,21)" }
            : { backgroundColor: "#1a1c22" }
        }
        animate={{ backgroundColor: "rgb(17,18,21)" }}
        transition={{ duration: 0.5, delay: (i + j) * 0.05 }}
        placeholder={content}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  input {
    border: none;
    text-align: center;
    border-width: 1px;
    border-radius: 8px;
    color: ${(props) =>
      props.type === "empty" ? "rgba(88,161,133,0.99)" : "white"};
    font-size: 1rem;
  }
`;

export default Input;
