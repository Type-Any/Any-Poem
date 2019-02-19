import React from "react";
import useHandleInput from "../../utils/useHandleInput";
import redirect from "../../utils/redirect";

interface IProps {
  save: ({ variables: {} }) => void;
}

const WritePresenter = (props: IProps) => {
  const { save } = props;
  const title = useHandleInput("");
  const text = useHandleInput("");

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
