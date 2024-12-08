import { Router } from "express";
import { TodoListController } from "../controllers";
import { TitleValidator } from "../validators";

export const todoListRouter = Router()

todoListRouter.post(
  "/",
  TitleValidator.createTitleValidator(),
  TodoListController.createTodoListController
)

todoListRouter.get(
  "/:id",
  TodoListController.getTodoListController
)

todoListRouter.put(
  "/:id",
  TitleValidator.createTitleValidator(),
  TodoListController.updateTodoListController
)

todoListRouter.delete(
  "/:id",
  TodoListController.deleteTodoListController
)
