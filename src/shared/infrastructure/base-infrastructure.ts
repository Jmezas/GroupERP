import DatabaseBootstrap from "../../bootstrap/database.bootstrap";
import { ObjectType, Repository } from "typeorm";
import * as _ from "lodash";
import Result from "../application/interface/result.interface";
import { ResponseDto } from "../application/dto/response.dt";
import { Trace } from "../helprs/trace.helper";
export abstract class BaseInfrastructure<T> {
  constructor(private entity: ObjectType<T>) {}
  async insert(entity: T): Promise<Result<T>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository = dataSource.getRepository(this.entity);
    const intance = repository.create(entity);
    const data: T = await repository.save(intance);
    return ResponseDto<T>(Trace.TraceId, data);
  }
  async update(
    entity: Partial<T>,
    where: object,
    relations: string[] = []
  ): Promise<Result<T>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);
    let recordsToUpdate: any = await repository.findOne({
      where,
      relations,
    });
    recordsToUpdate = _.merge(recordsToUpdate, entity);
    await repository.save(recordsToUpdate);
    return ResponseDto<T>(Trace.TraceId, recordsToUpdate);
  }
  async delete(where: object): Promise<Result<T>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);
    let recordsToDelete: any = await repository.findOne({
      where,
    });
    recordsToDelete = _.merge(recordsToDelete, { active: false });
    await repository.save(recordsToDelete);
    return ResponseDto<T>(Trace.TraceId, recordsToDelete);
  }

  async findByOne(
    where: object = {},
    relations: string[] = []
  ): Promise<Result<T>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);
    const data: T = await repository.findOne({ where, relations });  
    return ResponseDto<T>(Trace.TraceId, data);
  }
  async findAll(
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<T>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);

    const _where = Object.assign(where, { active: true });

    const data: T[] = await repository.find({
      where: _where,
      relations,
      order,
    });
    return ResponseDto<T>(Trace.TraceId, data);
  }
  async getPage(
    page: number,
    pagesize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<T>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);
    const [data, total] = await repository.findAndCount({
      where,
      relations,
      order,
      skip: page * pagesize,
      take: pagesize,
    });
    return ResponseDto<T>(Trace.TraceId, data, total);
  }
}
