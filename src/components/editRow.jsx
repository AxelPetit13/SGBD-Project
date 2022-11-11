import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "./input.jsx";
import { motion } from "framer-motion";

const EditRow = ({ data, i, type }) => {
  const size = data.length;
  return (
    <RowContainer size={size}>
      {data.map((item, j) => (
        <motion.div
          className={"input-area"}
          animate={{
            transition: {
              when: "beforeChildren",
              staggerChildren: 0.5,
            },
          }}
        >
          <Input content={item} key={i} size={size} i={i} j={j} type={type} />
        </motion.div>
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
  background-color: #1a1c22;
  border-radius: 16px;

  /*&:hover {
    background-color: #1a1c22;
  }*/

  .input-area {
    width: ${(props) => 100 / props.size + "%"};
    position: relative;
  }
`;

export default EditRow;
