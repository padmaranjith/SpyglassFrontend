import { useParams } from "react-router-dom";
import { useGetGoalByIdQuery, useUpdateAmountMutation } from "../api/goalApi";
import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Typography,
  Slider,
} from "@mui/material";
import TransactionModal from "../components/TransactionModal";

export default function GoalDetails() {
  const { id } = useParams();
  const { data: goal } = useGetGoalByIdQuery(Number(id || ""));

  // Handle withdraw and deposit actions

  // const calculatePerValues = (goal?.targetDate, goal?.targetAmount) => {
  //   const currentDate = new Date();
  //   const remainingDays = Math.ceil((goal?.targetDate - currentDate) / (1000 * 60 * 60 * 24));
  //   const perDay = goal?.targetAmount / remainingDays;
  //   const perMonth = perDay * 30; // Assuming 30 days in a month
  //   const perYear = perDay * 365; // Assuming 365 days in a year

  //   return {
  //     perDay,
  //     perMonth,
  //     perYear,
  //   };
  // };

  const targetAmount = Number(goal?.targetAmount) ?? 0;
  const savedamount = Number(goal?.savedamount) ?? 0;
  console.log(targetAmount);
  console.log("Goal Id :", id);
  const perDay = ((targetAmount - savedamount) / 365).toFixed(2);
  const perMonth = ((targetAmount - savedamount) / 12).toFixed(2);
  const perYear = (targetAmount - savedamount).toFixed(2);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDepositClick = () => {
    setIsModalOpen(true);
  };

  const [updateSavedAmount] = useUpdateAmountMutation();
  const updateGoal = async (goalId: number, savedamount: number) => {
    try {
      console.log("goalId, savedamount", goalId, savedamount);
      await updateSavedAmount({ goalId, savedamount });
      console.log("Goal updated successfully");
      // Perform any necessary UI updates
      window.location.reload();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <>
      <Box display={"flex"} marginLeft={35} marginTop={5} width={475}>
        <Card>
          {goal && (
            <CardMedia
              component="img"
              image={goal.goalImageUrl}
              alt={goal.goalName}
            />
          )}
          <CardContent>
            <Typography variant="h6">{goal?.goalName}</Typography>
            <Typography variant="body2">
              Target Date:{" "}
              {new Date(goal ? goal.targetDate : "").toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </Typography>
            {goal && (
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
                    backgroundColor: "#89a9d8",
                  },
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#89a9d8",
                  },
                  "& .MuiSlider-valueLabel": {
                    backgroundColor: "#89a9d8",
                    color: "#fff",
                  },
                }}
              />
            )}
            <Box display="flex" justifyContent="space-between">
              {/* <Button variant="contained" onClick={handleWithdraw}>
                Withdraw
              </Button> */}
              <Button variant="contained" onClick={handleDepositClick}>
                Deposit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* Transaction Modal */}
      {/* <TransactionModal
        open={openModal}
        onClose={handleCloseModal}
        onDeposit={handleDeposit}
      /> */}
      {id && (
        <TransactionModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(value: any) => updateGoal(Number(id), value)}
        />
      )}

      <Box width={475} marginLeft={35} marginTop={2}>
        <Card>
          <CardContent>
            To achieve the goal by the target date you should save
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2"> ${perDay}</Typography>
              <Typography variant="body2"> ${perMonth}</Typography>
              <Typography variant="body2">${perYear}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption"> perDay</Typography>
              <Typography variant="caption"> perMonth</Typography>
              <Typography variant="caption">perYear</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
