import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import FaceIcon from "@mui/icons-material/Face2.js";
import Face2Icon from "@mui/icons-material/Face2.js";
import Face3Icon from "@mui/icons-material/Face3.js";
import Face4Icon from "@mui/icons-material/Face4.js";
import Face5Icon from "@mui/icons-material/Face5.js";
import Face6Icon from "@mui/icons-material/Face6.js";
import { Select } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const faces = [
  <FaceIcon style={{ fontSize: "25rem", color: COLORS[0] }} />,
  <Face2Icon style={{ fontSize: "25rem", color: COLORS[1] }} />,
  <Face3Icon style={{ fontSize: "25rem", color: COLORS[2] }} />,
  <Face4Icon style={{ fontSize: "25rem", color: COLORS[3] }} />,
  <Face5Icon style={{ fontSize: "25rem", color: COLORS[0] }} />,
  <Face6Icon style={{ fontSize: "25rem", color: COLORS[1] }} />,
];

const games = [
  { id: 1, name: "Jeux 1" },
  { id: 2, name: "Jeux 2" },
  { id: 3, name: "Jeux 3" },
  { id: 4, name: "Jeux 4" },
  { id: 5, name: "Jeux 5" },
  { id: 6, name: "Jeux 6" },
  { id: 7, name: "Jeux 7" },
  { id: 8, name: "Jeux 8" },
  { id: 9, name: "Jeux 9" },
];

const PeopleProfil = () => {
  const parameters = useParams();
  const [profil, setProfil] = useState(undefined);
  useEffect(() => {
    fetch(`http://localhost:1234/api/people/${parameters.id}`)
      .then((response) => response.json())
      .then((json) => {
        setProfil(json[0]);
        console.log(json);
      });
  }, []);

  const [edit, setEdit] = useState(false);

  return (
    profil && (
      <ProfilContainer color={COLORS[(parameters.id - 1) % 4]}>
        <Link to={"/people"} style={{ textDecoration: "none", color: "white" }}>
          <div className="back">
            <div className="arrow-head"></div>
            <div className="arrow-body"></div>
          </div>
        </Link>
        <input
          type={"button"}
          className="delete"
          value={"Modifier"}
          onClick={() => setEdit(!edit)}
        />
        <div className="main">
          <div className="div1">
            <h2 className={"first-name"}>{profil.PEOPLE_FIRSTNAME}</h2>
            <div className={"role"}>
              <span>Auteur</span>
              <span>Illustrateur</span>
            </div>
          </div>
          <div className="div2">
            <h2
              className={"id"}
              style={{ color: COLORS[(parameters.id - 1) % 4] }}
            >
              #{profil.PEOPLE_ID}
            </h2>
          </div>
          <div className="div3">
            <h2 className={"name"}>{profil.PEOPLE_NAME}</h2>
          </div>
        </div>
        <div className="img">{faces[(profil.PEOPLE_ID - 1) % 6]}</div>
        <div className="informations">
          <div className="board">
            <div className="head">Jeux</div>
            <div className="body">
              <div className="row">Jeux 1</div>
              <div className="row">Jeux 2</div>
              <div className="row">Jeux 3</div>
              <div className="row">Jeux 4</div>
              <div className="row">Jeux 5</div>
              <div className="row">Jeux 6</div>
            </div>
          </div>
          <div className="board">
            <div className="head">Commentaires</div>
            <div className="body">
              <div className="row">Commentaire 1</div>
              <div className="row">Commentaire 2</div>
              <div className="row">Commentaire 3</div>
              <div className="row">Commentaire 4</div>
              <div className="row">Commentaire 5</div>
              <div className="row">Commentaire 6</div>
              <div className="row">Commentaire 7</div>
              <div className="row">Commentaire 8</div>
              <div className="row">Commentaire 9</div>
              <div className="row">Commentaire 10</div>
              <div className="row">Commentaire 11</div>
            </div>
          </div>
        </div>

        {edit && (
          <div className="edit">
            <h2>Modifier la personne</h2>
            <form>
              <label htmlFor="firstname">
                Prénom :{" "}
                <input type="text" name="firstname" placeholder={"Prénom"} />
              </label>
              <label htmlFor="lastname">
                Nom : <input type="text" name="lastname" placeholder={"Nom"} />
              </label>
              <label htmlFor="mail">
                Nom : <input type="text" name="mail" placeholder={"Mail"} />
              </label>
              <label htmlFor="pseudo">
                Nom : <input type="text" name="pseudo" placeholder={"Pseudo"} />
              </label>
            </form>
            <form>
              <fieldset>
                <legend>Indiquer les fonctions</legend>
                <label htmlFor="player">
                  Joueur
                  <input type="checkbox" name="player" />
                </label>
                <label htmlFor="author">
                  Auteur
                  <input type="checkbox" name="author" />
                </label>
                <label htmlFor="illustrator">
                  Illustrateur
                  <input type="checkbox" name="illustrator" />
                </label>
              </fieldset>
            </form>

            <form className={"games"}>
              {games.map((item) => (
                <label htmlFor={`game${item.id}`} key={item.id}>
                  Jeux {item.id}
                  <input
                    id={`game${item.id}`}
                    type={"checkbox"}
                    name={`game${item.id}`}
                    value={item.name}
                  />
                </label>
              ))}
            </form>
            {/*<form>
              <label htmlFor="comments">
                Commentaires que la personne a postée
              </label>
            </form>*/}
          </div>
        )}
      </ProfilContainer>
    )
  );
};

