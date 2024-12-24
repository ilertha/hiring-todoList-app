import express from "express";
import { listController } from "../controllers/List/list.controller";
import { checkAuth } from "../utils";

export const listRouter = express.Router();

listRouter.use(checkAuth);

// List routes
listRouter.post("/",  listController.createList);
listRouter.get("/",  listController.getAllLists);
listRouter.get("/important",  listController.getImportantLists);
listRouter.get("/completed",  listController.getCompletedLists);
listRouter.get("/:id",  listController.getListById);
listRouter.post("/:id",  listController.updateList);
listRouter.delete("/:id",  listController.deleteList);
listRouter.patch("/:id/toggle-complete",  listController.toggleListComplete);
listRouter.patch("/:id/toggle-importance",  listController.toggleListImportance);

