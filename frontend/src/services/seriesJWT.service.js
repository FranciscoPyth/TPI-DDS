import {config} from "../config";
import httpService from "./http.service";
const urlResourceSeriesJWT = config.urlResourceSeriesJWT;


async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResourceSeriesJWT, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResourceSeriesJWT + "/" + item.idSerie);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResourceSeriesJWT + "/" + item.idSerie);
}


async function Grabar(item) {
  if (item.idSerie === 0) {
    await httpService.post(urlResourceSeriesJWT, item);
  } else {
    await httpService.put(urlResourceSeriesJWT + "/" + item.idSerie, item);
  }
}


export const seriesJWTService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
