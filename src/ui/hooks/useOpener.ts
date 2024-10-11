import React from "react";

type Props = {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

export const useOpener = (defaultState = false): Props => {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultState);
  const handleOpen = React.useCallback(() => setIsOpen(true), []);
  const handleClose = React.useCallback(() => setIsOpen(false), []);
  return { isOpen, handleOpen, handleClose };
};
