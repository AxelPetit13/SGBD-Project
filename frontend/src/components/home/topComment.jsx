import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TopComment = (props) => {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    fetch("http://localhost:1234/api/mostRatedComment")
      .then((res) => res.json())
      .then((json) => {
        setData(json[0]);
      });
  }, []);
  return (
    data && (
      <TopCommentContainer>
        <h2>Top Commentaire</h2>
        <div className="main">
          <h3>- {data.pseudo} -</h3>
          <span className={"game"}>{data.game}</span>
          <p className="message">{data.message}</p>
          <span className={"mark"}>{data.mark}</span>
          <span className={"date"}>{data.date}</span>
        </div>
      </TopCommentContainer>
    )
  );
};

const TopCommentContainer = styled.div`
  background-color: #1a1c22;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;

  h2 {
    font-size: 18px;
    font-weight: 600;
    text-align: start;
    margin-left: 20px;
    margin-top: 20px;
    height: 20%;
  }

  .main {
    height: 80%;
    display: grid;
    grid-template-columns: repeat(2, 1fr) 2fr repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr) 3fr 1fr 3fr repeat(3, 1fr);

    h3 {
      grid-area: 2 / 2 / 3 / 3;
      color: #9e9e9e;
      font-weight: 200;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .message {
      grid-area: 4 / 2 / 7 / 5;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
    }
    span {
      color: #9e9e9e;
      font-weight: 200;
    }
    .date {
      grid-area: 8 / 2 / 9 / 3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .mark {
      grid-area: 8 / 4 / 9 / 5;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .game {
      grid-area: 2 / 4 / 3 / 5;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default TopComment;
