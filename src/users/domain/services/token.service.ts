import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../models/user.model";
import jwt from "jwt-simple";
import moment from "moment";
import yenv from "yenv";
import { ITokens } from "../models/tokens.interface";
import { ResponseValidateToken } from "../../../shared/types/response-validate-token.types";
import { TOKEN_ERROR, TOKEN_ERROR_MESSAGE } from "../../../shared/enum/token-error.enum";

const env = yenv();
export class TokensService {
  static generateRefreshToken(): string {
    return uuidv4();
  }
  static generateAccessToken(user: Partial<UserModel>): string {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      iat: moment().unix(),
      exp: moment().add(env.TOKEN.TIMEOUT, "seconds").unix(),
    };

    return jwt.encode(payload, env.TOKEN.KEWORD);
  }
  static generateTokens(user: Partial<UserModel>): ITokens {
    const refreshToken = TokensService.generateRefreshToken();
    const accessToken = TokensService.generateAccessToken(user);
    return {
      accessToken,
      refreshToken,
    };
  }
  static validateAccessToken(Accesstoken: string):Promise<ResponseValidateToken> { 
    return new Promise((resolve, reject) => {
        try{
        const payload = jwt.decode(Accesstoken, env.TOKEN.KEWORD); 
        resolve(payload)
        }catch(error){  
            if(error.message.toLowerCase()===TOKEN_ERROR.TOKEN_INVALID){
                reject({
                    status:409,
                    message:TOKEN_ERROR_MESSAGE.TOKEN_EXPIRED
                })
            }else{
                reject({
                    status:401,
                    message:TOKEN_ERROR_MESSAGE.TOKEN_INVALID
                })
            }
        }
    })
  
  }
}
