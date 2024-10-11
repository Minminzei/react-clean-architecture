import React from "react";

type Loader = {
  loading: boolean;
  onStart: () => void;
  onEnd: () => void;
};

export function useLoader(): Loader {
  const ref = React.useRef(false);
  const onStart = () => {
    ref.current = true;
  };
  const onEnd = () => {
    ref.current = false;
  };

  return {
    loading: ref.current,
    onStart,
    onEnd,
  };
}
