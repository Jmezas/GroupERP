import { HistoryEntity } from "../../../histories/domain/models/historyentity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "drive"})
export class DriverEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type :"varchar", length: 100})
    name:string;

    @Column({type :"varchar", length: 100})
    lastname:string;

    @Column({type :"varchar", length: 100})
    licenseDriver:string;

    @Column({ type: "boolean", default: true })
    active: boolean;
    
    @OneToMany(type => HistoryEntity, history => history.driver)
    histories: HistoryEntity[];
}