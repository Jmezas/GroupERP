import { BaseApplication } from "../../shared/application/interface/base-application";
import { HistoryModel } from "../domain/models/history.model";
import { HistoryRepository } from "../domain/repositories/history.respository";

export class HistoryApplication extends BaseApplication<HistoryModel> {
  constructor(private repositoryHistory: HistoryRepository) {
    super(repositoryHistory);
  }

  async reportByHistory(id: number) {
    return await this.repositoryHistory.reportByHistory(id);
  }
}
