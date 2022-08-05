import { RoleEntity } from "../../../roles/domain/models/role.entity";
import { RoleModel } from "../../../roles/domain/models/role.model";
import { PasswordService } from "../services/password.service";
import { TokensService } from "../services/token.service";
import { UserModel } from "./user.model";

export interface IUser {
  id: number;
  name: string;
  age: number;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
  roles: number[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  active: boolean;
}

export class UserFactory {
  create(user: Partial<IUser>) {
    const id = user.id || 0;
    const name = user.name;
    const age = user.age;
    const lastname = user.lastname;
    const email = user.email;
    const password = PasswordService.hasPassword(user.password);
    const refreshToken = TokensService.generateRefreshToken();
    const roles = user.roles;
    const createdAt = user.createdAt || new Date();
    const updatedAt = user.updatedAt || null;
    const deletedAt = user.deletedAt || null;
    const active = user.active || true;

    if (name.trim() === "" || name.trim().length < 4) {
      throw new Error("Invalid name");
    }
    return new UserModel(
      id,
      name,
      age,
      lastname,
      email,
      password,
      refreshToken,
      roles,
      createdAt,
      updatedAt,
      deletedAt,
      active
    );
  }
}
