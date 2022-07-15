import { DTOabstract } from "../../../drivers/appication/dto/dto";
import { BaseRepository } from "../../../shared/domian/repository/base-repository";
import Result from "./result.interface";

export class BaseApplication<T> {
  constructor(
    private repository: BaseRepository<T, number>,
    private dto: DTOabstract<T> = null
  ) {}
  async add(entity: T): Promise<Result<T>> {
    return await this.repository.insert(entity);
  }
  async update(
    entity: T,
    where: object,
    relations: string[]
  ): Promise<Result<T>> {
    return await this.repository.update(entity, where, relations);
  }
  async delete(where: object): Promise<Result<T>> {
    const result = await this.repository.delete(where);
    return this.dto.mapping(result);
  }
  async findByOne(where: object, relations: string[]): Promise<Result<T>> {
    const result = await this.repository.findByOne(where, relations);
    return this.dto.mapping(result);
  }
  async findAll(
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string }
  ): Promise<Result<T>> {
    const result = await this.repository.findAll(where, relations, order);
    return this.dto.mapping(result);
  }
  async getPage(
    page: number,
    pagesize: number,
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string }
  ) {
    return await this.repository.getPage(
      page,
      pagesize,
      where,
      relations,
      order
    );
  }
}
