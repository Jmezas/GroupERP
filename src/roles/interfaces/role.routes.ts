import { BaseRouter } from "../../shared/interfaces/base-router";
import { RoleApplication } from "../application/role.application";
import { RoleInfrastructure } from "../infrastructure/Role.infrastructure";
import { RoleController } from "./Role.controller";

const intrastructure = new RoleInfrastructure();
const appication = new RoleApplication(intrastructure);
const controller = new RoleController(appication);
export default class extends BaseRouter{
    constructor(){
        super(controller);
    }
    mountRoutes(): void {} 
}
