import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Visualizer from "../components/visualizer.jsx";


const Players = () => {
  const [players, setPlayers] = useState(undefined);

  useEffect(() => {
    const playerFetch = async () => {
      const response = await fetch("http://localhost:1234/api/players");
      const data = await response.json();
      console.log(data);
      setPlayers(data);
    };
    playerFetch();
  }, []);

  return (

    <>
      {players ?
        <>
        <div>
          {players}
        </div>
        </> : null

      }
    </>
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
