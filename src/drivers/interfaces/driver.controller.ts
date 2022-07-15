import { DriverApplication } from "../appication/driver.application"; 
import { Request, Response } from "express";
import { DriverFactory } from "../domain/models/driver.factory";
export class DriverController {
    constructor(private Application: DriverApplication) { 
        this.list=this.list.bind(this)
        this.add=this.add.bind(this)
        this.update=this.update.bind(this)
        this.delete=this.delete.bind(this)
        this.findOne=this.findOne.bind(this)
    }
    async add(req: Request, res: Response) {        
        const driver = new DriverFactory().create(req.body);
        const result = await this.Application.add(driver);
         res.json(result);
    }
    async update(req: Request, res: Response) {
        const driverToInsert= { id:req.params.id , ...req.body};  
        const driver = new DriverFactory().create(driverToInsert);
        const result = await this.Application.update(driver,{},[]);
        res.json(result);
    }
    async delete(req: Request, res: Response) {
        const id =+req.params.id;
        const driver=await this.Application.delete({id});
        res.json(driver); 
        
    }
    async findOne(req: Request, res: Response) {
        const id =+req.params.id; 
        const driver=await this.Application.findByOne({id},[]); 
        res.json(driver); 
    }
    async list(req: Request, res: Response) {
        const drivers = await this.Application.findAll({},[],{});
        res.json(drivers);
    }
    async reportByDriver(id:number){
        return await this.Application.reportByDriver(id);
    }
}