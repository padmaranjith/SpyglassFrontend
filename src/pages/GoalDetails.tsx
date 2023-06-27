import { useParams } from "react-router-dom";
import { useGetGoalByIdQuery } from "../api/goalApi";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Box,
  Typography,
  Slider,
} from "@mui/material";
export default function GoalDetails() {
  const { id } = useParams();
  const { data: goal } = useGetGoalByIdQuery(Number(id || ""));

  // Handle withdraw and deposit actions

  const handleWithdraw = () => {
    // Implement the withdraw logic
  };

  const handleDeposit = () => {
    // Implement the deposit logic
  };

  const targetAmount = Number(goal?.targetAmount) ?? 0;
  console.log(targetAmount);

  const perDay = (targetAmount / 365).toFixed(2);
  const perMonth = (targetAmount / 12).toFixed(2);
  const perYear = targetAmount.toFixed(2);
  //   const perDay = (987 / 365).toFixed(2);
  //   const perMonth = (987 / 12).toFixed(2);
  //   const perYear = 987;

  return (
    <>
      <Box
        display="flex"
        justifyContent="inherit"
        alignItems="center"
        height="100vh"
      >
        <Box width={400}>
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
              )}
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={handleWithdraw}>
                  Withdraw
                </Button>
                <Button variant="contained" onClick={handleDeposit}>
                  Deposit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box width={400}>
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
