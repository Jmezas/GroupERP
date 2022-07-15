import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { DriverEntity } from "../../../drivers/domain/models/driver.entity";

@Entity({ name: "history" })
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 100 })
  namePatient: string;

  @ManyToMany((type) => DriverEntity, (driver) => driver.histories)
  driver: DriverEntity;
}
