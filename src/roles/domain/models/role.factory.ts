import { RoleModel } from "./role.model";

export interface IRole {
  id: number;
  name: string;
  active: boolean;
}
export class RoleFactory {
  create(role: Partial<IRole>) {
    const id = role.id || 0;
    const name = role.name;
    const active = role.active || true;
    if(!name){
        throw new Error("Name is required");
    }
    return new RoleModel(id, name, active);
  }
 
}
