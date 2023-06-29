import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { GoalData, useUpdateGoalMutation } from "../api/goalApi";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

interface EditModalProps {
  goal: GoalData | undefined;
  open: boolean;

  onClose: () => void;
  onEditSave: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  goal,
  open,
  onClose,
  //onEditSave,
}) => {
  //React hook form for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //To set today's date as current date
  const currentDate = new Date().toISOString().split("T")[0];
  console.log("currentDate ", currentDate);

  const [editGoalData, setEditGoalData] = useState<GoalData | undefined>(goal);

  const [updateGoal] = useUpdateGoalMutation();

  // Handle form submission
  const handleEditSave = () => {
    //event.preventDefault();
    console.log("Editted goal from modal", editGoalData);
    if (editGoalData) {
      updateGoal(editGoalData);
    }

    window.location.reload();
    onClose();
    //onEditSave(editGoalData);
  };

  useEffect(() => {
    if (open && goal) {
      setEditGoalData(goal);
    }
  }, [open, goal]);
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
          Edit Form
        </Typography>
        {editGoalData && (
          <form onSubmit={handleSubmit(handleEditSave)}>
            <TextField
              id="standard-basic"
              variant="standard"
              label="Goal Name"
              value={editGoalData?.goalName}
              {...register("goalName", { required: true })}
              error={!!errors.goalName}
              helperText={errors.goalName && "Goal Name is required"}
              fullWidth
              onChange={(e) =>
                setEditGoalData({ ...editGoalData, goalName: e.target.value })
              }
            />
            <TextField
              label="Description"
              variant="standard"
              name="description"
              value={editGoalData?.description}
              onChange={(e) =>
                setEditGoalData({
                  ...editGoalData,
                  description: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              label="Target Date"
              variant="standard"
              type="date"
              name="targetDate"
              value={
                editGoalData?.targetDate
                  ? editGoalData.targetDate.substring(0, 10)
                  : ""
              }
              onChange={(e) =>
                setEditGoalData({ ...editGoalData, targetDate: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Target Value"
              variant="standard"
              name="targetAmount"
              value={editGoalData?.targetAmount}
              onChange={(e) =>
                setEditGoalData({
                  ...editGoalData,
                  targetAmount: Number(e.target.value),
                })
              }
              fullWidth
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </form>
        )}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button variant="outlined" onClick={handleEditSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box> */}
      </Box>
    </Modal>
  );
};

export default EditModal;
