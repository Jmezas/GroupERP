import { Trace } from "../../../shared/helprs/trace.helper"; 
import { BaseRepository } from "../../domain/repository/base-repository";
import Result from "./result.interface";
import { Logger } from "../../../shared/helprs/logging.helper";
import { DTOabstract } from "../dto/abstract.dto";

export class BaseApplication<T> {
  constructor(
    private repository: BaseRepository<T, number>,
    private dto: DTOabstract<T> = null,
    private applicationName: string = null
  ) {}
  async add(entity: T): Promise<Result<T>> {
    const result = await this.repository.insert(entity);
    return this.dto.mapping(result); 
  }
  async update(
    entity: T,
    where: object,
    relations: string[]
  ): Promise<Result<T>> { 
    const result = await this.repository.update(entity, where, relations);
    return this.dto.mapping(result); 
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
    Logger.getLogger().info({
      typeElement: this.applicationName || "application",
      typeAction: "list",
      traceId: Trace.TraceId(),
      message: "Listing all",
      query: JSON.stringify({}),
      datetime: new Date(),
    }); 
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
