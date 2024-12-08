import { AppDataSouce } from "../../db";
import { TodoListEntity } from "../../entities";
import { Request, Response } from "express";

export const getTodoListController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // This is the userUuid passed as a parameter

    const todoListRepository = AppDataSouce.getRepository(TodoListEntity);

    // Step 1: Find the todos where the userUuid matches the id in the request params
    const todos = await todoListRepository.find({
      where: { user: { uuid: id } }, // Match the userUuid
      relations: ["user"], // Optional: Load user details along with the todos
    });

    return res.status(200).json({
      success: true,
      todoList: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching todos",
    });
  }
};
