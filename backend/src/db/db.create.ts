import { createDatabase } from "typeorm-extension";
import { Env } from "../env";
import { UserEntity, TodoListEntity } from "../entities"; // Make sure TodoListEntity is imported

export const dbCreate = async () => {
  try {
    // Log the database creation process
    console.log(`Attempting to create database: ${Env.dbName}`);

    // Create the database if it doesn't exist
    await createDatabase({
      ifNotExist: true, // Only create if it doesn't already exist
      options: {
        type: "mysql",
        host: Env.host,
        username: Env.username,
        password: Env.password,
        port: Env.dbPort,
        database: Env.dbName,
        entities: [UserEntity, TodoListEntity], // Include both entities
      },
    });

    console.log(`Database ${Env.dbName} initialize success`);
  } catch (error) {
    console.error("Error creating database:", error);
    throw error; // Rethrow the error to handle it higher up in the call stack if necessary
  }
};
