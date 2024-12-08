import { Request, Response } from "express";
import { todoListService } from "../../services";

export const updateTodoListController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const { title, description, important, completed, duedate } = req.body;

    const updatedTodo = await todoListService.updateTodoList(id, {
      title,
      description,
      important,
      completed,
      duedate,
    });

    return res.status(200).json({
      success: true,
      message: "Todo item updated successfully",
      todolist: updatedTodo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating todo item",
    });
  }
};