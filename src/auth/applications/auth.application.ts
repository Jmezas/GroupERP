import { AuthRepository } from "../domain/repositories/auth.respository";
import { AuthModel } from "../domain/models/auth.model";

export class AuthApplication{
    constructor(private respository:AuthRepository){}

    login(auth:AuthModel){
        console.log("as",auth)
        return this.respository.login(auth);
    }
    getNewAccessToken(refreshToken:string){
        return this.respository.getNewAccessToken(refreshToken);
    }
}