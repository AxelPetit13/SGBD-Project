import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Person from "../components/people/person.jsx";
import SearchBar from "../components/SearchBar.jsx";

function filterData(inputText, data) {
  if (data === undefined) {
    return [];
  }
  let filterData;
  if (inputText === "") {
    filterData = [...data];
  } else {
    filterData = data.filter((item) => {
      for (const property in item) {
        if (
          item[property]
            .toString()
            .toLowerCase()
            .includes(inputText.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  }
  return filterData;
}

function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1) arr.splice(index, 1);
}

const People = () => {
  const [inputText, setInputText] = useState("");
  const [initialPeople, setInitialPeople] = useState(undefined);
  const [IDs, setIDs] = useState([]);

  const [people, setPeople] = useState(undefined);
  useEffect(() => {
    fetch("http://localhost:1234/api/people")
      .then((response) => response.json())
      .then((json) => {
        setPeople(json);
        console.log(json);
        setInitialPeople(json);
        let peopleId = [];
        for (let i = 0; i < json.length; i++) {
          peopleId.push(uuidv4());
        }
        setIDs(peopleId);
      });
  }, []);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setPeople(filterData(inputText, initialPeople));
  }, [inputText]);
  return (
    <PeopleContainer edit={edit}>
      <div className="header">
        <h2 className="data-name">Personnes</h2>
        <SearchBar
          placeholder={"Rechercher une personne ( Nom, prénom, fonction... )"}
          inputText={inputText}
          setInputText={setInputText}
        />
        <div className="options">
          <button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {!edit ? "Modifier" : "Valider"}
          </button>
        </div>
      </div>

      <div className="people-container">
        {people &&
          people.map((person, i) => (
            <div className={"person-container"} key={IDs[i]}>
              <Person
                id={person.id}
                name={person.name}
                lastName={person.last_name}
                mail={person.mail}
              />
              {edit && (
                <button
                  className={"delete"}
                  onClick={() => {
                    const newIDs = [...IDs];
                    const newPeople = [...people];
                    removeItem(newIDs, IDs[i]);
                    removeItem(newPeople, person);
                    setIDs(newIDs);
                    setPeople(newPeople);
                    setInitialPeople(newPeople);
                    fetch(`/people/${i}`, {
                      method: "DELETE",
                    })
                      .then((res) => res.json())
                      .then((json) => console.log(json))
                      .catch((err) => console.log(err));
                  }}
                >
                  X
                </button>
              )}
            </div>
          ))}
      </div>
    </PeopleContainer>
  );
};

const PeopleContainer = styled.div`
  background-color: rgb(16, 17, 21);
  border-top-left-radius: 16px;
  width: 100%;
  height: 100%;
  padding: 20px;

  .header {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    padding: 20px;

    .options {
      justify-self: end;
      button {
        background-color: #ff8042;
        border-radius: 8px;
        border: 2px solid white;
        height: 32px;
        width: 100px;
        color: white;
        font-weight: bold;
        transform: scale(1);
        transition: transfrom 200ms ease;

        &:active {
          transform: scale(0.8);
        }
      }
    }
  }

  .people-container {
    width: 100%;

    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;

    gap: ${(props) => (props.edit ? "20px" : "10px")};
    overflow-y: scroll;
    padding: 20px;
    z-index: 0;
    transition: all 300ms ease;
    .person-container {
      position: relative;
      z-index: 0;
      transition: all 300ms ease;
      border-radius: 8px;

      &:hover {
        transform: scale(1.05);
        z-index: 100;

        box-shadow: 1px 1px 3px 3px #363636;
      }

      .delete {
        position: absolute;
        z-index: 100;
        top: -15px;
        right: -15px;
        border: none;
        border-radius: 50%;

        height: 35px;
        aspect-ratio: 1 / 1;
        background-color: indianred;
        color: white;
        transition: all 300ms ease;

        &:active {
          transform: scale(0.8);
        }

        .displayed {
          display: inherit;
        }
      }
    }
  }
`;

export default People;
