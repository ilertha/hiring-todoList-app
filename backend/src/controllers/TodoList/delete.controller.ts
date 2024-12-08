import { Request, Response } from "express";
import { todoListService } from "../../services";
export const deleteTodoListController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await todoListService.deleteTodoList(id);

    return res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting todo item",
    });
  }
};
