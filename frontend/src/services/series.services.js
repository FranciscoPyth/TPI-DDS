import axios from "axios";
import { config } from "../config";

const { urlResourceSeries } = config;

async function Buscar(titulo, Pagina) {
  const resp = await axios.get(urlResourceSeries, {
    params: { titulo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResourceSeries + "/" + item.idSerie);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResourceSeries + "/" + item.idSerie);
}

async function Grabar(item) {
  if (item.idSerie === 0) {
    await axios.post(urlResourceSeries, item);
  } else {
    await axios.put(urlResourceSeries + "/" + item.idSerie, item);
  }
}


async function Eliminar(item) {
  await axios.delete(urlResourceSeries + "/" + item.idSerie);
}

export const seriesService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
  Eliminar,
};
