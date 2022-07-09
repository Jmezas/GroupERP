import { UserModel } from '../domain/models/user.model';
import { userRepository } from '../domain/repositories/user.respository';
export class UserApplication {
    constructor(private repositoryUser: userRepository) { }
    async add(user: UserModel) {
        return await this.repositoryUser.insert(user);
    }
    async update(user: UserModel) {
        return await this.repositoryUser.update(user);
    }
    async delete(id: string) {
        return await this.repositoryUser.delete(id);
    } 
    async findById(id: string) {
        return await this.repositoryUser.findById(id);
    }
    async findAll() {
        return await this.repositoryUser.findAll();
    }
}