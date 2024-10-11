import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/domain/entities/User";

interface UserInterface {
  get(id: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
}

export class UserService implements UserInterface {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async get(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async update(id: string, user: User): Promise<User> {
    return this.userRepository.updateUser(id, user);
  }
}
