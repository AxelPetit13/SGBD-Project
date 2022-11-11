import React from "react";
import styled from "styled-components";

const Row = ({ data }) => {
  const size = data.length;
  return (
    <RowContainer size={size}>
      {data.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </RowContainer>
  );
};

const RowContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 44px;

  &:hover {
    background-color: #1a1c22;
  }

  span {
    width: ${(props) => 100 / props.size + "%"};
    text-align: center;
  }
`;

export default Row;
