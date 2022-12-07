import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Visualizer from "../components/visualizer.jsx";

const Players = () => {
  const [players, setPlayers] = useState(undefined);
  const [data, setData] = useState({
    name: "Joueurs",
    head: [],
    body: [],
  });
  useEffect(() => {
    fetch("http://localhost:1234/api/player")
      .then((response) => response.json())
      .then((json) => {
        setPlayers(json);
        let head = ["#", "Pseudo", "Mail", "Nom", "Prénom"];
        let body = [];
        console.log(json);

        json.map((player) => {
          let row = [];
          for (const property in player) {
            let str = "";
            if (player[property]) {
              str = player[property].toString();
            }
            row.push(str);
          }
          body.push(row);
        });
        setData({
          name: "Joueurs",
          head: [...head],
          body: [...body],
          route: "/player",
        });
      });
  }, []);

  return (
    <PlayersContainer>
      {players !== undefined && <Visualizer data={data} />}
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
