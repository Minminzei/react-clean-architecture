import HttClient from "@/infrastructure/services/HttpClient";
import TranslationRepository from "@/infrastructure/repositories/TranslationRepository";
import { TranslationService } from "@/use_case/TranslationService";

const httpClient = new HttClient();
const translationRepository = new TranslationRepository(httpClient);
const translationService = new TranslationService(translationRepository);
export default translationService;
