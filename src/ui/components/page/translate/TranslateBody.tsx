import React from "react";
import { Button } from "@/ui/components/common/Button";
import { Stack } from "@/ui/components/common/Stack";
import { Loading } from "@/ui/components/common/Loading";
import TranslateService from "@/ui/di/TranslationService";
import { OriginalTextFactory } from "@/domain/factories/OriginalTextFactory";
import { TranslatedText } from "@/domain/entities/TranslatedText";
import { TranslatedTextFactory } from "@/domain/factories/TranslatedTextFactory";
import { useLoader } from "@/ui/hooks/useLoader";

export function TranslateBody({
  selectedText,
}: {
  selectedText: string;
}): JSX.Element {
  const { loading, onStart, onEnd } = useLoader();
  const [translatedText, setTranslatedText] =
    React.useState<TranslatedText | null>(null);

  const translate = React.useCallback(async () => {
    try {
      onStart();
      const res = await TranslateService.translate(
        OriginalTextFactory.create({
          text: selectedText,
        })
      );
      setTranslatedText(TranslatedTextFactory.create(res));
    } catch (e) {
      console.error(e);
    } finally {
      onEnd();
    }
  }, [selectedText, onStart, onEnd]);

  return (
    <Stack className="space-y-5" direction="col">
      <Stack direction="col">
        <div>
          <b>原文</b>
        </div>
        <div>{selectedText}</div>
      </Stack>
      {loading && (
        <Stack className="justify-center p-3" direction="col">
          <Loading />
        </Stack>
      )}
      {translatedText !== null && (
        <Stack direction="col">
          <div>
            <b>翻訳</b>
          </div>
          <div>{translatedText.text}</div>
        </Stack>
      )}
      <Button onClick={translate}>翻訳する</Button>
    </Stack>
  );
}
