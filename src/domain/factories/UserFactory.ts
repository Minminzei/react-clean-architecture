import { User } from "@/domain/entities/User";

export class UserFactory {
  static create(data: { name?: string; image?: string }): User {
    return {
      id: Date.now().toString(),
      name: data.name ?? "ゲスト",
      image: data.image ?? "/user.png",
    };
  }
}
