import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import Goals from "./pages/Goals";
import NotFoundPage from "./pages/NotFoundPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateGoals from "./pages/CreateGoals";
import GoalDetails from "./pages/GoalDetails";
import Sidebar from "./components/Sidebar";

const theme = createTheme({
  palette: {
    secondary: {
      // Purple and green play nicely together.
      main: "#fedb5c",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/creategoal" element={<CreateGoals />} />
          <Route path="/goal" element={<Goals />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/goal/:id" element={<GoalDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
