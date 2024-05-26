import Header from "./Components/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#A94E76",
  //   },
  //   secondary: {
  //     main: "#D88284",
  //   },
  // },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
