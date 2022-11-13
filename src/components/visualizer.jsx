import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "./board.jsx";

const Visualizer = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);

  return (
    <VisualizerContainer edit={edit}>
      <div className="header">
        <h2 className="data-name">{data.name}</h2>
        <div className="options">
          <button
            onClick={() => {
              setEdit(!edit);
              setAlreadyExist(false);
            }}
          >
            {!edit ? "Modifier" : "Valider"}
          </button>
        </div>
      </div>

      <Board
        data={data}
        edit={edit}
        alreadyExist={alreadyExist}
        setAlreadyExist={setAlreadyExist}
      />
    </VisualizerContainer>
  );
};

const VisualizerContainer = styled.div`
  height: 100%;
  border-radius: 14px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

    button {
      background-color: #ff8042;
      border-radius: 8px;
      border: 2px solid white;
      height: 32px;
      width: 100px;
      color: white;
      font-weight: bold;
      transform: scale(1);
      transition: transfrom 200ms ease;

      &:active {
        transform: scale(0.8);
      }
    }
  }
`;

export default Visualizer;
