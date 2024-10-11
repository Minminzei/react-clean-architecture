import { SelectedText } from "@/ui/type/SelectedText";

const MarginTop = 10;
const MarginLeft = -10;

export function getSelectedText(): SelectedText | null {
  const selection = window.getSelection();
  if (selection !== null && selection.toString().trim() !== "") {
    const range = selection.getRangeAt(0);
    const { left, bottom } = range.getBoundingClientRect();
    console.log("getSelectedText");
    console.log("---");
    return {
      text: selection.toString().trim(),
      left: window.scrollX + left + MarginLeft,
      top: window.scrollY + bottom + MarginTop,
    };
  }
  return null;
}
