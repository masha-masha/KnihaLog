import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  fontFamily: 'Courier New', 
  headings: {
    fontFamily: 'Inter, sans-serif',
  },
});


createRoot(document.getElementById("root")!).render(
 <StrictMode>
  <MantineProvider theme={theme}>
   <App />
  </MantineProvider>
 </StrictMode>,
);
