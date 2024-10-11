import React, { EffectCallback } from "react";

/**
 * render時に一度だけ実行する関数を受け付ける
 *
 * @note React.useEffectがStrictModeのdev環境下で二度実行されるのを防ぐためのhook
 * @see https://github.com/reactwg/react-18/discussions/18#discussion-3385714
 * @param func 一度だけ実行する関数
 * @param condition 実行条件（falseが渡されてるうちは実行を保留する）
 */
export const useMountEffect = (
  func: EffectCallback,
  condition: boolean = true
): void => {
  const didLogRef = React.useRef<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.useEffect((): any => {
    if (!didLogRef.current && condition) {
      didLogRef.current = true;
      return func();
    }
    return () => {
      // do nothing
    };
  }, [condition, func]);
};

export default useMountEffect;
