import { BaseRouter } from "../../shared/interfaces/base-router";
import { MedicApplication } from "../application/medic.application";
import { MedicInfrastructure } from "../infrastructure/Medic.infrastructure";
import { MedicController } from "./medic.controller";

const intrastructure = new MedicInfrastructure();
const appication = new MedicApplication(intrastructure);
const controller = new MedicController(appication);
export default class extends BaseRouter{
        constructor(){
        super(controller);
    }
    mountRoutes(): void {} 
}
