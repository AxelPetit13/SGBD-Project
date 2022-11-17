import React from "react";
import styled from "styled-components";
import Comment from "./comment.jsx";

const Comments = () => {
  return (
    <CommentsContainer>
      <h2>Commentaires Récents</h2>
      <ul className={"table-header"}>
        <li>Auteur</li>
        <li>n°</li>
        <li>Note</li>
        <li>Date</li>
        <li>Confiance</li>
      </ul>
      <div className="comments">
        <Comment
          author={"John Doe"}
          id={123}
          mark={3.5}
          date={"12-34-34"}
          confidence={"1.2"}
        />
        <Comment
          author={"Mark Joe"}
          id={654}
          mark={2}
          date={"12-34-34"}
          confidence={"0.8"}
        />
        <Comment
          author={"Erica Friks"}
          id={123}
          mark={4.5}
          date={"12-34-34"}
          confidence={"0.5"}
        />
        <Comment
          author={"Samantha John"}
          id={123}
          mark={1}
          date={"12-34-34"}
          confidence={"1.5"}
        />
      </div>
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  background-color: #1a1c22;
  h2 {
    font-weight: 600;
    font-size: 18px;
    align-self: center;
    justify-self: start;
    padding-left: 20px;
  }
  .table-header {
    background-color: #282c35;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-around;
    list-style: none;

    li {
      width: 20%;
      font-size: 14px;
      font-weight: 400;
      align-self: center;
    }
  }

  height: 100%;
  display: grid;
  grid-template-rows: 3fr 1fr 6fr;
`;

export default Comments;
