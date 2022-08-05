import { RoleRepository } from "../../roles/domain/repositories/role.repository";
import Result from "../../shared/application/interface/result.interface";
import { BaseApplication } from "../../shared/application/interface/base-application";
import { UserModel } from "../domain/models/user.model";
import { userRepository } from "../domain/repositories/user.repository";
import { UserDTO } from "./dto/dto";
export class UserApplication extends BaseApplication<UserModel> {
  constructor(
    private repositoryUser: userRepository,
    private repositoryModel: RoleRepository
  ) {
    super(repositoryUser, new UserDTO(), "UserApplication");
  }
  override async add(entity: UserModel): Promise<Result<UserModel>> { 
    if (entity.roles.length > 0) { 
      const roles = await this.repositoryModel.findByIds(
        entity.roles as number[]
      ); 
      console.log(roles)
      entity.roles = roles;
    } else {
      delete entity.roles;
    }
    const result = await this.repositoryUser.insert(entity);
    return new UserDTO().mapping(result);
  }
}
