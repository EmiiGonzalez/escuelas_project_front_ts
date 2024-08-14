import { ThemeProvider } from "@emotion/react";
import { useLocalStorage } from "./util/hooks/useLocalStorage";
import { themeOptions } from "./util/themeOptions";
import { Container } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AlertCustom } from "./components/shared/alerts/AlertCustom";
import { useOpenToast } from "./util/hooks/useOpenToast";
import { Inicio } from "./pages/inicio/Inicio";
import { BoxTheme } from "./components/shared/boxTheme/BoxTheme";

function App() {
  const [tema, setTema] = useLocalStorage<"light" | "dark">("tema", "dark");
  const temaOptions = themeOptions(tema);
  const url =
  import.meta.env.VITE_BASE_VERSION_API;
  const { variante, msg, handleOpenToast, openToast, setOpenToast } =
    useOpenToast();
  return (
    <ThemeProvider theme={temaOptions}>
      <Container
        sx={{
          border: "1px solid black",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "background.default",
        }}
        maxWidth="xl"
      >
        <Router>
          <Routes>
            <Route path="/" element={<Inicio url={url} tema={tema} handleOpenToast={handleOpenToast} />} />
          </Routes>
        </Router>
        <BoxTheme tema={tema} setTema={setTema} />
      </Container>
      <AlertCustom
        tema={tema}
        openToast={openToast}
        variante={variante}
        msg={msg}
        setOpenToast={setOpenToast}
        key={msg}
      ></AlertCustom>
    </ThemeProvider>
  );
}

export default App;
