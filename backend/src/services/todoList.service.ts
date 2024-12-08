import { AppDataSouce } from "../db";  // Import the data source
import { TodoListEntity, UserEntity } from "../entities";  // Import entities
import { TodoListType } from "../types";  // Import your types

export const createTodoList = async (data: TodoListType) => {
  const { title, description, completed = false, important = false, duedate, userUuid } = data;

  console.log("userUuid:",userUuid)
  const userRepository = AppDataSouce.getRepository(UserEntity);
  const todoListRepository = AppDataSouce.getRepository(TodoListEntity);

  const user = await userRepository.findOne({ where: { uuid: userUuid } });

  if (!user) {
    throw new Error("User not found");
  }

  const todoList = todoListRepository.create({
    title,
    description,
    completed,
    important,
    duedate,
    user,
  });

  await todoListRepository.save(todoList);

  return todoList;
};


// Function to get Todo lists, optionally with filters
export const getTodoList = async (data: Partial<TodoListEntity>) => {
  const todoListRepository = AppDataSouce.getRepository(TodoListEntity);

  // Find TodoList entities with the specified criteria
  const findTodoList = await todoListRepository.find({
    where: { ...data },
    relations: ["user"], // Fetch the related UserEntity as well
  });

  if (!findTodoList.length) return null;
  
  return findTodoList;
};

// Function to update a Todo list
export const updateTodoList = async (
  id: string,
  data: Partial<TodoListEntity>
) => {
  const todoListRepository = AppDataSouce.getRepository(TodoListEntity);

  // Find the Todo list by its UUID
  const todoList = await todoListRepository.findOne({ where: { uuid: id } });

  if (!todoList) {
    throw new Error("Todo item not found");
  }

  // Merge the data (update fields) with the existing TodoList entity
  Object.assign(todoList, data);

  // Save the updated Todo list
  await todoListRepository.save(todoList);

  return todoList;
};

// Function to delete a Todo list
export const deleteTodoList = async (id: string) => {
  const todoListRepository = AppDataSouce.getRepository(TodoListEntity);

  // Find the Todo list by its UUID
  const todoList = await todoListRepository.findOne({ where: { uuid: id } });

  if (!todoList) {
    throw new Error("Todo item not found");
  }

  // Remove the Todo list from the repository
  await todoListRepository.remove(todoList);

  return { message: "Todo item successfully deleted" };
};