const ProfilContainer = styled.div`
  background-color: rgb(16, 17, 21);
  border-top-left-radius: 16px;
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid red;

  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  position: relative;

  .delete {
    position: absolute;
    top: 20px;
    right: 20px;
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

  .back {
    position: absolute;
    top: 20px;
    left: 20px;
    transition: transform 300ms ease;

    .arrow-head {
      height: 15px;
      aspect-ratio: 1/1;
      border-top: ${(props) => `3px solid ${props.color}`};
      border-left: ${(props) => `3px solid ${props.color}`};
      transform: rotate(-45deg);
    }
    .arrow-body {
      width: 50px;
      border-top: ${(props) => `3px solid ${props.color}`};
      transform: translateY(-9px);
      transform-origin: left;
      transition: transform 300ms ease;
    }

    &:hover {
      transform: scale(1.1);

      .arrow-body {
        transform: translateY(-9px) scaleX(1.4);
      }
    }
  }

  .main {
    grid-area: 1 / 1 / 2 / 2;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);

    .div1 {
      grid-area: 1 / 1 / 2 / 4;
      display: grid;
      grid-template-rows: 10rem 2rem;
    }
    .div2 {
      grid-area: 2 / 1 / 3 / 2;
    }
    .div3 {
      grid-area: 2 / 2 / 3 / 4;
    }
    h2 {
      font-size: 10rem;
      line-height: 10rem;
    }
    .role {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: gray;
      span {
        font-size: 2rem;
        margin: 10px;
      }
    }
  }
  .img {
    grid-area: 1 / 2 / 2 / 3;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .informations {
    height: 50%;
    grid-area: 2 / 1 / 3 / 3;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-evenly;

    .board {
      width: 50%;
      height: 100%;
      display: grid;
      grid-template-rows: 1fr 4fr;
      .head {
        padding: 20px;
        background-color: #1a1c22;
        text-align: center;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        margin-bottom: 20px;
        font-size: 2rem;
      }
      .body {
        height: 100%;
        overflow: scroll;

        .row {
          padding-left: 20px;
          padding-right: 20px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background-color: #1a1c22;
          }
        }
      }
    }
  }
  .edit {
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80%;
    width: 80%;
    background-color: #1a1c22;
    border-radius: 16px;
    padding: 20px;

    .games {
      display: flex;
      flex-direction: column;
    }
  }
`;

export default PeopleProfil;
