import { UserModel } from '../models/user.model';
import { BaseRepository } from '../../../shared/domain/repository/base-repository';
export interface userRepository extends BaseRepository<UserModel,string> {
 
}