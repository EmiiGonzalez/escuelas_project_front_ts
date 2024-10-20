import { ThemeProvider } from "@emotion/react";
import { themeOptions } from "./util/themeOptions";
import { Container } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AlertCustom } from "./components/shared/alerts/AlertCustom";
import { useOpenToast } from "./util/hooks/useOpenToast";
import { Inicio } from "./pages/inicio/Inicio";
import { Escuela } from "./pages/escuela/Escuela";
import { useThemeStore } from "./util/context/useThemeStore";
import { Curso } from "./pages/curso/Curso";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { esES } from "@mui/x-date-pickers/locales/esES";
import 'dayjs/locale/es-mx';
import { AnimatePresence } from "framer-motion";
import { Clase } from "./pages/clase/Clase";

function App() {
  const { tema } = useThemeStore();
  const temaOptions = themeOptions(tema);
  const url =
  import.meta.env.VITE_BASE_VERSION_API;
  const { variante, msg, handleOpenToast, openToast, setOpenToast } =
    useOpenToast();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx" localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
    <ThemeProvider theme={temaOptions}>
      <AnimatePresence mode="sync">
      <Container
        sx={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
        maxWidth="xl"
      >
        <Router>
          <Routes>
            <Route path="/" element={<Inicio url={url} handleOpenToast={handleOpenToast} />} />
            <Route
              path="/escuela/:escuelaId/:year"
              element={
                <Escuela
                  url={url}
                  handleOpenToast={handleOpenToast}
                />
              }
            />
            <Route path="/curso/:id" element={<Curso url={url} handleOpenToast={handleOpenToast}/>}/>
            <Route path="/clase/:id" element={<Clase url={url} handleOpenToast={handleOpenToast}/>}/>
          </Routes>
        </Router>
      </Container>
      <AlertCustom
        openToast={openToast}
        variante={variante}
        msg={msg}
        setOpenToast={setOpenToast}
        key={`${msg}-${Math.random()}`}
      ></AlertCustom>
      </AnimatePresence>
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
