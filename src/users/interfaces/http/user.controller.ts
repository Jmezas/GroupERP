import { Request, Response } from "express";
import { UserApplication } from '../../application/user.application';
export class UserController {
    constructor(private application: UserApplication) { 
        this.list=this.list.bind(this)
    }
    async list(req: Request, res: Response) {
        const users = await this.application.findAll();
        return res.json(users);
    }
    async add(req: Request, res: Response) {
        const users = await this.application.add(req.body);
        return res.json(users);
    }
    async update(req: Request, res: Response) {
        const users = await this.application.update(req.body);
        return res.json(users);
    }
    async delete(req: Request, res: Response) {
        const users = await this.application.delete(req.params.id);
        return res.json(users);
    } 
    async findById(req: Request, res: Response) {
        const users = await this.application.findById(req.params.id);
        return res.json(users);
    } 
}