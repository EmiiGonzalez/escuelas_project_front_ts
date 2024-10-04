import { Autocomplete, TextField } from "@mui/material";
import { ErrorInterface } from "../../../util/interfaces/ErrorInterface";
import { EscuelasRequest } from "../../../util/interfaces/escuelas/EscuelasRequest";

/**
 * @function AutoCompleteEscuela
 * @param {PropsAutoCompleteEscuela} props
 * @returns {JSX.Element}
 * @description Componente para el autocompletado de escuelas en el inicio de la aplicación
 * 
 */
export const AutoCompleteEscuela = (props: PropsAutoCompleteEscuela) => {
  const { data, setEscuela, setError, tema, error } = props;
 
  return (
    <Autocomplete
        freeSolo={false}
        options={data}
        noOptionsText="No se encontraron escuelas"
        getOptionLabel={(option) => option?.nombre || ""}
        onChange={(_event : React.SyntheticEvent , newValue) => {
          // newValue será null si se borra la selección
          setEscuela(newValue ? {nombre: newValue.nombre, id: newValue.id} : {nombre: "",  id: 0});
          setError({
            state: !newValue,
            message: newValue
              ? ""
              : "Por favor, ingrese una escuela de la lista",
          });
        }}
        onInputChange={(_event: React.SyntheticEvent, newInputValue: string) => {
          // Actualiza el estado de error cuando se escribe en el campo de texto
          if (!newInputValue) {
            setError({
              state: true,
              message: "Por favor, ingrese una escuela de la lista",
            });
          }
        }}
        onBlur={
          (event : React.FocusEvent<HTMLInputElement>) => {
            if (!event.target.value) {
              setError({
                state: true,
                message: "Por favor, ingrese una escuela de la lista",
              });
            }
          }
        }
        renderInput={(params) => (
          <TextField
            variant={tema === "light" ? "filled" : "outlined"}
            sx={{color: 'text.primary'}}
            {...params}
            label="Escuela"
            error={error.state}
            helperText={error.message}
          />
        )}
        sx={{ width: 300, mb: 2 }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.nombre}
          </li>
        )}
      />
  );
};

interface PropsAutoCompleteEscuela {
  data: EscuelasRequest[];
  setEscuela: (value: EscuelasRequest) => void;
  setError: (error: ErrorInterface) => void;
  tema: "light" | "dark";
  error: ErrorInterface;
}
