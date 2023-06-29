import { GoalData, useGetAllGoalsByUserIdQuery } from "../api/goalApi";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Typography,
  Slider,
  CardActions,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaEdit as Edit } from "react-icons/fa";
import { AiTwotoneDelete as Delete } from "react-icons/ai";

import DeleteModal from "../components/DeleteModal";
import { useState } from "react";
import EditModal from "../components/EditModal";

export default function Goals() {
  const { data: goals } = useGetAllGoalsByUserIdQuery();

  //Edit and Delete dialog
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  //set goal data to edit and delete
  const [editGoal, setEditGoal] = useState<GoalData>();
  const [deleteGoal, setDeleteGoal] = useState<GoalData | undefined>();

  const handleEditClick = (goal: GoalData) => {
    setEditGoal(goal);
    setEditModalOpen(true);
    console.log("From edit goal goals page:", goal);

    console.log("editGoal from goals page:", editGoal);
  };

  const handleDeleteClick = (goal: GoalData) => {
    setDeleteGoal(goal);
    setDeleteModalOpen(true);
    console.log("From delete goal:", goal);

    console.log("delet:", deleteGoal);
  };

  const handleEditModalSave = () => {
    console.log("edit save clicked");
  };

  const handleDeleteModalConfirm = () => {
    console.log("Delete save clicked");
  };

  return (
    <>
      <Box marginTop={8}>
        <Typography variant="h4" align="center" gutterBottom>
          My Goals
        </Typography>
        <Box>
          <Typography variant="subtitle1" align="center">
            Welcome to the goals page! Here you can find a list of your goals.
          </Typography>
          <Typography variant="subtitle1" align="center">
            Take a look at your progress and target dates below.
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box width={400} border={1} borderColor="primary.main" p={2} mt={2}>
          <Grid container spacing={2}>
            {goals?.map((goal: GoalData) => (
              <Grid item xs={6} key={goal.goalId}>
                <Card>
                  <CardMedia
                    component="img"
                    image={goal.goalImageUrl}
                    alt={goal.goalName}
                  />
                  <CardContent>
                    <Link to={`/goal/${goal.goalId}`}>
                      <Typography variant="h6">{goal.goalName}</Typography>
                    </Link>
                    <Typography variant="body2">
                      at{" "}
                      {new Date(goal.targetDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </Typography>

                    <Slider
                      value={[goal.savedamount, goal.targetAmount]}
                      min={0}
                      max={goal.targetAmount}
                      step={1}
                      disabled
                      marks={[
                        {
                          value: goal.savedamount,
                          label: `${goal.savedamount}`,
                        },
                        {
                          value: goal.targetAmount,
                          label: `${goal.targetAmount}`,
                        },
                      ]}
                      sx={{
                        "& .MuiSlider-rail": {
                          backgroundColor: "blue",
                        },
                        "& .MuiSlider-thumb": {
                          backgroundColor: "blue",
                        },
                        "& .MuiSlider-valueLabel": {
                          backgroundColor: "blue",
                          color: "#fff",
                        },
                      }}
                    />
                  </CardContent>
                  <CardActions>
                    <Box display="flex" justifyContent="space-between">
                      <IconButton onClick={() => handleEditClick(goal)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(goal)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      {/* Edit Modal */}
      <EditModal
        goal={editGoal}
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onEditSave={handleEditModalSave}
      />

      {/* Delete Modal */}
      <DeleteModal
        goal={deleteGoal}
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDeleteConfirmed={handleDeleteModalConfirm}
      />
    </>
  );
}
