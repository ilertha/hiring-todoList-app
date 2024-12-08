import React, { useEffect, useState } from "react";
import { Button, Box, TextField, Snackbar, Alert } from "@mui/material";
import {
  MiddleSectionWrapper,
  ToDoBody,
} from "../../components/StyledComponent/home";
import dayjs, { Dayjs } from "dayjs";
import { FaPlus } from "react-icons/fa";
import { Task } from "../../type/type";
import CreateModal from "../../components/Modal/CreateModal";
import CardTabs from "../../components/CardTabs/CardTabs";
import {
  createTodoList,
  deleteTodoList,
  getTodoList,
  updateTodoList,
} from "../../redux/TodoList/todoActions";
import { useAppDispatch, useAppSelector } from "../../redux/hook/hooks";

const ToDo: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos); // Adjust according to the Redux state structure

  const [value, setValue] = useState<Task>({
    title: "",
    description: "",
    duedate: "",
    completed: false,
    important: false,
    userUuid: JSON.parse(sessionStorage.getItem("userId") || '""'),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string>("");
  const [selected, setSelected] = useState<Dayjs | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditingTaskId("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value: inputValue, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : inputValue;
    setValue((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const onChangedate = (duedate: Dayjs | null) => {
    setSelected(duedate);
    setValue((prev) => ({
      ...prev,
      duedate: duedate ? duedate.format("YYYY-MM-DD") : "",
    }));
  };

  const handleEdit = (uuid: string) => {
    const taskToEdit = todos.find((task) => task.uuid === uuid);
    if (taskToEdit) {
      const updatedTask = {
        ...taskToEdit,
        duedate: taskToEdit.duedate ? dayjs(taskToEdit.duedate) : null,
      };
      setValue(updatedTask);
      setSelected(updatedTask.duedate);
      setEditingTaskId(uuid);
      setIsEditing(true);
      handleOpen();
    }
  };

  const handleSubmit = async () => {
    try {
      if (!value.title.trim() || !value.description.trim() || !value.duedate) {
        setSnackbar({
          open: true,
          message: "All fields are required",
          severity: "error",
        });
        return;
      }

      if (isEditing) {
        await dispatch(updateTodoList(editingTaskId, value));
        setSnackbar({
          open: true,
          message: "Task is updated successfully!",
          severity: "success",
        });
      } else {
        await dispatch(createTodoList(value));
        setSnackbar({
          open: true,
          message: "Task is created successfully!",
          severity: "success",
        });
      }

      dispatch(getTodoList());
      handleClose();
      setValue({
        title: "",
        description: "",
        duedate: "",
        completed: false,
        important: false,
        userUuid: JSON.parse(sessionStorage.getItem("userId") || '""'),
      });
      setSelected(null);
    } catch (error) {
      console.error("Error in handleSubmit", error);
      setSnackbar({
        open: true,
        message: "An error occurred while saving the task.",
        severity: "error",
      });
    }
  };

  const handleDelete = async (uuid: string) => {
    try {
      await dispatch(deleteTodoList(uuid));
      dispatch(getTodoList());
      setSnackbar({
        open: true,
        message: "Task is removed successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error in handleDelete", error);
      setSnackbar({
        open: true,
        message: "An error occurred while deleting the task.",
        severity: "error",
      });
    }
  };

  const handleToggleComplete = async (uuid: string, completed: boolean) => {
    try {
      await dispatch(updateTodoList(uuid, { completed }));
      dispatch(getTodoList());
      setSnackbar({
        open: true,
        message: "Task is completed successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error in handleToggleComplete", error);
      setSnackbar({
        open: true,
        message: "An error occurred while completing the task.",
        severity: "error",
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = Array.isArray(todos)
    ? todos.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <ToDoBody>
        <MiddleSectionWrapper>
          <Button
            onClick={handleOpen}
            variant="contained"
            color="success"
            style={{
              backgroundColor: "var(--tab-bar-color)",
              color: "white",
              fontWeight: "bold",
              height: "56px",
            }}
          >
            <FaPlus style={{ color: "white" }} />
            &nbsp;New Task
          </Button>
          <Box
            sx={{
              width: 450,
              maxWidth: "100%",
              "@media(max-width: 624px)": { width: "100%" },
              marginTop: "10px",
            }}
          >
            <TextField
              fullWidth
              label="Search Here!"
              id="search"
              onChange={handleSearch}
              sx={{
                backgroundColor: "transparent",
                borderRadius: "8px",
                input: { color: "var(--text-color)" },
                "& .MuiInputLabel-root": { color: "var(--text-color)" },
                "& .MuiOutlinedInput-root fieldset": {
                  borderColor: "var(--text-color)",
                },
              }}
            />
          </Box>
        </MiddleSectionWrapper>
        <CardTabs
          todos={filteredTodos}
          handleEdit={handleEdit}
          handleRemove={handleDelete}
          handleCompleted={handleToggleComplete}
        />
      </ToDoBody>
      <CreateModal
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        value={value}
        onChangedate={onChangedate}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        selected={selected}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            background: "var(--tab-bar-color)",
            color: "white",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToDo;
