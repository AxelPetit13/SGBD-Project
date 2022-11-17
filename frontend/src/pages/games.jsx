import React from "react";
import styled from "styled-components";
import Visualizer from "../components/visualizer.jsx";

import data from "../data/games.json";



const Games = () => {
  return (
    <GamesContainer>
      <Visualizer data={data} />
    </GamesContainer>
  );
};

const GamesContainer = styled.div`
  background-color: rgb(16, 17, 21);
  height: 100%;
  width: 100%;
  border-top-left-radius: 16px;
  padding: 20px;
`;

export default Games;
