import { UserModel } from "../domain/models/user.model";
import { userRepository } from "../domain/repositories/user.respository";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { UserEntity } from "../domain/models/user.entity";
export class UserInfrastructure
  extends BaseInfrastructure<UserModel>
  implements userRepository
{
  constructor() {
    super(UserEntity);
  }
}
