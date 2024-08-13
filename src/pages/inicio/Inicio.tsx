import { Alert, AlertColor, Box, CircularProgress } from "@mui/material";
import { useFetchGlobal } from "../../util/hooks/crud/useFetchGlobal";
import { EscuelasRequest } from "../../util/interfaces/escuelas/EscuelasRequest";
import { FormInicio } from "./components/FormInicio";

interface PropsInicio {
  url: string;
  tema: "light" | "dark";
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}

export const Inicio = (props: PropsInicio) => {
  const { url, tema, handleOpenToast } = props;
  const urlApi = url + import.meta.env.VITE_api_get_all_escuelas;
  console.log(urlApi);
  
  const { data, error, loading, updateData } = useFetchGlobal<EscuelasRequest>(urlApi);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    // setInterval(() => {
    //   window.location.reload();
    // }, 5000);
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormInicio
      data={Array.isArray(data) ? data : Array.of(data)} handleOpenToast={handleOpenToast} tema={tema} url={url} updateData={updateData} />
    </Box>
  );
};
