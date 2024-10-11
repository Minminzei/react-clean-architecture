import { UserRepository } from "@/domain/repositories/UserRepository";
import { HttpClient } from "@/domain/services/HttpClient";
import { User } from "@/domain/entities/User";

export default class UserRepositoryImpl implements UserRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getUserById(id: string) {
    const { data } = await this.httpClient.get<User>(`/users/${id}`);
    return data;
  }

  async updateUser(id: string, user: User) {
    const { data } = await this.httpClient.put<User>(`/users/${id}`, user);
    return data;
  }
}
