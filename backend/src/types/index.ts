import { UserEntity } from "../entities";

export type PayloadType = {
  id: string;
};

export type CreateTitleType = {
  title: string;
  userId: UserEntity;
};

export type TodoListType = {
  title : string;
  description : string;
  important: boolean;
  completed : boolean;
  duedate : Date;
  userUuid: string;
}