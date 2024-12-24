import { UserEntity } from "../entity";

export type PayloadType = {
  uuid: string;
}

export type CreateTitleType = {
  title: string;
  userId: UserEntity
}

export type ListType = {
  title?: string,
  description?: string,
  important?: boolean,
  completed?: boolean,
  duedate?: Date,
  deletedAt?:Date
}