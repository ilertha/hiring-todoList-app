import { useState } from "react";
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField, TextareaAutosize } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

// Modal style configuration
const style = {
  position: "absolute", 
  top: "50%", 
  left: "50%", 
  transform: "translate(-50%, -50%)", 
  bgcolor: "var(--background-color)", 
  borderRadius: "5px", 
  boxShadow: 24, 
  p: 4, 
  width: "600px", 
  "@media (max-width: 678px)": {
    width: "350px",  // For smaller screens, modal width reduces
  },
};

// The TodoCreateModal functional component for creating or editing a task
const TodoCreateModal = (props) => {
  const { open, handleClose, handleChange, value, onChangedate, handleSubmit, isEditing, selected } = props;

  // State to track validation errors for each field
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    duedate: "",
  });

  // For handling selected date, defaulting to null if no date is selected
  const validSelectedDate = selected ? dayjs(selected) : null;

  // Validate form inputs when attempting to submit
  const validate = () => {
    let valid = true;
    const newErrors = {
      title: value.title.trim() === "" ? "Task Title is required" : "",
      description: value.description.trim() === "" ? "Description is required" : "",
      duedate: !value.duedate ? "Due date is required" : "",
    };

    // Check if any field is invalid
    if (newErrors.title || newErrors.description || newErrors.duedate) {
      valid = false;
    }

    setErrors(newErrors);  // Update the errors state
    return valid;
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}   // Modal visibility is controlled via open prop
      onClose={handleClose}   // Close modal on backdrop click
      closeAfterTransition  // Smooth fade transition after close
      slots={{ backdrop: Backdrop }}  // Custom backdrop component
      slotProps={{
        backdrop: {
          timeout: 500,  // Fade duration
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {/* Modal Title */}
          <Typography variant="h5" style={{ fontWeight: "bold", color: "var(--primary-text-color)" }}>
            New Task
          </Typography>

          {/* Task Title Field */}
          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--primary-text-color)", marginTop: "10px" }}>
            Task Title
          </Typography>
          <TextField
            fullWidth
            name="title"
            onChange={handleChange}  // Update the state when user changes input
            value={value.title}  // Controlled input value
            label="Task Title..."
            error={!!errors.title}  // Highlight field with error if validation fails
            helperText={errors.title}  // Display error message below input field
            sx={{
              backgroundColor: "transparent",
              borderRadius: "8px",
              marginTop: "10px",
              input: {
                color: "var(--primary-text-color)",  // Input text color
              },
              "& .MuiInputLabel-root": {
                color: "var(--primary-text-color)",  // Input label color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--primary-text-color)",  // Border color
                },
                "&:hover fieldset": {
                  borderColor: "var(--primary-text-color)",  // Border color on hover
                },
              },
            }}
          />
          
          {/* Task Description Field */}
          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--primary-text-color)", marginTop: "10px" }}>
            Enter Description
          </Typography>
          <TextareaAutosize
            name="description"
            onChange={handleChange}  // Update state on description change
            value={value.description}  // Controlled input for description
            placeholder="Description..."
            style={{
              backgroundColor: "transparent",
              width: "100%",
              maxWidth: "575px",
              minWidth: "300px",
              height: "200px",
              marginTop: "20px",
              padding: "10px",
              color: "var(--primary-text-color)",  // Text color
              borderColor: "var(--primary-text-color)",  // Border color
            }}
          />
          {/* Display description error if validation fails */}
          {errors.description && (
            <Typography variant="body2" color="error" style={{ marginTop: "5px" }}>
              {errors.description}
            </Typography>
          )}

          {/* Due Date Field */}
          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--primary-text-color)", marginTop: "10px" }}>
            Due Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Please enter the date!"  // Date picker label
                name="duedate"
                value={validSelectedDate}  // The current selected due date
                onChange={onChangedate}  // Handle the date change
                sx={{
                  width: "100%",
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  input: {
                    color: "var(--primary-text-color)",  // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--primary-text-color)",  // Label color
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--primary-text-color)",  // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--primary-text-color)",  // Border color on hover
                    },
                  },
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: "var(--primary-text-color)",  // Customize icon color
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {/* Display due date error if validation fails */}
          {errors.duedate && (
            <Typography variant="body2" color="error" style={{ marginTop: "5px" }}>
              {errors.duedate}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            onClick={() => {
              if (validate()) {  // Validate the form inputs before submitting
                handleSubmit();
              }
            }}
            variant="contained"
            color="success"
            style={{
              backgroundColor: "var(--primary-text-color)",  // Button color
              color: "var(--background-color)",  // Button text color
              fontWeight: "bold",
              marginTop: "20px",  // Button top margin
            }}
          >
            {isEditing ? "Save" : "Create"}  {/* Dynamically set the button text depending on editing state */}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TodoCreateModal;
