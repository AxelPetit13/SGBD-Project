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

const Game = ({
  name,
  author,
  illustrator,
  editor,
  date,
  nbPlayers,
  id,
  selected,
  setSelected,
}) => {
  return (
    <AnimatePresence>
      {selected[id] && (
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          variants={variants}
          exit={"hidden"}
          key={id}
        >
          <GameContainer>
            <h3 className="div1">{name}</h3>
            <img className="div2" src={"src/assets/game.png"} />
            <span className="div3">Auteurs : {author}</span>
            <span className="div4">Illustrateurs : {illustrator}</span>
            <span className="div5">Éditeur : {editor}</span>
            <span className="div6">Date de paruption : {date}</span>
            {/*<span className="div1">{nbPlayers}</span>*/}

            <button
              onClick={() => {
                const array = new Array(selected.length).fill(false);
                setSelected(array);
              }}
            >
              Quitter
            </button>
          </GameContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const GameContainer = styled.div`
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

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  .div1 {
    grid-area: 1 / 1 / 2 / 3;
  }
  .div2 {
    grid-area: 2 / 3 / 4 / 6;
    border: 1px solid red;
  }
  .div3 {
    grid-area: 4 / 1 / 5 / 3;
  }
  .div4 {
    grid-area: 5 / 1 / 6 / 3;
  }
  .div5 {
    grid-area: 4 / 4 / 5 / 6;
  }
  .div6 {
    grid-area: 5 / 4 / 6 / 6;
  }
  img {
    height: 100%;
    border: 1px solid red;
  }

  button {
    grid-area: 1 / 5 / 2 / 6;
    height: 30px;
  }
`;

export default Game;
