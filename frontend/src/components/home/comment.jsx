import React from "react";
import styled from "styled-components";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";

const Comment = ({ author, message, game, mark, date, confidence }) => {
  const stars = [];
  for (let i = 0; i <= mark / 4 - 1; i++) {
    stars.push(<StarIcon key={i} />);
  }
  if (mark - Math.trunc(mark / 4) > 0) {
    stars.push(<StarHalfIcon key={stars.length + 1} />);
  }
  while (stars.length < 5) {
    stars.push(<StarBorderIcon key={stars.length + 1} />);
  }
  return (
    <CommentContainer confidence={confidence}>
      <ul className={"comment"}>
        <li>
          <div className="author">
            <div className={"image"} />
            {author}
          </div>
        </li>
        <li>{message}</li>
        <li>{game}</li>
        <li>
          {stars.map((elt) => elt)} {mark}
        </li>
        <li>{date}</li>
        <li>
          <div className={"emphasize"}>{confidence}</div>
        </li>
      </ul>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  height: 41px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .comment {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    list-style: none;

    &:hover {
      background-color: #242424;
      transform: scaleY(1.2);
    }

    li {
      color: #9e9e9e;
      font-size: 14px;
      font-weight: 400;
      align-self: center;
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

      .author {
        height: 100%;
        color: white;
        font-weight: 600;
        .image {
          height: 100px;
          background-size: cover;
          width: 100px;
          height: 100%;
          border-radius: 8px;
        }
      }
      .emphasize {
        width: 50%;
        background-color: #282c35;
        border-radius: 9px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${(props) => (props.confidence >= 1 ? "#1FCB4F" : "#ff0000")};
        font-weight: 500;
      }
    }
  }
`;

export default Comment;
