import { useState } from "react";

const useHandleMenu = (initialState: boolean) => {
  const [isOpen, setOpen] = useState(initialState);

  const clickMenu = (value: boolean) => setOpen(value);

  return { isOpen, clickMenu };
};

export default useHandleMenu;
