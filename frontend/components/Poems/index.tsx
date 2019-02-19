import Link from "next/link";
import styled from "styled-components";
import { Poem as PoemAsProps } from "../../types/graph";
import { encodeId } from "../../utils/hashId";

interface IProps {
  poems: PoemAsProps[];
}

const Poem = (props: IProps) => {
  const { poems } = props;

  return (
    <Container>
      {poems.map(poem => (
        <Link key={poem.id} href={`/poem/${encodeId(poem.id)}/${poem.title}`}>
          <a>
            <PoemCard>
              <div>{poem.poet.penName}</div>
              <div>{poem.title}</div>
              <div>{poem.text}</div>
            </PoemCard>
          </a>
        </Link>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  margin: 0;
  padding: 0 0px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const PoemCard = styled.li`
  margin: 10px;
`;

export default Poem;
