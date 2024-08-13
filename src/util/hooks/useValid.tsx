import { useState } from "react";

/**
 * @returns {string, setString, error, setError}
 * @description Hook para validaciones de campos de texto y su error
 */
export const useValid = () => {
    const [string, setString] = useState("");
    const [error, setError] = useState({
      state: false,
      message: "",
    });

    return  {
        string, setString, setError, error
    }
}