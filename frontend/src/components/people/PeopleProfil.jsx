import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import FaceIcon from "@mui/icons-material/Face2.js";
import Face2Icon from "@mui/icons-material/Face2.js";
import Face3Icon from "@mui/icons-material/Face3.js";
import Face4Icon from "@mui/icons-material/Face4.js";
import Face5Icon from "@mui/icons-material/Face5.js";
import Face6Icon from "@mui/icons-material/Face6.js";
import row from "../row.jsx";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const faces = [
  <FaceIcon style={{ fontSize: "20rem", color: COLORS[0] }} />,
  <Face2Icon style={{ fontSize: "20rem", color: COLORS[1] }} />,
  <Face3Icon style={{ fontSize: "20rem", color: COLORS[2] }} />,
  <Face4Icon style={{ fontSize: "20rem", color: COLORS[3] }} />,
  <Face5Icon style={{ fontSize: "20rem", color: COLORS[0] }} />,
  <Face6Icon style={{ fontSize: "20rem", color: COLORS[1] }} />,
];

const PeopleProfil = () => {
  const parameters = useParams();
  const [edit, setEdit] = useState(false);
  const [profil, setProfil] = useState(undefined);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  useEffect(() => {
    fetch(`http://localhost:1234/api/people/${parameters.id}`)
      .then((response) => response.json())
      .then((json) => {
        setProfil(json[0]);
        setName(json[0].name);
        setLastName(json[0].last_name);
        setMail(json[0].mail);
      });
  }, []);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isIllustrator, setIsIllustrator] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  useEffect(() => {
    fetch("http://localhost:1234/api/authors")
      .then((res) => res.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          if (json[i].id.toString() === parameters.id) {
            setIsAuthor(true);
          }
        }
      });
    fetch("http://localhost:1234/api/illustrators")
      .then((res) => res.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          if (json[i].id.toString() === parameters.id) {
            setIsIllustrator(true);
          }
        }
      });
    fetch("http://localhost:1234/api/player")
      .then((res) => res.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          if (json[i].id.toString() === parameters.id) {
            setIsPlayer(true);
          }
        }
      });
  }, []);

  const [games, setGames] = useState(undefined);
  useEffect(() => {
    fetch(`http://localhost:1234/api/player/${parameters.id}`)
      .then((res) => res.json())
      .then((json) => setGames(json));
  }, []);
  const [comments, setComments] = useState(undefined);
  useEffect(() => {
    fetch(`http://localhost:1234/api/comments/${parameters.id}`)
      .then((res) => res.json())
      .then((json) => setComments(json));
  }, []);

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
            <h2 className={"last-name"}>{lastName}</h2>

            <div className={"role"}>
              {isPlayer ? <span>Joueur</span> : ""}
              {isAuthor ? <span>Auteur</span> : ""}
              {isIllustrator ? <span>Illustrateur</span> : ""}
              <span>{mail}</span>
            </div>
          </div>
          <div className="div2">
            <h2
              className={"id"}
              style={{ color: COLORS[(parameters.id - 1) % 4] }}
            >
              #{profil.id}
            </h2>
          </div>
          <div className="div3">
            <h2 className={"name"}>{name}</h2>
          </div>
        </div>
        <div className="img">{faces[(parameters.id - 1) % 4]}</div>
        <div className="informations">
          <div className="board">
            <div className="head">Jeux</div>
            <div className="body">
              {games &&
                games.map((game, i) => (
                  <div key={i} className="row">
                    {game.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="board">
            <div className="head">Commentaires</div>
            <div className="body">
              {comments &&
                comments.map((comment, i) => (
                  <div key={i} className="row">
                    {comment.message}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/*<AnimatePresence>
          {edit && (
            <motion.div
              className="edit"
              initial={{
                scale: 0,
                opacity: 0,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, translateX: "-50%", translateY: "-50%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button className="close" onClick={() => setEdit(false)}>
                X
              </button>
              <div className="bloc identity">
                <h2>Identit??</h2>
                <form className={"form"}>
                  <label htmlFor="lastname">
                    Pr??nom :{" "}
                    <input
                      type="text"
                      name="lastname"
                      placeholder={"Pr??nom"}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <label htmlFor="lastname">
                    Nom :{" "}
                    <input
                      type="text"
                      name="lastname"
                      placeholder={"Nom"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label htmlFor="mail">
                    Mail :{" "}
                    <input
                      type="text"
                      name="mail"
                      placeholder={"Mail"}
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                    />
                  </label>
                </form>
              </div>
              <div className="games">
                <form action="">
                  <div className={"table"}>
                    <div className={"thead"}>
                      <div className={"tr"}>
                        <div className={"td"}> Nom</div>
                        <div className={"td"}>
                          {" "}
                          {(isPlayer && (
                            <input type={"text"} placeholder={"pseudo"} />
                          )) ||
                            "Joueur"}
                        </div>
                        <div className={"td"}> Auteur</div>
                        <div className={"td"}> Illustrateur</div>
                      </div>
                    </div>
                    <div className={"tbody"}>
                      {games.map((item, i) => (
                        <div className={"tr"} key={i}>
                          <div className={"td"}>{item.Name}</div>
                          <div className={"td"}>
                            <input
                              type={"checkbox"}
                              onChange={() => {
                                let newGames = [...gamesPlayed];
                                newGames[i] = !newGames[i];
                                setGamesPlayed(newGames);
                              }}
                            />
                          </div>
                          <div className={"td"}>
                            <input type={"checkbox"} />
                          </div>
                          <div className={"td"}>
                            <input type={"checkbox"} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>*/}
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
    margin-top: 20px;
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
    grid-area: 2 / 1 / 3 / 3;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-evenly;
    overflow: hidden;
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
    height: 95%;
    width: 95%;
    background-color: #1a1c22;
    border: ${(props) => `3px solid ${props.color}`};
    border-radius: 16px;
    padding: 20px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 30px;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background-color: indianred;
      color: white;
      font-weight: bold;
      border: 1px solid white;
    }

    .bloc {
      display: flex;
      flex-direction: column;
      h2 {
        margin-bottom: 20px;
        font-size: 2rem;
        font-weight: 900;
      }
    }
    .games {
      grid-area: 2 / 1 / 3 / 2;
      overflow: hidden;
      form {
        height: 100%;
        .table {
          overflow: hidden;
          width: 100%;
          height: 100%;

          .thead {
            .tr {
              display: flex;
              justify-content: space-around;
              .td {
                width: 25%;
                text-align: center;
              }
            }
            font-size: 1.5rem;
            font-weight: bold;
          }
          .tbody {
            height: 100%;
            overflow: scroll;

            .tr {
              display: flex;
              justify-content: space-around;
              align-items: center;
              .td {
                height: 44px;
                width: 25%;
                display: flex;
                justify-content: center;
                align-items: center;
                /*input {
                  transform: scale(1.5);
                }*/
              }
            }
          }
        }
      }
    }
    .form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      font-size: 1.5rem;
      font-weight: 400;
    }

    .column {
      flex-direction: column;
    }
  }
`;

export default PeopleProfil;
