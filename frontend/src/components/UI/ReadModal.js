import { Backdrop, Box, Modal, Fade, Typography } from "@mui/material";

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
const ReadModal = (props) => {
  const { open, handleClose, selectedRow } = props;

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
          <Typography variant="h3" style={{ fontWeight: "bold", color: "var(--primary-text-color)" }}>
            To do!
          </Typography>

          {/* Task Title Field */}
          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--primary-text-color)", marginTop: "10px" }}>
            Task Title
          </Typography>
          
          <Typography
            variant="h6"
            style={{
              color: "var(--primary-text-color)",
              marginTop: "10px",
              width: "100%",
              maxWidth: "600px",
              wordWrap: "break-word",  // Ensure long words break and don't overflow
              overflowWrap: "break-word",  // Another property for overflow behavior
              whiteSpace: "normal",  // Ensure text wraps inside the container
              maxHeight: "50px",  // Set the max height to 100px
              overflowY: "auto",  // Add vertical scroll if content overflows
              fontSize: "16px"
            }}
          >
            {selectedRow?.title}
          </Typography>
          {/* Task Description Field */}
          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--primary-text-color)", marginTop: "10px" }}>
            Enter Description
          </Typography>
          <Typography
            variant="h6"
            style={{
              color: "var(--primary-text-color)",
              marginTop: "10px",
              width: "100%",
              maxWidth: "600px",
              wordWrap: "break-word",  // Ensure long words break and don't overflow
              overflowWrap: "break-word",  // Another property for overflow behavior
              whiteSpace: "normal",  // Ensure text wraps inside the container
              maxHeight: "200px",  // Set the max height to 100px
              overflowY: "auto",  // Add vertical scroll if content overflows
              fontSize: "16px"
            }}
          >
            {selectedRow?.description}
          </Typography>

          {/* Due Date Field */}
          <Typography variant="h6" style={{ fontWeight: "bold", color: "var(--primary-text-color)", marginTop: "10px" }}>
            Due Date
          </Typography>
          <Typography variant="h6" style={{ color: "var(--primary-text-color)", marginTop: "10px" }}>
            {selectedRow?.duedate}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ReadModal;
