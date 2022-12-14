import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import Row from "./row.jsx";

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1) arr.splice(index, 1);
}

function filterData(inputText, data) {
  let filterData;
  if (inputText === "") {
    filterData = [...data];
  } else {
    filterData = data.filter((item) => {
      let c = 0;
      item.forEach((word) => {
        if (word.toLowerCase().includes(inputText.toLowerCase())) {
          c++;
        }
      });

      return c > 0;
    });
  }

  return filterData;
}

const Board = ({ data, edit, alreadyExist, setAlreadyExist, inputText }) => {
  let rowsId = [];
  for (let i = 0; i < data.body.length; i++) {
    rowsId.push(data.body[i][0]);
  }
  const [IDs, setIDs] = useState(rowsId);
  const [rows, setRows] = useState(data.body);
  const [rowHovered, setRowHovered] = useState(null);
  useEffect(() => {
    setRows(filterData(inputText, data.body));
  }, [inputText, data]);

  return (
    <BoardContainer edit={edit}>
      <div className="head">
        <div className="row-container">
          <Row data={data.head} type={"head"} edit={edit} i={0} />
        </div>
      </div>
      <motion.div className="body">
        {edit && (
          <motion.div
            className={"row-container"}
            initial={{ height: "44px", opacity: 0 }}
            animate={{ height: "66px", opacity: 1 }}
          >
            <Row data={data.head} edit={edit} type={"empty"} />
            <motion.button className={"add"}> + </motion.button>
          </motion.div>
        )}
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          transition={{ duration: 1, staggerChildren: 0.05 }}
          variants={variants}
        >
          <AnimatePresence mode={"popLayout"}>
            {rows.map((row, i) => (
              <motion.div
                className={"row-container"}
                layout
                initial={{ opacity: 1 }}
                animate={edit ? { height: "66px" } : { height: "44px" }}
                variants={variants}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: "tween" }}
                key={IDs[i]}
              >
                <Row
                  data={row}
                  edit={edit}
                  i={i}
                  alreadyExist={alreadyExist}
                  isHovered={rowHovered === i}
                />

                {edit && (
                  <motion.button
                    className={"delete"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (i + row.length) * 0.05 }}
                    onClick={() => {
                      const newIDs = [...IDs];
                      const newRows = [...rows];
                      console.log(newIDs);
                      removeItem(newIDs, IDs[i]);
                      removeItem(newRows, row);
                      setIDs(newIDs);
                      setRows(newRows);

                      setAlreadyExist(true);
                      setRowHovered(null);
                      fetch(
                        `http://localhost:1234/api/${data.route}/${IDs[i]}`,
                        {
                          method: "delete",
                        }
                      )
                        .then((res) => res.json())
                        .then((json) => console.log(json));
                    }}
                    onMouseEnter={() => {
                      setRowHovered(i);
                      setAlreadyExist(true);
                    }}
                    onMouseLeave={() => {
                      setRowHovered(null);
                    }}
                  >
                    X
                  </motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </BoardContainer>
  );
};

const BoardContainer = styled(motion.div)`
  height: 100%;
  position: relative;
  overflow: scroll;

  .head {
    position: sticky;
    top: 0;
    z-index: 1;
    height: 44px;
  }
  .body {
    display: flex;
    flex-direction: column;
  }

  .row-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: white;

    .link {
      width: 100%;
      text-decoration: none;
      color: white;
    }

    button {
      position: absolute;
      top: 50%;
      right: 22px;
      transform: translateY(-50%) scale(1);

      border-radius: 50%;
      border: none;
      height: 25px;
      aspect-ratio: 1/ 1;
      color: white;
      font-weight: bold;
      transition: all 200ms ease;

      &:active {
        transform: translateY(-50%) scale(0.8);
      }

      &.delete {
        background-color: indianred;
        &:hover {
          border: 1px solid white;
        }
      }
      &.add {
        background-color: white;
        color: rgba(88, 161, 133, 0.99);
        /*border: 1px solid black;*/
      }
    }
  }
`;
export default Board;
