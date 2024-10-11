import HttpClient from "@/infrastructure/services/HttpClient";
import UserRepository from "@/infrastructure/repositories/UserRepository";
import { UserService } from "@/use_case/UserService";

const httpClient = new HttpClient();
const userRepository = new UserRepository(httpClient);
const userService = new UserService(userRepository);
export default userService;
