import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ placeholder, inputText, setInputText }) => {
  return (
    <SearchBarContainer>
      <input
        type={"text"}
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    border: 1px solid #1a1c22;
    border-radius: 8px;
    background-color: #1a1c22;
    color: white;
    font-size: 1rem;
    padding: 5px;
    text-align: center;

    &:hover {
      border: 1px solid white;
    }
  }
`;

export default SearchBar;
