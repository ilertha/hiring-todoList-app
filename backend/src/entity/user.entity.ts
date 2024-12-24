import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ListEntity } from "./list.entity";
import { CoreEntity } from "./core.entity";
@Entity("user")
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({type:"varchar", unique:true, nullable: false})
  username: string;

  @Column({type:"varchar", unique: true, nullable:false})
  email: string;

  @Column({type:"varchar", unique:true, nullable:false})
  password:string;

  @OneToMany(() => ListEntity, (list) => list.user)
  lists : ListEntity[]
}