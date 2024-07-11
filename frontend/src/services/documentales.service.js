import { config } from "../config";
import httpService from "./http.service";
const { urlResourceDocumentales } = config;

async function Buscar(titulo, Pagina) {
  const resp = await httpService.get(urlResourceDocumentales, {
    params: { titulo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResourceDocumentales + "/" + item.idDocumental);
  return resp.data;
}

async function Eliminar(item) {
  await httpService.delete(urlResourceDocumentales + "/" + item.idDocumental);
}

async function Grabar(item) {
  if (item.idDocumental === 0) {
    await httpService.post(urlResourceDocumentales, item);
  } else {
    await httpService.put(urlResourceDocumentales + "/" + item.idDocumental, item);
  }
}

export const documentalesService = {
  Buscar,
  BuscarPorId,
  Eliminar,
  Grabar
};
