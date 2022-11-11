import React, { useEffect, useState } from "react";
import Table from "../components/table.jsx";

import data from "../data/players.json";
import styled from "styled-components";
import Player from "../components/player.jsx";

const Players = () => {
  const [selectedPlayers, setSelectedPlayers] = useState(
    new Array(data.body.length).fill(false)
  );
  useEffect(() => {}, selectedPlayers);
  return (
    <PlayersContainer>
      Games
      <Table
        head={data.head}
        body={data.body}
        handler={selectedPlayers}
        setHandler={setSelectedPlayers}
      />
      {selectedPlayers.map((selected, i) => (
        <Player
          key={i}
          id={i}
          selected={selectedPlayers}
          setSelected={setSelectedPlayers}
        />
      ))}
    </PlayersContainer>
  );
};

const PlayersContainer = styled.div`
  background-color: rgb(16, 17, 21);
  height: 100%;
  width: 100%;
  border-top-left-radius: 16px;

  padding: 20px;
`;

export default Players;
