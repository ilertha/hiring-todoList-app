
import { createDatabase } from "typeorm-extension";
import { Env } from "../env";
import { UserEntity, ListEntity } from "../entity"; // Make sure TodoListEntity is imported

export const dbCreate = async () => {
  try {

    await createDatabase({
      ifNotExist: true, 
      options: {
        type: "mysql",
        host: Env.host,
        username: Env.username,
        password: Env.password,
        port: Env.dbPort,
        database: Env.dbName,
        entities: [UserEntity, ListEntity], 
      },
    });

    console.log(`Database ${Env.dbName} initialize success`);
  } catch (error) {
    console.error("Error creating database:", error);
    throw error; 
  }
};
