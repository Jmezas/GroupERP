import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "integer" })
  ege: number; 

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 100 })
  refreshToken: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "timestamp" })
  deletedAt: Date;

  @Column({ type: "varchar", length: 100 })
  email: string;
  
  @Column({ type: "boolean", default: true })
  active: boolean;
}
