import Link from "next/link";
import React from "react";
import Comments from "../../components/Comments";
import LikePoem from "../../components/LikePoem";
import { Poem } from "../../types/graph";
import { encodeId } from "../../utils/hashId";
import DeletePoem from "../../components/DeletePoem";

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
      <div>
        <LikePoem poem={poem} />
      </div>
      <div>{poem.text}</div>
      <div>
        <Link href={`/write?id=${encodeId(poem.id)}`} as={`/write/${encodeId(poem.id)}`}>
          <a>수정</a>
        </Link>
        <DeletePoem poem={poem} />
      </div>
      <Comments poemId={poem.id} />
    </div>
  );
};

export default PoemPresenter;
