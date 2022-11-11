import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Row from "./row.jsx";
import EditRow from "./editRow.jsx";

const list = {
  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.02,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const item = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: 0,
  },
};

const Visualizer = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [rows, setRows] = useState(data.body);
  const [modification, setModification] = useState(false);
  useEffect(() => {}, [edit]);

  return (
    <VisualizerContainer edit={edit}>
      <div className="options">
        <button onClick={() => setEdit(!edit)}>
          {!edit ? "Modifier" : "Valider"}
        </button>
      </div>
      <div className="head">
        <Row data={data.head}></Row>
      </div>

      <motion.div
        className="body"
        initial={"hidden"}
        animate={"visible"}
        variants={list}
      >
        <AnimatePresence>
          {edit && (
            <motion.div
              className={"row"}
              initial={{ display: "none", marginTop: 0 }}
              animate={{ display: "flex", marginTop: "22px" }}
              exit={{
                display: "flex",
                marginTop: 0,
                transition: { delay: 0, duration: 1 },
              }}
              transition={{
                duration: 0,
                delay: 0.2,
              }}
            >
              <motion.div
                className={"row"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { delay: 0, duration: 0.5 } }}
                transition={{ delay: 0.2 }}
              >
                <EditRow data={data.head} type={"empty"} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {rows.map((row, i) => (
          <motion.div
            className={"row-container"}
            key={Math.random(i)}
            initial={
              edit ? { height: "66px", y: "90px" } : { height: "44px", y: 0 }
            }
            animate={
              edit ? { height: "66px", y: "90px" } : { height: "44px", y: 0 }
            }
            transition={{ duration: 1, delay: 0 }}
          >
            <AnimatePresence>
              {(!edit && (
                <motion.div className={"row"} key={"modal"} variants={item}>
                  <Row data={row} />
                </motion.div>
              )) || (
                <div
                  className={"row"}
                  onClick={() => {
                    console.log(rows);
                    setRows(rows.filter((item, j) => j !== i));
                    setModification(true);
                    console.log(rows);
                  }}
                >
                  <EditRow data={row} i={i} key={i} />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </VisualizerContainer>
  );
};

const VisualizerContainer = styled.div`
  height: 100%;
  border-radius: 14px;
  position: relative;
  overflow: hidden;

  .head {
    position: sticky;
    top: 0;
    background-color: #1a1c22;
    height: 44px;
  }

  .body {
    height: calc(100% - 44px);
    overflow: scroll;
    position: relative;

    .row-container {
      position: relative;
    }

    .row {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default Visualizer;
