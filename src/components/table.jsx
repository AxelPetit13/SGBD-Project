import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  hidden: { opacity: 0 },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -50 },
};

const Row = ({
  data,
  head,
  nbRow,
  selected,
  setSelected,
  modification,
  rows,
  setRows,
}) => {
  useEffect(() => {}, [modification]);

  return (
    <RowContainer change={modification}>
      <RowContent
        size={data.length}
        head={head}
        onClick={() => {
          const array = new Array(selected.length).fill(false);
          array[nbRow] = true;
          setSelected(array);
        }}
      >
        {data.map((elt, i) => (
          <span key={i}>{elt}</span>
        ))}
      </RowContent>
      <AnimatePresence>
        {modification && (
          <motion.button
            variants={item}
            exit={{ opacity: 0 }}
            className="close"
            onClick={() => {
              setRows(rows.filter((item, i) => i !== nbRow));
            }}
          ></motion.button>
        )}
      </AnimatePresence>
    </RowContainer>
  );
};

const RowContainer = styled.div`
  position: relative;

  height: 44px;
  margin: ${(props) => (props.change ? "10px" : "0")};
  background-color: ${(props) =>
    props.change ? "rgba(255, 255, 255, 0.2)" : ""};
  border-radius: 8px;
  transition: all 100ms ease-out;

  &:hover {
    background-color: #1a1c22;
  }

  .close {
    position: absolute;
    border-radius: 50%;
    height: 15px;
    aspect-ratio: 1/1;
    top: 8px;
    right: 10px;
    background-color: red;
  }
`;
const RowContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.head ? "#1a1c22;" : "")};

  span {
    width: ${(props) => (1 / props.size) * 100 + "%"};
    text-align: center;
  }
`;
const Table = (props) => {
  const [rows, setRows] = useState(props.body);
  return (
    <motion.div initial={"hidden"} animate={"visible"} variants={list}>
      <TableContainer>
        <div className="head">
          <Row nbRow={-1} head data={props.head} />
        </div>
        <div className="body">
          {rows.map((row, i) => (
            <motion.div variants={item} key={i}>
              <Row
                nbRow={i}
                data={row}
                selected={props.handler}
                setSelected={props.setHandler}
                modification={props.modification}
                rows={rows}
                setRows={setRows}
              />
            </motion.div>
          ))}
        </div>
      </TableContainer>
    </motion.div>
  );
};

const TableContainer = styled.div`
  border-radius: 16px;
  overflow: scroll;
  border: 1px solid red;
  height: 100%;
`;

export default Table;
