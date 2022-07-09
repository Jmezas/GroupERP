import { HistoryModel } from '../domain/models/history.model';
import { HistoryRepository } from '../domain/repositories/history.respository';

export class HistoryApplication {
    constructor(private repositoryHistory: HistoryRepository) { }
    async add(History: HistoryModel) {
        return await this.repositoryHistory.insert(History);
    }
    async update(History: HistoryModel) {
        return await this.repositoryHistory.update(History);
    }
    async delete(id: number) {
        return await this.repositoryHistory.delete(id);
    } 
    async findById(id: number) {
        return await this.repositoryHistory.findById(id);
    }
    async find() {
        return await this.repositoryHistory.findAll();
    }
    async reportByHistory(id:number){
        return await this.repositoryHistory.reportByHistory(id);
    }
}
