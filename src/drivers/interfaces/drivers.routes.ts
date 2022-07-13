import { BaseRouter } from "../../shared/interfaces/base-router";
import { DriverApplication } from "../appication/driver.application";
import { DriverInfrastructure } from "../infrastructure/driver.infrastructure";
import { DriverController } from "./driver.controller";

const intrastructure = new DriverInfrastructure();
const appication = new DriverApplication(intrastructure);
const controller = new DriverController(appication);
export default class extends BaseRouter{
    constructor(){
        super(controller);
    }
    mountRoutes(): void {} 
}
