import {useState} from "react";
import { Checkbox, Button, Backdrop, Box, Modal, Fade, Typography, TextField, TextareaAutosize } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { ModalPropsInfo } from "../../type/type";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--background-color)",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  width: "600px",
  "@media (max-width: 678px)": {
    width: "350px",
  },
};

interface Errors {
  title: string;
  description: string;
  duedate: string;
}

const CreateModal = (props: ModalPropsInfo) => {
  const { open, handleClose, handleChange, value, onChangedate, handleSubmit, isEditing, selected } = props;

  // Track errors for validation
  const [errors, setErrors] = useState<Errors>({
    title: "",
    description: "",
    duedate: "",
  });

  // Handle validation when the user attempts to submit
  const validate = () => {
    let valid = true;
    const newErrors = {
      title: value.title.trim() === "" ? "Task Title is required" : "",
      description: value.description.trim() === "" ? "Description is required" : "",
      duedate: !value.duedate ? "Due date is required" : "",
    };

    if (newErrors.title || newErrors.description || newErrors.duedate) {
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h5" style={{ fontWeight: "bold", color: "var(--text-color)" }}>
            New Task
          </Typography>

          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--text-color)", marginTop: "10px" }}>
            Task Title
          </Typography>
          <TextField
            fullWidth
            name="title"
            onChange={handleChange}
            value={value.title}
            label="Task Title..."
            error={!!errors.title} // Show error styling if title is invalid
            helperText={errors.title} // Show error message
            sx={{
              backgroundColor: "transparent",
              borderRadius: "8px",
              marginTop: "10px",
              input: {
                color: "var(--text-color)",
              },
              "& .MuiInputLabel-root": {
                color: "var(--text-color)",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--text-color)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--text-color)",
                },
              },
            }}
          />
          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--text-color)", marginTop: "10px" }}>
            Enter Description
          </Typography>
          <TextareaAutosize
            name="description"
            onChange={handleChange}
            value={value.description}
            placeholder="Description..."
            style={{
              backgroundColor: "transparent",
              width: "100%",
              maxWidth: "538px",
              minWidth: "300px",
              height: "200px",
              marginTop: "20px",
              padding: "10px",
              color: "var(--text-color)",
              borderColor: "var(--text-color)",
            }}
          />
          {errors.description && (
            <Typography variant="body2" color="error" style={{ marginTop: "5px" }}>
              {errors.description}
            </Typography>
          )}

          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--text-color)", marginTop: "10px" }}>
            Due Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Please enter the date!"
                name="duedate"
                value={selected}
                onChange={onChangedate}
                sx={{
                  width: "100%",
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  input: {
                    color: "var(--text-color)",
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--text-color)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--text-color)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--text-color)",
                    },
                  },
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: "var(--text-color)",  // Customize the icon color here
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors.duedate && (
            <Typography variant="body2" color="error" style={{ marginTop: "5px" }}>
              {errors.duedate}
            </Typography>
          )}

          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--text-color)", marginTop: "10px" }}>
            Important
            <Checkbox
              checked={value.important}
              onChange={handleChange}
              name="important"
              style={{ color: "var(--text-color)" }}
            />
          </Typography>

          <Button
            onClick={() => {
              if (validate()) {
                handleSubmit();
              }
            }}
            variant="contained"
            color="success"
            style={{
              backgroundColor: "var(--new-task-background)",
              color: "var(--text-color)",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            {isEditing ? "Save" : "Create"}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateModal;
