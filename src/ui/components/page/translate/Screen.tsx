import { useNavigate, useLocation } from "react-router-dom";
import { useMountEffect } from "@/ui/hooks/useMountEffect";
import { TranslateHeader } from "@/ui/components/page/translate/TranslateHeader";
import { TranslateBody } from "@/ui/components/page/translate/TranslateBody";
import { SelectedText } from "@/ui/type/SelectedText";
import { Layout } from "@/ui/components/common/Layout";
import { Card } from "@/ui/components/common/Card";

function Container({ selectedText }: { selectedText: SelectedText }) {
  const { text } = selectedText;
  return (
    <Layout style={{ bottom: "8px", right: "8px" }}>
      <Card className="sm:max-w-[425px]">
        <TranslateHeader />
        <TranslateBody selectedText={text} />
      </Card>
    </Layout>
  );
}

export default function Screen(): JSX.Element | null {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedText } = state;
  useMountEffect(() => {
    if (selectedText === null) {
      navigate("/");
    }
  });
  if (selectedText === null) {
    return null;
  }
  return <Container selectedText={selectedText} />;
}
