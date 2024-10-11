import { useNavigate } from "react-router-dom";
import { IconButton } from "@/ui/components/common/Button";
import { useSelectedText } from "@/ui/hooks/useSelectedText";
import { Layout } from "@/ui/components/common/Layout";
import { SelectedText } from "@/ui/type/SelectedText";

function Container({ selectedText }: { selectedText: SelectedText }) {
  const navigate = useNavigate();
  const { top, left } = selectedText;
  return (
    <Layout style={{ left, top }}>
      <IconButton
        onClick={() => {
          if (selectedText !== null) {
            navigate("/translate", { state: { selectedText } });
          }
        }}
        iconName="translate"
        iconColor="#22c55e"
        className="bg-white"
      />
    </Layout>
  );
}

export default function Screen(): JSX.Element | null {
  const selectedText = useSelectedText();
  if (selectedText === null) {
    return null;
  }
  return <Container selectedText={selectedText} />;
}
