import Result from "../../../shared/application/interface/result.interface";
import { AuthModel } from "../models/auth.model";
import { TokenModel } from "../models/token.model";

 
export interface AuthRepository {
    login(auth:AuthModel): Promise<Result<TokenModel>>; 
    getNewAccessToken(refreshToken:string): Promise<Result<TokenModel>>;
}