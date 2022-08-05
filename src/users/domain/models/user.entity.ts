import { RoleEntity } from "../../../roles/domain/models/role.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "integer" })
  age: number;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 100 })
  refreshToken: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @ManyToMany((type) => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];
}
