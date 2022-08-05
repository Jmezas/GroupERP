import { RoleApplication } from "../application/role.application"; 
import { Request, Response } from "express";
import { RoleFactory } from "../domain/models/Role.factory";
import { Trace } from "../../shared/helprs/trace.helper"; 
import { Logger, Transport } from "../../shared/helprs/logging.helper"; 
export class RoleController {
    constructor(private Application: RoleApplication) { 
        this.list=this.list.bind(this)
        this.add=this.add.bind(this)
        this.update=this.update.bind(this)
        this.delete=this.delete.bind(this)
        this.findOne=this.findOne.bind(this)
    }
    async add(req: Request, res: Response) {  
        Trace.TraceId(true)
        const Role = new RoleFactory().create(req.body);
        const result = await this.Application.add(Role);
         res.json(result);
    }
    async update(req: Request, res: Response) {
        Trace.TraceId(true)
        const RoleToInsert= { id:req.params.id , ...req.body};  
        const Role = new RoleFactory().create(RoleToInsert);
        const result = await this.Application.update(Role,{},[]);
        res.json(result);
    }
    async delete(req: Request, res: Response) {
        Trace.TraceId(true)
        const id =+req.params.id;
        const Role=await this.Application.delete({id});
        res.json(Role); 
        
    }
    async findOne(req: Request, res: Response) {
        Trace.TraceId(true)
        const id =+req.params.id; 
        const Role=await this.Application.findByOne({id},[]); 
        res.json(Role); 
    }
    async list(req: Request, res: Response) {
        Logger.getLogger().info({
            typeElement: "RoleController",
            typeAction: "list",
            traceId: Trace.TraceId(true),
            message: "Listing all Roles",
            query:JSON.stringify({}),
            datetime: new Date(),
        });     
        const Roles = await this.Application.findAll({},[],{});
        res.json(Roles);
    } 
}