import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

import { containerClasses, TextField } from "@mui/material";
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
    x: 10,
  },
};

const Visualizer = ({ data }) => {
  const [edit, setEdit] = useState(false);
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
        {edit && (
          <motion.div
            className={"row"}
            initial={{ display: "none", marginTop: 0 }}
            animate={{ display: "flex", marginTop: "22px" }}
            transition={{
              duration: 0,
              delay: 1.2,
            }}
          >
            <motion.div
              className={"row"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <EditRow
                data={[
                  "Nom",
                  "Auteurs",
                  "Illustrateurs",
                  "Éditeur",
                  "Data",
                  "Nombre de joueurs",
                ]}
                type={"empty"}
              />
            </motion.div>
          </motion.div>
        )}
        {data.body.map((row, i) => (
          <motion.div
            className={"row-container"}
            key={i}
            initial={{ height: "44px", y: 0 }}
            animate={
              edit ? { height: "66px", y: "90px" } : { height: "44px", y: 0 }
            }
            transition={{ duration: 1, delay: 0 }}
          >
            {(!edit && (
              <motion.div className={"row"} key={"modal"} variants={item}>
                <Row data={row} />
              </motion.div>
            )) || (
              <motion.div className={"row"}>
                <EditRow data={row} i={i} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </VisualizerContainer>
  );
};

const VisualizerContainer = styled.div`
  height: 100%;
  border: 1px solid white;
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
