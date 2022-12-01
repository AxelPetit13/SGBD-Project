import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Element from "../components/home/element.jsx";
import TopComment from "../components/home/topComment.jsx";
import Chart from "../components/home/chart.jsx";
import Comments from "../components/home/comments.jsx";
import Comment from "../components/home/comment.jsx";
import TopPlayers from "../components/home/topPlayers.jsx";
import { motion } from "framer-motion";

const container = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      ease: "easeInOut",
    },
  },
  hidden: { opacity: 0 },
};
const item = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Home = () => {
  const [mostCommentedGame, setMostCommentedGame] = useState(undefined);
  const [bestGradedGame, setBestGradedGame] = useState(undefined);
  const [worstGradedGame, setworstGradedGame] = useState(undefined);
  const [mostProlificEditor, setMostProlificEditor] = useState(undefined);
  const [mostActivePlayers, setMostActivePlayers] = useState(undefined);
  useEffect(() => {
    fetch("http://localhost:1234/api/mostCommentedGame")
      .then((res) => res.json())
      .then((json) => setMostCommentedGame(json[0]));

    fetch("http://localhost:1234/api/bestGradedGame")
      .then((res) => res.json())
      .then((json) => setBestGradedGame(json[0]));

    fetch("http://localhost:1234/api/worstGradedGame")
      .then((res) => res.json())
      .then((json) => setworstGradedGame(json[0]));

    fetch("http://localhost:1234/api/mostProlificEditor")
      .then((res) => res.json())
      .then((json) => setMostProlificEditor(json[0]));

    fetch("http://localhost:1234/api/mostActivePlayers")
      .then((res) => res.json())
      .then((json) => setMostActivePlayers(json));
  }, []);
  return (
    <HomeContainer initial={"hidden"} animate={"visible"} variants={container}>
      <motion.div className="div1" variants={item}>
        {mostCommentedGame && (
          <Element
            title={"Jeu le plus commenté"}
            value={mostCommentedGame.game}
            info={mostCommentedGame.nb_comments + " commentaires"}
            idxIcon={0}
          />
        )}
      </motion.div>
      <motion.div className="div2" variants={item}>
        {bestGradedGame && (
          <Element
            title={"Jeu le mieux noté"}
            value={bestGradedGame.game}
            info={"note : " + bestGradedGame.average_mark}
            idxIcon={1}
          />
        )}
      </motion.div>
      <motion.div className="div3" variants={item}>
        {worstGradedGame && (
          <Element
            title={"Jeu le plus mal noté"}
            value={worstGradedGame.game}
            info={"note : " + worstGradedGame.average_mark}
            idxIcon={2}
          />
        )}
      </motion.div>
      <motion.div className="div4" variants={item}>
        {mostProlificEditor && (
          <Element
            idxIcon={3}
            title={"Editeur le plus prolifique"}
            value={mostProlificEditor.editor}
            info={mostProlificEditor.nb_game + " jeux"}
          />
        )}
      </motion.div>
      <motion.div className="div5" variants={item}>
        <TopComment
          author={"John Doe"}
          message={
            "Super Jeu ! En une vingtaine de minutes on peut construire toute une\n" +
            "          civilisation organisée et puissante pour faire face à ses adversaires\n" +
            "          !"
          }
          date={"15-06-2003"}
          mark={1.2}
          game={"Risk"}
        />
      </motion.div>
      <motion.div className="div6" variants={item}>
        {mostActivePlayers && <TopPlayers data={mostActivePlayers} />}
      </motion.div>
      <motion.div className="div7" variants={item}>
        <Chart />
      </motion.div>
      <motion.div className="div8" variants={item}>
        <Comments>
          <Comment />
          <Comment />
          <Comment />
        </Comments>
      </motion.div>
    </HomeContainer>
  );
};

const HomeContainer = styled(motion.div)`
  background-color: rgb(16, 17, 21);
  height: 100%;
  width: 100%;
  border-top-left-radius: 16px;

  display: grid;
  grid-template-columns: 30fr 258fr 30fr 258fr 30fr 60fr 30fr 178fr 179fr 30fr;
  grid-template-rows: 30fr 128fr 30fr 128fr 30fr 312fr 30fr 414fr 30fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  .div1 {
    grid-area: 2 / 2 / 3 / 3;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div2 {
    grid-area: 2 / 4 / 3 / 5;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div3 {
    grid-area: 4 / 2 / 5 / 3;
    border-radius: 15px;
    background-color: #1a1c22;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div4 {
    grid-area: 4 / 4 / 5 / 5;
    border-radius: 15px;
    background-color: #1a1c22;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div5 {
    grid-area: 2 / 6 / 5 / 10;
    background-color: #1a1c22;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div6 {
    grid-area: 6 / 2 / 7 / 7;
    background-color: #1a1c22;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div7 {
    grid-area: 6 / 8 / 7 / 10;
    background-color: #1a1c22;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div8 {
    grid-area: 8 / 2 / 9 / 10;
    background-color: #1a1c22;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }
`;

export default Home;
