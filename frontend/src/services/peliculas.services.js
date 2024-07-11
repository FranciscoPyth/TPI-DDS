import { config } from "../config";
import httpService from "./http.service";
const { urlResourcePeliculas } = config;

async function Buscar(titulo, Pagina) {
  const resp = await httpService.get(urlResourcePeliculas, {
    params: { titulo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResourcePeliculas + "/" + item.idPelicula);
  return resp.data;
}

async function Eliminar(item) {
  await httpService.delete(urlResourcePeliculas + "/" + item.idPelicula);
}

async function Grabar(item) {
  if (item.idPelicula === 0) {
    await httpService.post(urlResourcePeliculas, item);
  } else {
    await httpService.put(urlResourcePeliculas + "/" + item.idPelicula, item);
  }
}

export const peliculasService = {
  Buscar,
  BuscarPorId,
  Eliminar,
  Grabar
};
