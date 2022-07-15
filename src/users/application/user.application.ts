import { BaseApplication } from "../../shared/application/interface/base-application";
import { UserModel } from "../domain/models/user.model";
import { userRepository } from "../domain/repositories/user.respository";
export class UserApplication extends BaseApplication<UserModel> {
  constructor(private repositoryUser: userRepository) {
    super(repositoryUser);
  }
}
