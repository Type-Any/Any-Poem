import React from "react";
import { Poem } from "../../types/graph";
import { Mutation } from "react-apollo";
import { LIKE_POEM } from "../../pages/write/WriteQueries";

interface IProps {
  poem: Poem;
}

const LikePoem = (props: IProps) => {
  const { poem } = props;
  return (
    <div>
      <div>{poem && poem.likes ? poem.likes.length : "0"}명이 좋아합니다.</div>
      <Mutation mutation={LIKE_POEM} variables={{ poemId: poem.id }}>
        {LikePoem => <button onClick={() => LikePoem()}>공감</button>}
      </Mutation>
    </div>
  );
};

export default LikePoem;
