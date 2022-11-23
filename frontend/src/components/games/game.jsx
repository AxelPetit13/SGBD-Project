import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Game = ({ data }) => {
  const parameters = useParams();
  useEffect(() => {});
  return (
    <GameContainer>
      <span>#{parameters.id}</span>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid red;
  span {
    color: white;
  }
  em {
    color: coral;
  }
`;

export default Game;
