import React from "react";
import styled from "styled-components";
import Element from "../components/home/element.jsx";
import TopComment from "../components/home/topComment.jsx";
import Chart from "../components/home/chart.jsx";
import Comments from "../components/home/Comments.jsx";
import Comment from "../components/home/comment.jsx";
import TopPlayers from "../components/home/topPlayers.jsx";

const Home = () => {
  return (
    <HomeContainer>
      <div className="div1">
        <Element
          title={"Jeu le plus joué"}
          value={"UNO"}
          info={"42 joueurs"}
          idxIcon={0}
        />
      </div>
      <div className="div2">
        <Element
          title={"Jeu le mieux noté"}
          value={"RISK"}
          info={"1.5"}
          idxIcon={1}
        />
      </div>
      <div className="div3">
        <Element
          title={"Jeu le plus mal noté"}
          value={"CLUEDO"}
          info={"0.3"}
          idxIcon={2}
        />
      </div>
      <div className="div4">
        <Element
          idxIcon={3}
          title={"Editeur le plus prolifique"}
          value={"HASBRO"}
          info={"13 jeux"}
        />
      </div>
      <div className="div5">
        <TopComment
          author={"John Doe"}
          message={
            "Super Jeu ! En une vingtaine de minutes on peut construire toute une\n" +
            "          civilisation organisée et puissante pour faire face à ses adversaires\n" +
            "          !"
          }
          date={"15-06-2003"}
          mark={1.2}
          game={"Risk"}
        />
      </div>
      <div className="div6">
        <TopPlayers />
      </div>
      <div className="div7">
        <Chart />
      </div>
      <div className="div8">
        <Comments>
          <Comment />
          <Comment />
          <Comment />
        </Comments>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-color: rgb(16, 17, 21);
  height: 100%;
  width: 100%;
  border-top-left-radius: 16px;

  display: grid;
  grid-template-columns: 30fr 258fr 30fr 258fr 30fr 60fr 30fr 178fr 179fr 30fr;
  grid-template-rows: 30fr 128fr 30fr 128fr 30fr 312fr 30fr 414fr 30fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  .div1 {
    grid-area: 2 / 2 / 3 / 3;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div2 {
    grid-area: 2 / 4 / 3 / 5;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div3 {
    grid-area: 4 / 2 / 5 / 3;
    border-radius: 15px;
    background-color: #1a1c22;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div4 {
    grid-area: 4 / 4 / 5 / 5;
    border-radius: 15px;
    background-color: #1a1c22;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div5 {
    grid-area: 2 / 6 / 5 / 10;
    background-color: #1a1c22;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div6 {
    grid-area: 6 / 2 / 7 / 7;
    background-color: #1a1c22;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div7 {
    grid-area: 6 / 8 / 7 / 10;
    background-color: #1a1c22;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }

  .div8 {
    grid-area: 8 / 2 / 9 / 10;
    background-color: #1a1c22;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(1);
    transition: transform 200ms ease;

    &:hover {
      transform: scale(1.01);
    }
  }
`;

export default Home;
