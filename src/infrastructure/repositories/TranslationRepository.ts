import { TranslationRepository } from "@/domain/repositories/TranslationRepository";
import { HttpClient } from "@/domain/services/HttpClient";
import { OriginalText } from "@/domain/entities/OriginalText";
import { TranslatedText } from "@/domain/entities/TranslatedText";

export default class TranslationRepositoryImpl
  implements TranslationRepository
{
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async translate(originalText: OriginalText): Promise<TranslatedText> {
    const { data } = await this.httpClient.post<TranslatedText>(
      "/translates",
      originalText
    );
    return data;
  }
}
