import { User } from "@/domain/entities/User";

export interface UserRepository {
  getUserById(id: string): Promise<User>;
  updateUser(id: string, data: User): Promise<User>;
}
