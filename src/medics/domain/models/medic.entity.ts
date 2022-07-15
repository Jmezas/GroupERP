import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "medic" })
export class MedicEntity { 
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 100 })
  name: string;
  @Column({ type: "varchar", length: 100 })
  lastname: string;
  @Column({ type: "varchar", length: 5 })
  cmp: string;
  @Column({ type: "boolean", default: true })
  active: boolean;
}
