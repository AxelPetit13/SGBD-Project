import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Visualizer from "../components/visualizer.jsx";

/*import data from "../data/games.json";*/

const Games = () => {
  const [games, setGames] = useState(undefined);
  const [data, setData] = useState({
    name: "Jeux",
    head: [],
    body: [],
    route: "/game",
  });
  useEffect(() => {
    fetch("http://localhost:1234/api/game")
      .then((response) => response.json())
      .then((json) => {
        setGames(json);
        let head = [
          "#",
          "Nom",
          "Éditeur",
          "Durée (min)",
          /*"Date de création",*/
          "Extensions",
        ];
        let body = [];

        if (json) {
          json.map((game) => {
            let row = [];
            for (const property of [
              "id",
              "name",
              "editor",
              "duration",
              "expansion",
            ]) {
              let str;
              if (game[property] === null) {
                str = "---";
              } else {
                str = game[property].toString();
              }

              row.push(str);
            }
            body.push(row);
          });
          setData({
            name: "Jeux",
            head: [...head],
            body: [...body],
            route: "/game",
          });
        }
      });
  }, []);
  return (
    <GamesContainer>
      {games !== undefined && <Visualizer data={data} setData={setData} />}
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
