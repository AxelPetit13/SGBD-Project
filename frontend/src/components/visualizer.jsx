import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "./board.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterTheme from "./games/filterTheme.jsx";
import FilterCategories from "./games/filterCategories.jsx";

const Visualizer = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState(false);
  const [themes, setThemes] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  useState(() => {
    fetch(`http://localhost:1234/api/themes`)
      .then((res) => res.json())
      .then((json) => {
        setThemes(json);
      });
    fetch(`http://localhost:1234/api/categories`)
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
      });
  }, []);

  return (
    <VisualizerContainer edit={edit}>
      <div className="header">
        <h2 className="data-name">{data.name}</h2>
        <SearchBar
          className={"search"}
          placeholder={"Rechercher un " + data.name.slice(0, -1)}
          inputText={inputText}
          setInputText={setInputText}
        />
        <div className="options">
          <button onClick={() => setFilter(!filter)}>Filtres</button>

          <button
            onClick={() => {
              setEdit(!edit);
              setAlreadyExist(false);
            }}
          >
            {!edit ? "Modifier" : "Valider"}
          </button>
        </div>
        <div className="filter">
          {filter &&
            themes &&
            (data.route === "/game" ? (
              <>
                {/*<FilterTheme data={themes} />*/}
                <FilterCategories
                  data={categories}
                  categories={categories}
                  setCategories={setCategories}
                />
                <button onClick={() => {}}>Rechercher</button>
              </>
            ) : (
              ""
            ))}
        </div>
      </div>

      <Board
        data={data}
        edit={edit}
        alreadyExist={alreadyExist}
        setAlreadyExist={setAlreadyExist}
        inputText={inputText}
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
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: repeat(2, 2rem);
    padding: 20px;

    h2 {
      grid-area: 1 / 1 / 2 / 2;
    }
    .search {
      grid-area: 1 / 2 / 2 / 3;
    }
    .options {
      grid-area: 1 / 3 / 2 / 4;
      justify-self: end;
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
    .filter {
      grid-area: 2 / 1 / 3 / 4;
      display: flex;
      flex-flow: row wrap;
      gap: 8px;
      padding: 10px;
    }
  }
`;

export default Visualizer;
