import React from "react";
import styled from "styled-components";
import Person from "../components/person.jsx";
import { v4 as uuidv4 } from "uuid";

const people = [];
const states = [
  ["Auteur", "Illustrateur", "Joueur"],
  ["Auteur", "Illustrateur"],
  ["Auteur", "Joueur"],
  ["Illustrateur", "Joueur"],
  ["Auteur"],
  ["Illustrateur"],
  ["Joueur"],
];
for (let i = 0; i < 20; i++) {
  let person = {
    first_name: `Prénom${i}`,
    last_name: `Nom${i}`,
    states: states[Math.trunc(Math.random() * (states.length - 1))],
  };
  people.push(person);
}

const People = () => {
  return (
    <PeopleContainer>
      {people.map((person, i) => (
        <Person
          key={uuidv4()}
          firstName={person.first_name}
          lastName={person.last_name}
          states={person.states}
          i={i}
        />
      ))}
    </PeopleContainer>
  );
};

const PeopleContainer = styled.div`
  background-color: rgb(16, 17, 21);
  border-top-left-radius: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  padding: 20px;
  overflow: scroll;
`;

export default People;
