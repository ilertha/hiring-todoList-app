import React, { useEffect, useState } from 'react';
import { Button, Box, TextField, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Container, MiddleSectionWrapper } from '../components/StyledComponent/todoStyle';
import Header from '../layout/Header';
import TodoTable from '../components/UI/TodoTable';
import { FaPlus } from "react-icons/fa";
import TodoCreateModal from '../components/UI/TodoCreateModal';
import { addTodo, fetchTodos, removeTodo, toggleCompleted, updateTodo } from '../features/todos/todosSlice';
import dayjs from 'dayjs';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  // Retrieve todos from the store
  const todos = useSelector((state) => state.todos.todos);

  // State management hooks
  const [open, setOpen] = useState(false);           // Controls the modal visibility
  const [searchText, setSearchText] = useState("");   // To search todos by title/description
  const [value, setValue] = useState({
    title: "",
    description: "",
    duedate: null,
    completed: false,
  });

  // State for selected todo
  const [selected, setSelected] = useState(null);
  
  // To check if we are editing an existing task
  const [isEditing, setIsEditing] = useState(false);

  // ID of the todo that is being edited
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Snackbar for showing messages
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Opens the Todo Create Modal
  const handleOpen = () => {
    setSelected(null)
    setOpen(true);
  };

  // Closes the modal and resets form values
  const handleClose = () => {
    setOpen(false);
    setEditingTaskId(null);
    setValue({ title: "", description: "", duedate: null, completed: false });
  };

  // Handles search text input, and performs case-insensitive filtering
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  // Filters the todos based on the search query
  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchText) ||
      todo.description.toLowerCase().includes(searchText)
  );

  // Updates the form values as the user types
  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({ ...prev, [name]: inputValue }));
  };

  // Handles date selection and formatting before storing it
  const onChangedate = (duedate) => {
    const formattedDate = duedate ? dayjs(duedate).format("YYYY-MM-DD") : "";
    setSelected(formattedDate); // Tracks the selected date
    setValue((prev) => ({
      ...prev,
      duedate: formattedDate,
    }));
  };

  // Sets form values for editing a todo
  const handleEdit = (id) => {
    const taskToEdit = todos.find((todo) => todo.uuid === id);
    if (taskToEdit) {
      setValue({
        title: taskToEdit.title,
        description: taskToEdit.description,
        duedate: taskToEdit.duedate,
        completed: taskToEdit.completed,
      });
      setSelected(taskToEdit.duedate ? taskToEdit.duedate : null);
      setEditingTaskId(id);
      setIsEditing(true);     // Mark as editing
      setOpen(true);          // Open the modal for editing
    }
  };

  // Deletes a todo and shows success snackbar
  const handleDelete = async (id) => {
    dispatch(removeTodo(id));
    setSnackbar({
      open: true,
      message: "Task is deleted successfully!",
      severity: "success",
    });
  };

  // Handles the form submit, either adding or updating a todo
  const handleSubmit = async () => {
    try {
      if (!value.title.trim() || !value.description.trim() || !value.duedate) {
        setSnackbar({
          open: true,
          message: "All fields are required.",
          severity: "error"
        });
        return;
      }

      // Update an existing task
      if (isEditing) {
        await dispatch(updateTodo({ uuid: editingTaskId, updatedTodo: value }));
        setSnackbar({
          open: true,
          message: "Task is updated successfully!",
          severity: "success",
        });
      } 
      // Create a new task
      else {
        await dispatch(addTodo(value));
        setSnackbar({
          open: true,
          message: "Task is created successfully!",
          severity: "success",
        });
      }
      handleClose();
    } catch (error) {
      console.error("Error in handleSubmit", error);
      setSnackbar({
        open: true,
        message: "An error occurred while saving the task.",
        severity: "error",
      });
    }
  };

  // Toggles the completion status of a todo
  const toggleCompleteStatus = async (uuid, currentStatus) => {
    await dispatch(toggleCompleted({ uuid, completed: !currentStatus }));
    setSnackbar({
      open: true,
      message: `Task has been marked as ${!currentStatus ? "completed" : "uncompleted"}!`,
      severity: "success",
    });
  };

  // Fetches todos when the component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <MiddleSectionWrapper>
        {/* Button to open the modal for creating a new task */}
        <Button
          onClick={handleOpen}
          variant="contained"
          color="success"
          style={{
            backgroundColor: "var(--primary-text-color)",
            color: "var(--background-color)",
            fontWeight: "bold",
            height: "50px",
          }}
        >
          <FaPlus style={{ color: "var(--background-color)" }} />
          &nbsp;New Task
        </Button>

        {/* Search input field */}
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
              input: { color: "var(--primary-text-color)" },
              "& .MuiInputLabel-root": { color: "var(--primary-text-color)" },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: "var(--primary-text-color)",
              },
            }}
          />
        </Box>
      </MiddleSectionWrapper>

      {/* Display todo items in a table */}
      <TodoTable 
        data={filteredTodos} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
        toggleCompleteStatus={toggleCompleteStatus} 
      />

      {/* Modal for creating/updating todo */}
      <TodoCreateModal
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        value={value}
        onChangedate={onChangedate}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        selected={selected}
      />

      {/* Snackbar to display success or error messages */}
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
            background: "#3cc53c",
            color: "white",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
