import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Visualizer from "../components/visualizer.jsx";

import data from "../data/games.json";

const Games = () => {
  const [games, setGames] = useState(undefined);
  const [data, setData] = useState({
    name: "Jeux",
    head: [],
    body: [],
  });
  useEffect(() => {
    fetch("http://localhost:1234/api/people")
      .then((response) => response.json())
      .then((json) => {
        setGames(json);
        let head = [];
        let body = [];

        if (json) {
          for (const property in json[0]) {
            head.push(property.toString().toLowerCase());
          }
          json.map((game) => {
            let row = [];
            for (const property in game) {
              const str = game[property].toString();
              row.push(str);
            }
            body.push(row);
          });
          setData({
            name: "Jeux",
            head: [...head],
            body: [...body],
          });
        }
      });
  }, []);
  return (
    <GamesContainer>
      {games !== undefined && <Visualizer data={data} />}
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
