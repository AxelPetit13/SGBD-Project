import React from "react";
import styled from "styled-components";

const Game = ({ data }) => {
  return (
    <GameContainer>
      <div className="image"></div>
      <div className="main-informations">
        <h2>Name</h2>
        <div className="mark">15/20</div>
        <div>
          <span>Auteurs :</span>
          <em>Michel</em>
        </div>
        <div>
          <span>Illustrateurs :</span>
          <em>Jean</em>
        </div>
        <div>
          <span>Éditeur : </span>
          <em>HASBRO</em>
        </div>
      </div>
      <div className="others-informations"></div>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  span {
    color: white;
  }
  em {
    color: coral;
  }
`;

export default Game;
