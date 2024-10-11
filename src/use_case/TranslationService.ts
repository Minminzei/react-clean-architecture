import { TranslationRepository } from "@/domain/repositories/TranslationRepository";
import { OriginalText } from "@/domain/entities/OriginalText";
import { TranslatedText } from "@/domain/entities/TranslatedText";

interface TranslationInterface {
  translate(data: OriginalText): Promise<TranslatedText>;
}

export class TranslationService implements TranslationInterface {
  private translationRepository: TranslationRepository;

  constructor(translationRepository: TranslationRepository) {
    this.translationRepository = translationRepository;
  }

  async translate(data: OriginalText): Promise<TranslatedText> {
    return this.translationRepository.translate(data);
  }
}
