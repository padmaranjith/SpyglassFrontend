import { BrowserRouter,Routes,Route } from "react-router-dom"
import Landing from "./pages/Landing"
import NavBar from "./components/NavBar"
import Goals from "./pages/Goals"
import NotFoundPage from "./pages/NotFoundPage"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      // Purple and green play nicely together.
      main: '#fedb5c',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/userinfo' element={<Goals/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
