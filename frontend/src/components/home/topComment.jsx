import React from "react";
import styled from "styled-components";

const TopComment = (props) => {
  return (
    <TopCommentContainer>
      <h2>Top Commentaire</h2>
      <div className="main">
        <h3>-{props.author}-</h3>
        <span className={"game"}>{props.game}</span>
        <p className="message">{props.message}</p>
        <span className={"mark"}>{props.mark}</span>
        <span className={"date"}>{props.date}</span>
      </div>
    </TopCommentContainer>
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
    }
    .message {
      grid-area: 4 / 2 / 7 / 5;
    }
    span {
      color: #9e9e9e;
      font-weight: 200;
    }
    .date {
      grid-area: 8 / 2 / 9 / 3;
    }
    .mark {
      grid-area: 8 / 4 / 9 / 5;
    }
    .game {
      grid-area: 2 / 4 / 3 / 5;
    }
  }
`;

export default TopComment;
