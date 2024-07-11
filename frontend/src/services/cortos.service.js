import { config } from "../config";
import httpService from "./http.service";
const { urlResourceCortos } = config;

async function Buscar(titulo, Pagina) {
  const resp = await httpService.get(urlResourceCortos, {
    params: { titulo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResourceCortos + "/" + item.idCorto);
  return resp.data;
}

async function Eliminar(item) {
  await httpService.delete(urlResourceCortos + "/" + item.idCorto);
}

async function Grabar(item) {
  if (item.idCorto === 0) {
    await httpService.post(urlResourceCortos, item);
  } else {
    await httpService.put(urlResourceCortos + "/" + item.idCorto, item);
  }
}

export const cortosService = {
  Buscar,
  BuscarPorId,
  Eliminar,
  Grabar
};
