import React from "react";
import { Poem } from "../../types/graph";
import Comments from "../../components/Comments";

interface IProps {
  poem: Poem;
}

const PoemPresenter = (props: IProps) => {
  const { poem } = props;
  return (
    <div>
      <div>
        <div>제목 </div>
        <div>{poem.title}</div>
      </div>
      <div>작가: {poem.poet.penName}</div>
      <div>{poem.text}</div>
      <Comments poemId={poem.id} />
    </div>
  );
};

export default PoemPresenter;
