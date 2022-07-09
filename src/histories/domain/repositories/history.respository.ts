import { BaseRepository } from "../../../shared/domian/repository/base-repository";
import { HistoryModel } from "../models/history.model";
export interface HistoryRepository  extends BaseRepository<HistoryModel,number>{
    reportByHistory(id: number): Promise<HistoryModel[]>;
}