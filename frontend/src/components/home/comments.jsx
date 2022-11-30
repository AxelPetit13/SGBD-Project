import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./comment.jsx";

const Comments = () => {
  const [comments, setComments] = useState(undefined);
  useEffect(() => {
    fetch("http://localhost:1234/api/recentComments")
      .then((res) => res.json())
      .then((json) => setComments(json));
  }, []);

  return (
    comments && (
      <CommentsContainer>
        <h2>Commentaires Récents</h2>
        <ul className={"table-header"}>
          <li>Auteur</li>
          <li>Message</li>
          <li>Jeu</li>
          <li>Note</li>
          <li>Date</li>
          <li>Confiance</li>
        </ul>
        <div className="comments">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              author={comment.author}
              message={comment.message}
              game={comment.game}
              mark={comment.mark}
              date={comment.date}
              confidence={comment.confidence_index}
            />
          ))}
        </div>
      </CommentsContainer>
    )
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
      text-align: center;
    }
  }

  height: 100%;
  display: grid;
  grid-template-rows: 3fr 1fr 6fr;
`;

export default Comments;
