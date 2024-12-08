import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity("user")
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  username: string; 

  @Column({ type: "varchar", unique: true, nullable: false })
  email: string; 

  @Column({ type: "varchar", nullable: false })
  password: string;

}
