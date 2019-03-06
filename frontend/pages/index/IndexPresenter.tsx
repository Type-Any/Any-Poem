import React from "react";
import styled from "styled-components";
import Poems from "../../components/Poems";
import { Poem as PoemAsProps } from "../../types/graph";
import Link from "next/link";

interface IProps {
  from: string;
  poems: PoemAsProps[];
}

export default ({ from, poems }: IProps) => (
  <Container>
    <h1>Index Page</h1>
    <p>Rendered from {from}</p>
    <Link href={`/write`}>
      <a>시쓰기</a>
    </Link>
    <Poems poems={poems} />
  </Container>
);

const Container = styled.div`
  width: 100%;
  padding: 30px 30px;
`;
