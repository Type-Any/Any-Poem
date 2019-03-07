import React from "react";
import { Poem } from "../../types/graph";

interface IProps {
  poems: Poem[];
}

const PoemListPresenter = (props: IProps) => {
  const { poems } = props;
  return <div>Poem List...</div>;
};

export default PoemListPresenter;
