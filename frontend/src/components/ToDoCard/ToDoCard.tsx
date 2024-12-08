import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import styled from "styled-components";
import { FaEdit, FaTrash, FaRegCalendarAlt } from "react-icons/fa";
import todoCardImg1 from "../../assets/card1.png";
import todoCardImg2 from "../../assets/card2.png";
import { AlignItems, SpaceBetween } from "../StyledComponent/user";
import importantImg from "../../assets/important.png";

const CardContainer = styled(Tilt)`
  max-width: 300px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 20px 20px 20px 10px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
`;

const EditIcon = styled(FaEdit)`
  color: #f4aef4;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #d385d3; /* Darker color on hover */
  }
`;

const TrashIcon = styled(FaTrash)`
  color: lightblue;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #4c8bf5; /* Darker blue on hover */
  }
`;

const DemoLinkWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DemoLink = styled.button`
  background-color: var(--tab-bar-color);
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border: none;
`;

const CompleteButton = styled.button`
  background: transparent;
  color: var(--completed-button-color);
  text-decoration: none;
  cursor: pointer;
  border: none;
  &:hover {
    color: var(--completed-button-hover-color);
  }
`;

const ToDoCard = ({
  title,
  important,
  uuid,
  duedate,
  description,
  index,
  handleEdit,
  handleRemove,
  completed,
  handleCompleted,
}: any) => {
  const [openReadMore, setOpenReadMore] = React.useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);

  const handleClickReadMore = () => {
    setOpenReadMore(true);
  };

  const handleClickDeleteButton = () => {
    setOpenDeleteConfirm(true);
  };

  const handleReadMoreClose = () => {
    setOpenReadMore(false);
  };

  const handleDeleteConfirmClose = () => {
    setOpenDeleteConfirm(false);
  };

  const handleComplete = async (uuid: string) => {
    await handleCompleted(uuid, true);
  };

  return (
    <CardContainer>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100 },
          show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", delay: index * 0.5, duration: 1 },
          },
        }}
      >
        <Image src={important ? todoCardImg1 : todoCardImg2} alt={title} />
        <SpaceBetween>
          {completed ? (
            <div></div>
          ) : (
            <CompleteButton
              name="completed"
              onClick={() => handleComplete(uuid)}
            >
              Complete
            </CompleteButton>
          )}
          <AlignItems>
            <EditIcon onClick={() => handleEdit(uuid)} />
            <TrashIcon onClick={handleClickDeleteButton} />
          </AlignItems>
        </SpaceBetween>
        <AlignItems style={{ marginTop: "12px" }}>
          <FaRegCalendarAlt style={{ color: "var(--text-color)" }} />
          <p style={{ fontSize: "12px", color: "var(--text-color)" }}>
            {duedate}
          </p>
        </AlignItems>
        <div style={{ height: "80px", width: "100%" }}>
          <h1
            style={{
              color: "var(--text-color)",
              fontWeight: "bold",
              fontSize: "24px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </h1>
          <h1
            style={{
              marginTop: "8px",
              color: "var(--text-color)",
              fontWeight: "600",
              fontSize: "14px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {description}
          </h1>
        </div>
        <DemoLinkWrapper>
          <DemoLink onClick={handleClickReadMore}>Read More</DemoLink>
        </DemoLinkWrapper>
      </motion.div>

      <Dialog
        open={openReadMore}
        onClose={handleReadMoreClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "var(--background-color)",
            padding: "20px",
            width: "500px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "var(--text-color)",
              width: "80%",
              overflow: "hidden",
            }}
          >
            {title}
          </div>
          {important && (
            <img
              src={importantImg}
              alt="important"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "var(--text-color)" }}
          >
            Due Date: &nbsp;
            <i>{duedate}</i>
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              color: "var(--text-color)",
              marginTop: "10px",
              width: "100%",
              height: "200px", // Set the height to limit the visible area
              paddingRight: "10px", // Optional: Adds padding to prevent scrollbar overlap
            }}
          >
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleReadMoreClose}
            style={{
              color: "var(--text-color)",
              border: "1px solid var(--modal-button-border-color)",
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteConfirm}
        onClose={handleDeleteConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "var(--background-color)",
            padding: "20px",
          },
        }}
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "var(--text-color)" }}
          >
            Once you delete this task, it can never be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteConfirmClose}
            style={{
              color: "var(--text-color)",
              border: "1px solid var(--modal-button-border-color)",
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => handleRemove(uuid)}
            style={{
              color: "var(--text-color)",
              border: "1px solid var(--modal-button-border-color)",
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </CardContainer>
  );
};

export default ToDoCard;
