import React, { useState, useEffect } from "react";
import { SeriesBuscar } from "./SeriesBuscar";
import { SeriesListado } from "./SeriesListado";
import { SeriesRegistro } from "./SeriesRegistro";
import { generos as generosService } from "../../services/generos.services";
import { seriesService } from "../../services/series.services";
import modalDialogService from "../../services/modalDialog.service";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


function Series() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Titulo, setTitulo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  
  const [generos, setGeneros] = useState(null);

  useEffect(() => {
    async function BuscarGeneros() {
      let data = await generosService.Buscar();
      setGeneros(data);
    }
    BuscarGeneros();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    
    const data = await seriesService.Buscar(Titulo, _pagina);
    modalDialogService.BloquearPantalla(false);

    setItems(data.Series);
    setRegistrosTotal(data.RegistrosTotal);

    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await seriesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    BuscarPorId(item, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      idSerie: 0,
      titulo: "",
      descripcion: "",
      fechaEstreno: moment().format("YYYY-MM-DD"),
      temporadas: 0,
      idGenero: 0,
      calificacion: 0,
      creador: "",
      trailer_url: "",
    });
    modalDialogService.Alert("preparando el Alta...");
    console.log(Item);
  }

  const Imprimir = () => {
    {
      const data = Items.map((item) => ({
        Título: item.titulo,
        Descripción: item.descripcion,
        "Fecha Estreno": item.fechaEstreno,
        Temporadas: item.temporadas,
        Genero: generos.find((genero) => genero.idGenero === item.idGenero)?.nombreGenero || "",
        Calificación: item.calificacion,
        Creador: item.creador,
        Trailer: item.trailer_url,
      }));
  
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Series");
  
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(dataBlob, "SeriesListado.xlsx");
    };
  }

  async function Eliminar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere eliminar la pelicula?",
      undefined,
      undefined,
      undefined,
      async () => {
        await seriesService.Eliminar(item);
        await Buscar();
      }
    );
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await seriesService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    try {
      await seriesService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(
        error?.response?.data?.message ?? error.toString()
      );
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Series <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <SeriesBuscar 
          {...{
            Titulo,
            setTitulo,
            Buscar,
            Agregar,
          }} 
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <SeriesListado
          {...{
            Items,
            Consultar,
            Eliminar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
            generos,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <SeriesRegistro
          {...{ 
            AccionABMC, 
            generos, 
            Item, 
            Grabar, 
            Volver 
          }}
        />
      )}
    </div>
  );
}

export { Series };