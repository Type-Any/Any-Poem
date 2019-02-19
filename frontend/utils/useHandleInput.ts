import { useCallback, useState } from "react";

const useHandleInput = (initValue: any) => {
  const [value, setValue] = useState(initValue);

  const onChange = useCallback(e => {
    setValue(e.currentTarget.value);
  }, []);

  return { value, onChange };
};

export default useHandleInput;
