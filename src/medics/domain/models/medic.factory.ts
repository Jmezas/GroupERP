import { MedicModel } from "./medic.model";

export interface IMedic{
    id: number;
    name: string;
    lastname: string;
    cmp: string;
    active: boolean;

}
export class MedicFactory{
    create(medic:Partial<IMedic> ){
        const id = medic.id || 0;
        const name = medic.name;
        const lastname = medic.lastname;
        const cmp = medic.cmp;
        const active = medic.active || true;
        if(!name){
            throw new Error("Name is required");
        }
        
        return new MedicModel(id, name, lastname, cmp, active);
    }
}