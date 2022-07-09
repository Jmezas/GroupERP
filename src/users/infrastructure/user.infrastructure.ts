import { UserModel } from '../domain/models/user.model'; 
import { userRepository } from '../domain/repositories/user.respository';
import { BaseInfrastructure } from '../../shared/infrastructure/base-infrastructure';
export class UserInfrastructure extends BaseInfrastructure<UserModel,string> implements userRepository{
  
}