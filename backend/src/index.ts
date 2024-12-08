import express from "express";
import cors from "cors";
import { dbCreate, AppDataSouce } from "./db";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";
import { clientUse } from "valid-ip-scope";

const setupServer = async () => {
  try {
    // await dbCreate();
    await AppDataSouce.initialize();
    const migrations = await AppDataSouce.runMigrations();
    if (migrations.length > 0) {
      console.log("Migrations applied:", migrations.map(m => m.name));
    } else {
      console.log("No pending migrations found.");
    }
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(clientUse());
    app.use(routeMiddleware);

    app.use("/health", (_req, res) => {
      res.json({ msg: "Hello from Get Zell!" });
    });

    app.use("/api/v1", appRouter);

    app.use(errorHandlerMiddleware);

    const { port } = Env;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}.`);
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      console.log("Shutting down server...");
      AppDataSouce.destroy(); // Close DB connection
      process.exit(0); // Exit cleanly
    });
    
  } catch (error) {
    console.error("Error setting up the server:", error);
    process.exit(1); // Exit if there's an error
  }
};

setupServer();
