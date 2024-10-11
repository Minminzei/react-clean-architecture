import React from "react";
import { SelectedText } from "@/ui/type/SelectedText";
import { getSelectedText } from "@/ui/lib/selectText";

export const useSelectedText = (): SelectedText | null => {
  const [selectedText, setSelectedText] = React.useState<SelectedText | null>(
    null
  );
  const handleMouseUp = React.useCallback(() => {
    const selection = getSelectedText();
    setSelectedText(selection);
  }, []);
  React.useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);
  return selectedText;
};
