import { ResponseDto } from "../../shared/application/dto/response.dt";
import { UserEntity } from "../../users/domain/models/user.entity";
import { PasswordService } from "../../users/domain/services/password.service";
import { TokensService } from "../../users/domain/services/token.service";
import { Repository } from "typeorm";
import DatabaseBootstrap from "../../bootstrap/database.bootstrap";
import Result from "../../shared/application/interface/result.interface";
import { TokenModel } from "../domain/models/token.model";
import { AuthRepository } from "../domain/repositories/auth.respository";
import { Trace } from "../../shared/helprs/trace.helper";

export class AuthInfrastructure implements AuthRepository {
  constructor() {}
  async login(auth: UserEntity): Promise<Result<TokenModel>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<UserEntity> =
      dataSource.getRepository(UserEntity);
    const user = await repository.findOne({
      where: { email: auth.email },
      relations: ["roles"],
    });
    if (user) {
      const isPasswordValid = await PasswordService.compare(
        auth.password,
        user.password
      );
      if (isPasswordValid) {
        const Accestokens = await TokensService.generateAccessToken({
          name: user.name,
          email: user.email,
          roles: user.roles.map((role) => role.roleName),
        });
        return ResponseDto(Trace.TraceId(), {Accestokens, refreshToken: user.refreshToken});
      } else {
        throw new Error("Invalid password");
      }
    } else {
      throw new Error("User not found");
    }
  }
  async getNewAccessToken(refreshToken: string): Promise<Result<TokenModel>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<UserEntity> =
      dataSource.getRepository(UserEntity);
    const user = await repository.findOne({
      where: { refreshToken, active: true },
      relations: ["roles"],
    });
    if (user) {
      const tokens = await TokensService.generateTokens({
        name: user.name,
        email: user.email,
        roles: user.roles.map((role) => role.roleName),
      });
      user.refreshToken=tokens.refreshToken
      await repository.save(user);
      return ResponseDto(Trace.TraceId(), tokens);
    } else {
      throw new Error("User not found");
    }
  }
}
