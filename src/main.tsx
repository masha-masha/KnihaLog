import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import './i18n'; 

const theme = createTheme({
 fontFamily: "Courier New",
 headings: {
  fontFamily: "Courier New",
 },
});

createRoot(document.getElementById("root")!).render(
 <StrictMode>
  <Provider store={store}>
   <MantineProvider theme={theme}>
    <ModalsProvider>
     <App />
    </ModalsProvider>
   </MantineProvider>
  </Provider>
 </StrictMode>,
);
