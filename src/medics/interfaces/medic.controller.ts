import { MedicApplication } from "../application/Medic.application"; 
import { Request, Response } from "express";
import { MedicFactory } from "../domain/models/Medic.factory";
import { Trace } from "../../shared/helprs/trace.helper"; 
import { Logger, Transport } from "../../shared/helprs/logging.helper"; 
export class MedicController {
    constructor(private Application: MedicApplication) { 
        this.list=this.list.bind(this)
        this.add=this.add.bind(this)
        this.update=this.update.bind(this)
        this.delete=this.delete.bind(this)
        this.findOne=this.findOne.bind(this)
    }
    async add(req: Request, res: Response) {  
        Trace.TraceId(true)
        const Medic = new MedicFactory().create(req.body);
        const result = await this.Application.add(Medic);
         res.json(result);
    }
    async update(req: Request, res: Response) {
        Trace.TraceId(true)
        const MedicToInsert= { id:req.params.id , ...req.body};  
        const Medic = new MedicFactory().create(MedicToInsert);
        const result = await this.Application.update(Medic,{},[]);
        res.json(result);
    }
    async delete(req: Request, res: Response) {
        Trace.TraceId(true)
        const id =+req.params.id;
        const Medic=await this.Application.delete({id});
        res.json(Medic); 
        
    }
    async findOne(req: Request, res: Response) {
        Trace.TraceId(true)
        const id =+req.params.id; 
        const Medic=await this.Application.findByOne({id},[]); 
        res.json(Medic); 
    }
    async list(req: Request, res: Response) {
        Logger.getLogger().info({
            typeElement: "MedicController",
            typeAction: "list",
            traceId: Trace.TraceId(true),
            message: "Listing all Medics",
            query:JSON.stringify({}),
            datetime: new Date(),
        });     
        const Medics = await this.Application.findAll({},[],{});
        res.json(Medics);
    } 
}