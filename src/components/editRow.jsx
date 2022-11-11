import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "./input.jsx";
import { AnimatePresence, motion } from "framer-motion";

const EditRow = ({ data, i, type }) => {
  const size = data.length;
  return (
    <RowContainer
      size={size}
      initial={{ backgroundColor: "rgb(17, 18, 21)" }}
      animate={{ backgroundColor: "#1a1c22" }}
      exit={{
        backgroundColor: "rgb(17, 18, 21)",
        opacity: 0,
      }}
      transition={{ duration: 1 }}
    >
      {data.map((item, j) => (
        <motion.div
          key={j}
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

const RowContainer = styled(motion.div)`
  /*z-index: 100;*/
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 44px;
  border-radius: 16px;

  .input-area {
    width: ${(props) => 100 / props.size + "%"};
    position: relative;
  }
`;

export default EditRow;
