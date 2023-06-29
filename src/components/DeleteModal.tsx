import { Modal, Box, Typography, Button } from "@mui/material";
import { GoalData, useDeleteGoalMutation } from "../api/goalApi";

interface DeleteModalProps {
  goal: GoalData | undefined;
  open: boolean;
  onClose: () => void;
  onDeleteConfirmed: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  goal,
  open,
  onClose,
  onDeleteConfirmed,
}) => {
  //Delete goal
  const [deleteGoal] = useDeleteGoalMutation();

  const handleDeleteGoal = async () => {
    console.log("From delete modal", goal);
    const goalId = goal?.goalId;
    if (goalId != undefined) {
      try {
        await deleteGoal(goalId);
        console.log("Goal ", goalId, " deleted successfully");
      } catch (error) {
        console.error("Failed to Delete Goal:", error);
      }
    }
    onDeleteConfirmed();
    onClose();
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 2,
          width: 300,
          bgcolor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Are you sure you want to delete the goal : {goal?.goalName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button variant="outlined" onClick={handleDeleteGoal}>
            Yes
          </Button>
          <Button variant="outlined" onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
