import React, { useEffect, useState } from "react";
import Table from "../components/table.jsx";

import data from "../data/games.json";
import styled from "styled-components";
import Game from "../components/game.jsx";

const Games = () => {
  const [modification, setModification] = useState(false);
  const [selectedGames, setSelectedGames] = useState(
    new Array(data.body.length).fill(false)
  );
  useEffect(() => {
    console.log("games : modification : ", modification);
  }, [selectedGames, modification]);
  return (
    <GameContainer>
      <div className="header">
        <h2>Jeux</h2>
        <div className="options">
          <button onClick={() => setModification(!modification)}>
            Modifier
          </button>
        </div>
      </div>

      <Table
        head={data.head}
        body={data.body}
        handler={selectedGames}
        setHandler={setSelectedGames}
        modification={modification}
      />
      {selectedGames.map((selected, i) => (
        <Game
          name={data.body[i][0]}
          author={data.body[i][1]}
          illustrator={data.body[i][2]}
          editor={data.body[i][3]}
          date={data.body[i][4]}
          nbPlayers={data.body[i][5]}
          key={i}
          id={i}
          selected={selectedGames}
          setSelected={setSelectedGames}
        />
      ))}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  background-color: rgb(16, 17, 21);
  height: 100%;
  width: 100%;
  border-top-left-radius: 16px;
  overflow: scroll;

  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Games;
