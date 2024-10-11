import { TranslatedText } from "@/domain/entities/TranslatedText";

export class TranslatedTextFactory {
  static create(data: { text: string }): TranslatedText {
    return {
      id: Date.now().toString(),
      text: data.text,
    };
  }
}
