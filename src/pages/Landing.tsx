import { Button, Container, Typography } from "@mui/material";

export default function Landing() {
  return (
    <>
      <div>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ display: "inline" }}>
            Financial Goal Planner
          </Typography>
          <Typography variant="h5">
            Plan, track, and achieve your financial goals with ease.
          </Typography>

          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            Let's get Started
            <Button
              variant="contained"
              color="warning"
              size="large"
              onClick={() =>
                window.location.replace("http://localhost:5000/signin")
              }
            >
              Login with Google
            </Button>
          </Typography>
        </Container>
      </div>

      <Button></Button>
    </>
  );
}
