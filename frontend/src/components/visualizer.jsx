import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "./board.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterTheme from "./games/filterTheme.jsx";
import FilterCategories from "./games/filterCategories.jsx";

const Visualizer = ({ data, setData }) => {
  const [edit, setEdit] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState(false);
  const [initialThemes, setInitialThemes] = useState(undefined);
  const [themes, setThemes] = useState(undefined);
  const [initialCategories, setInitialCategories] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  useEffect(() => {
    fetch(`http://localhost:1234/api/themes`)
      .then((res) => res.json())
      .then((json) => {
        setInitialThemes(json);
        setThemes(json);
      });
    fetch(`http://localhost:1234/api/categories`)
      .then((res) => res.json())
      .then((json) => {
        setInitialCategories(json);
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
          <button onClick={() => setFilter(!filter)}>Filtrer</button>

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
                <FilterTheme
                  data={initialThemes}
                  themes={themes}
                  setThemes={setThemes}
                />
                <FilterCategories
                  data={initialCategories}
                  categories={categories}
                  setCategories={setCategories}
                />
                <button
                  className={"search"}
                  onClick={() => {
                    console.log("categories : ", categories);
                    console.log("themes : ", themes);
                    let route = "http://localhost:1234/api/game/";
                    if (
                      categories !== initialCategories ||
                      themes !== initialThemes
                    ) {
                      for (let elt of categories) {
                        route += elt.name;
                      }
                      route += "/";
                      for (let elt of themes) {
                        route += elt.name;
                      }
                    } else console.log("initial themes and categories");
                    let newDataBody = [];
                    fetch(`${route}`)
                      .then((res) => res.json())
                      .then((json) => {
                        for (let elt of json) {
                          newDataBody.push([
                            elt.id.toString(),
                            elt.name,
                            elt.editor,
                            elt.duration.toString(),
                            elt.expansion === null ? "---" : elt.expansion,
                          ]);
                        }
                        setData({
                          name: data.name,
                          head: data.head,
                          body: newDataBody,
                          route: "/game",
                        });
                      });

                    console.log("route : ", route);
                  }}
                >
                  Rechercher
                </button>
              </>
            ) : (
              ""
            ))}
        </div>
      </div>

      <Board
        data={{ ...data }}
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
      display: flex;
      justify-content: end;
      gap: 16px;
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

      .search {
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
  }
`;

export default Visualizer;
