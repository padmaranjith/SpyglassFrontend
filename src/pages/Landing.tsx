import { Button, Container, Typography, styled, Box } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
//import homeImg from "../images/Homepageimg.jpg";
import NavBar from "../components/NavBar";

export default function Landing() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));
  return (
    <>
      <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
        <Container>
          <NavBar />
          <CustomBox>
            <Box sx={{ flex: "1" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  color: "#687690",
                  fontWeight: "500",
                  mt: 10,
                  mb: 4,
                }}
              >
                Welcome to Spyglass
              </Typography>
              <Title variant="h1">
                Plan, track and achieve your financial goals with ease.
              </Title>

              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                Let's get Started
                <Button
                  sx={{ marginLeft: 5, backgroundColor: "#0F1B4C" }}
                  variant="contained"
                  size="large"
                  startIcon={<FcGoogle />}
                  onClick={() => window.location.replace(apiUrl + "signin")}
                >
                  <span style={{ marginRight: "0.5em" }} /> Login with Google
                </Button>
              </Typography>
            </Box>

            <Box sx={{ flex: "1.25" }}>
              <img
                src="https://sg-project3img-bucket.s3.amazonaws.com/Homepageimg.jpg"
                alt="HomePageImg"
                style={{
                  marginTop: "5rem",
                  maxWidth: "100%",
                  marginBottom: "2rem",
                }}
              />
            </Box>
          </CustomBox>
        </Container>
      </Box>
    </>
  );
}
