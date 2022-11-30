import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Visualizer from "../components/visualizer.jsx";

const Comments = () => {
  const [comments, setComments] = useState(undefined);
  const [data, setData] = useState({
    name: "Commentaires",
    head: [],
    body: [],
  });
  useEffect(() => {
    fetch("http://localhost:1234/api/comments")
      .then((response) => response.json())
      .then((json) => {
        setComments(json);
        let head = ["#", "Jeu", "Message", "Commenté par", "Note", "Date"];
        let body = [];

        json.map((player) => {
          let row = [];
          for (const property in player) {
            const str = player[property].toString();
            row.push(str);
          }
          body.push(row);
        });
        setData({
          name: "Commentaires",
          head: [...head],
          body: [...body],
          route: "/comments",
        });
      });
  }, []);
  return (
    <CommentsContainer>
      {comments !== undefined && <Visualizer data={data} />}
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  background-color: rgb(16, 17, 21);
  height: 100%;
  width: 100%;
  border-top-left-radius: 16px;
  padding: 20px;
`;

export default Comments;
