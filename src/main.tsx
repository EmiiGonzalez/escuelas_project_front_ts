import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <CssBaseline>
      <App />
    </CssBaseline>
    </QueryClientProvider>
  </React.StrictMode>
);
