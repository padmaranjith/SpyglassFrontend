import { GoalData, useGetAllGoalsByUserIdQuery } from "../api/goalApi";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Typography,
  Slider,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Goals() {
  const { data: goals } = useGetAllGoalsByUserIdQuery();

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
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
