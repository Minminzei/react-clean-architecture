import { OriginalText } from "@/domain/entities/OriginalText";
import { TranslatedText } from "@/domain/entities/TranslatedText";

export interface TranslationRepository {
  translate(data: OriginalText): Promise<TranslatedText>;
}
