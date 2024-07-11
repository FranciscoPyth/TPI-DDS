import axios from "axios";
import { config } from "../config";  // Importa config

const { urlResourceGeneros } = config;  // Desestructurar urlResourceGeneros

async function Buscar() {
  const resp = await axios.get(urlResourceGeneros);
  return resp.data;
}

export const generos = {
  Buscar
};
