import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { CoreEntity } from "./core.entity";

@Entity("list")
export class ListEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid : string

  @Column({type:"varchar", nullable:false})
  title:string;

  @Column({type:"varchar", nullable:true})
  description : string;

  @Column({default:false})
  important : boolean

  @Column({default:false})
  completed : boolean 

  @Column({type:"date", nullable: true})
  duedate: Date;

  @ManyToOne(() => UserEntity, (user) => user.lists)
  @JoinColumn({ name: "userUuid" })
  user: UserEntity


}