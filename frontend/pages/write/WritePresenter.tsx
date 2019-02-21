import React from "react";
import useHandleInput from "../../utils/useHandleInput";
import redirect from "../../utils/redirect";
import { Poem } from "../../types/graph";

interface IProps {
  poem?: Poem;
  save: ({ variables: {} }) => void;
}

interface IUseHandleInput<T> {
  value: T;
  onChange: (value: T) => void;
}

const WritePresenter = (props: IProps) => {
  const { poem, save } = props;
  let title: IUseHandleInput<any>, text: IUseHandleInput<any>;

  if (poem) {
    title = useHandleInput(poem.title);
    text = useHandleInput(poem.text);
  } else {
    title = useHandleInput("");
    text = useHandleInput("");
  }

  return (
    <div>
      <div>
        <input type="text" {...title} placeholder="제목" />
      </div>
      <div>
        <textarea {...text} placeholder="본문" />
      </div>
      <button
        onClick={() => {
          save({
            variables: {
              title: title.value,
              text: text.value
            }
          });
          redirect({}, "/");
        }}
      >
        저장하기
      </button>
    </div>
  );
};

export default WritePresenter;
