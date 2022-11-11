import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const Player = ({ id, selected, setSelected }) => {
  return (
    <AnimatePresence>
      {selected[id] && (
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          variants={variants}
          exit={{ opacity: 0 }}
          key={id}
        >
          <PlayerContainer>
            Joueur {id}
            <button
              onClick={() => {
                const array = new Array(selected.length).fill(false);
                setSelected(array);
              }}
            >
              Quitter
            </button>
          </PlayerContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PlayerContainer = styled.div`
  background-color: #1a1c22;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80vh;
  aspect-ratio: 1/1;
  border: 1px solid white;
  border-radius: 16px;
  padding: 20px;
`;

export default Player;
