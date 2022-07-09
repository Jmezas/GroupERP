import { UserModel } from '../models/user.model';
import { BaseRepository } from '../../../shared/domian/repository/base-repository';
export interface userRepository extends BaseRepository<UserModel,string> {
 
}