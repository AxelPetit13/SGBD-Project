import React from "react";
import styled from "styled-components";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Julie",
    nbGames: 13,
  },
  {
    name: "John",
    nbGames: 8,
  },

  {
    name: "Léa",
    nbGames: 5,
  },

  {
    name: "Salomé",
    nbGames: 7,
  },
];

const TopPlayers = () => {
  return (
    <TopPlayersContainer>
      <div className="block-description">
        <h2>Joueurs les plus actifs</h2>
        <div className="table">
          <div className="row table-header">
            <span>rang</span>
            <span>nom</span>
            <span>nombre de commentaires</span>
          </div>
          <div className="row">
            <span>1</span>
            <span>Julie</span>
            <span>13</span>
          </div>
          <div className="row">
            <span>2</span>
            <span>John</span>
            <span>8</span>
          </div>
          <div className="row">
            <span>3</span>
            <span>Salomé</span>
            <span>7</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid gridType={"polygon"} />
          <PolarAngleAxis dataKey="name" tick={true} stroke={"white"} />
          <PolarRadiusAxis stroke={"yellow"} />
          <Radar
            animationBegin={300}
            animationDuration={1000}
            animationEasing={"ease-out"}
            name="Mike"
            dataKey="nbGames"
            stroke={"yellow"}
            fill="#ff00ff"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </TopPlayersContainer>
  );
};

const TopPlayersContainer = styled.div`
  background-color: #1a1c22;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100%;

  .block-description {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    h2 {
      font-size: 18px;
      font-weight: 600;
      text-align: start;
      width: fit-content;
      margin-left: 20px;
      margin-top: 20px;
      align-self: start;
    }

    .table {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      .table-header {
        background-color: #282c35;
      }
      .row {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;

        span {
          width: 33%;
        }
      }
    }
  }
`;

export default TopPlayers;
