import { OriginalText } from "@/domain/entities/OriginalText";

export class OriginalTextFactory {
  static create(data: { text: string }): OriginalText {
    return {
      id: Date.now().toString(),
      text: data.text,
    };
  }
}
