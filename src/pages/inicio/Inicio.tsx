import { Alert, AlertColor,  CircularProgress } from "@mui/material";
import { EscuelasRequest } from "../../util/interfaces/escuelas/EscuelasRequest";
import { FormInicio } from "./components/FormInicio";
import { fetchEscuelas } from "../../util/shared/fetchEscuela";
import { useQuery } from "@tanstack/react-query";
import { BoxTheme } from "../../components/shared/boxTheme/BoxTheme";
import { Box } from '@mui/material';
import { useThemeStore } from "../../util/context/useThemeStore";

interface PropsInicio {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}

export const Inicio = (props: PropsInicio) => {
  const { url, handleOpenToast,  } = props;
  const { tema, setTema } = useThemeStore();
  const query = useQuery<EscuelasRequest[], Error>({
    queryKey: ["escuelas"],
    queryFn: () => fetchEscuelas(url),
  });
  const data = query.data ? query.data : [];
  const updateData = () => {
    query.refetch();
  };

  if (query.isLoading) {
    return <CircularProgress />;
  }

  if (query.isError) {
    return <Alert severity="error">{query.error.message}</Alert>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <FormInicio
        data={data}
        handleOpenToast={handleOpenToast}
        tema={tema}
        url={url}
        updateData={updateData}
      />
      <BoxTheme tema={tema} setTema={setTema} />
    </Box>
  );
};
