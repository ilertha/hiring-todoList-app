import { AppDataSouce } from "./db";

export const initializeDatabase = async () => {
  try {
    // Initialize the data source
    await AppDataSouce.initialize();

    // Run pending migrations only
    const migrations = await AppDataSouce.runMigrations();
    if (migrations.length > 0) {
      console.log("Migrations applied:", migrations.map(m => m.name));
    } else {
      console.log("No pending migrations found.");
    }
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  }
};
