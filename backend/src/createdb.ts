import { dbCreate } from "./db/db.create";

const dbcreatefirst = async () => {
  try {
    await dbCreate();
  } catch (error) {
    console.error("db create error",error)
  }
}

dbcreatefirst()