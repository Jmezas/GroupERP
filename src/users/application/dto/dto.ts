import { UserModel } from "../../../users/domain/models/user.model";
import Result from "../../../shared/application/interface/result.interface";
import { DTOabstract } from "../../../shared/application/dto/abstract.dto";

const FilterfielActivedUsers = (User: UserModel) => {
  const obj = Object.assign({}, User);
  delete obj.active;
  return obj;
};

export interface CB<T> {
  cb(result: Result<T>): Result<T>;
}

export class UserDTO extends DTOabstract<UserModel> {
  callback(result: Result<UserModel>): Result<UserModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map((user: UserModel) => {
        if (user.roles) {
          user.roles = user.roles.map((role: any) => role.roleName);
        }
        delete user.active;
        delete user.refreshToken;
        delete user.password;
        delete user.updatedAt;
        delete user.deletedAt;
        delete user.createdAt;
        return user;
      });
    } else {
      const userModel = result.payload.data as UserModel;
      if (userModel.roles) {
        userModel.roles = userModel.roles.map((role: any) => role.roleName);
      }
      delete (result.payload.data as UserModel).active;
      delete (result.payload.data as UserModel).refreshToken;
      delete (result.payload.data as UserModel).password;
      delete (result.payload.data as UserModel).updatedAt;
      delete (result.payload.data as UserModel).deletedAt;
      delete (result.payload.data as UserModel).createdAt;
    }

    return result;
  }
}
