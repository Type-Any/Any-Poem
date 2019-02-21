import React from "react";
import { Poem } from "../../types/graph";
import Comments from "../../components/Comments";
import Link from "next/link";

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
      <div>
        <Link href={`/write?id=${poem.id}`} as={`/write/${poem.id}`}>
          <a>수정</a>
        </Link>
        <button>삭제</button>
      </div>
      <Comments poemId={poem.id} />
    </div>
  );
};

export default PoemPresenter;
