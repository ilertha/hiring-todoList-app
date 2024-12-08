import { Column, Entity, ManyToOne,JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity("todoList")
export class TodoListEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar"})
  title: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @Column({ default: false })
  important: boolean;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: "date", nullable: true })
  duedate: Date;

  @ManyToOne(type => UserEntity)
  @JoinColumn({name:'userUuid'})
  user: UserEntity;
}
