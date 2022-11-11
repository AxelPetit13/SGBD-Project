import React, { PureComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Patience", value: 400 },
  { name: "Réflexion", value: 300 },
  { name: "Vitesse", value: 300 },
  { name: "Stratégie", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Chart = () => {
  const [hoveredCell, setHoveredCell] = useState([false, false, false, false]);
  useEffect(() => {}, hoveredCell);
  return (
    <ChartContainer>
      <h2>Thèmes</h2>
      <div className="chart-container">
        <ResponsiveContainer width={"100%"} height={"90%"}>
          <PieChart style={{ height: "100%" }}>
            <Pie
              animationBegin={0}
              animationDuration={1000}
              animationEasing={"ease-out"}
              data={data}
              dataKey={"value"}
              cx={"50%"}
              cy={"50%"}
              innerRadius={"75%"}
              outerRadius={"90%"}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell
                  onMouseEnter={() => {
                    let newStates = [false, false, false, false];
                    newStates[index] = true;
                    setHoveredCell(newStates);
                    console.log("enter");
                  }}
                  key={`ell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  strokeWidth={hoveredCell[index] ? 3 : 1}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <ul>
          {data.map((elt, i) => (
            <li
              key={i}
              onMouseOver={() => {
                let newStates = [false, false, false, false];
                newStates[i] = true;
                setHoveredCell(newStates);
              }}
              className={`${hoveredCell[i] ? "emphasize" : ""}`}
            >
              <div className="bar" style={{ backgroundColor: COLORS[i] }}></div>
              <div className="name">{data[i].name}</div>
              <span style={{ color: COLORS[i] }}>
                {Math.round(
                  (data[i].value /
                    data.reduce((acc, valCurr) => acc + valCurr.value, 0)) *
                    10000
                ) / 100}
                %
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #1a1c22;

  display: flex;
  flex-flow: column nowrap;

  h2 {
    font-size: 18px;
    font-weight: 600;
    text-align: start;
    width: fit-content;
    margin-left: 20px;
    margin-top: 20px;
  }

  .chart-container {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100%;
    ul {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      align-items: center;
      li {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 2fr;
        transition: all 300ms ease;
        .bar {
          grid-area: 1/1;
          width: 33px;
          height: 5px;
          border-radius: 3px;
          justify-self: center;
          align-self: center;
        }
        .name {
          grid-area: 1/2;
          font-size: 14px;
          color: #9e9e9e;
        }
        span {
          grid-area: 2/2;
          font-size: 12px;
        }
      }
      .emphasize {
        transform: scale(1.2);
        .name {
          color: white;
        }
      }
    }
  }
`;

export default Chart;
