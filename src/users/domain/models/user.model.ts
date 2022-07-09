import { RefreshTokenVO } from '../value-objects/refresh-token.vo';
export class UserModel { 
    constructor(
        public id: number, 
        public name: string, 
        public age: number, 
        public lastname: string, 
        public password: string, 
        public refreshToken: RefreshTokenVO,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
        ) {}
}

