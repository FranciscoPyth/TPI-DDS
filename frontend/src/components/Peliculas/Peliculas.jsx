import React, { useState, useEffect } from "react";
import moment from "moment";
import { PeliculasBuscar } from "./PeliculasBuscar";
import { PeliculasListado } from "./PeliculasListado";
import { PeliculasRegistro } from "./PeliculasRegistro";
import { generos as generosService } from "../../services/generos.services";
import { peliculasService } from "../../services/peliculas.services";
import modalDialogService from "../../services/modalDialog.service";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


function Peliculas() {
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
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [generos, setGeneros] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
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
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await peliculasService.Buscar(Titulo, _pagina);
    modalDialogService.BloquearPantalla(false);

    setItems(data.Pelis);
    setRegistrosTotal(data.RegistrosTotal);

    // generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await peliculasService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Modificar(item) {
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      idPelicula: 0,
      titulo: "",
      fechaEstreno: moment().format("YYYY-MM-DD"),
      duracion: 0,
      idGenero: 0,
      cantidadPremios: 0,
    });
    modalDialogService.Alert("preparando el Alta...");
    console.log(Item);
  }

  const Imprimir = () => {
    {
      const data = Items.map((item) => ({
        Título: item.titulo,
        "Fecha Estreno": item.fechaEstreno,
        Duración: item.duracion,
        Genero: generos.find((genero) => genero.idGenero === item.idGenero)?.nombreGenero || "",
        "Cantidad de Premios": item.cantidadPremios,
      }));
  
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Series");
  
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(dataBlob, "PeliculasListado.xlsx");
    };
  }

  async function Eliminar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere eliminar la pelicula?",
      undefined,
      undefined,
      undefined,
      async () => {
        await peliculasService.Eliminar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await peliculasService.Grabar(item);
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
        "Pelicula " +
          (AccionABMC === "A" ? "agregada" : "modificada") +
          " correctamente."
      );
    }, 0);
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Peliculas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <PeliculasBuscar 
          {...{
            Titulo,
            setTitulo,
            Buscar,
            Agregar,
          }} 
        />
      )}

      {/* Tabla de resultados de búsqueda y paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <PeliculasListado
          {...{
            Items,
            Consultar,
            Modificar,
            Eliminar,
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
          No se encontraron peliculas...
        </div>
      )}

      {/* Formulario de alta/modificación/consulta */}
      {AccionABMC !== "L" && (
        <PeliculasRegistro
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

export { Peliculas };
