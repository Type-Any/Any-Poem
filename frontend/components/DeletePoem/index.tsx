import React from "react";
import { Poem } from "../../types/graph";
import { Mutation } from "react-apollo";
import { DELETE_POEM } from "./DeletePoemQueries";
import redirect from "../../utils/redirect";

interface IProps {
  poem: Poem;
}

const DeletePoem = (props: IProps) => {
  const { poem } = props;
  return (
    <Mutation mutation={DELETE_POEM} variables={{ poemId: poem.id }}>
      {DeletePoem => (
        <button
          onClick={() => {
            DeletePoem();
            redirect({}, "/");
          }}
        >
          삭제
        </button>
      )}
    </Mutation>
  );
};

export default DeletePoem;
