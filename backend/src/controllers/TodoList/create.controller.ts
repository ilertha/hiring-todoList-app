import { Request, Response } from "express";
import { todoListService } from "../../services"; // Ensure the correct path to the service

export const createTodoListController = async (req: Request, res: Response) => {
  try {
    // Destructure required fields from the request body
    const { title, description, important, completed, duedate, userUuid } = req.body;

    // Call the service to create a new todo list item
    const newTodo = await todoListService.createTodoList({
      title,
      description,
      important,
      completed,
      duedate,
      userUuid, // Passing userUuid to associate with the Todo list
    });

    // Send the response with the newly created todo item
    return res.status(201).json({
      success: true,
      message: "Todo item created successfully",
      todoList: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating todo item",
    });
  }
};
