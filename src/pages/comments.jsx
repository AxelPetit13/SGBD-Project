import React from "react";
import styled from "styled-components";
import Visualizer from "../components/visualizer.jsx";

import data from "../data/comments.json";

const Comments = () => {
  return (
    <CommentsContainer>
      <Visualizer data={data} />
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
