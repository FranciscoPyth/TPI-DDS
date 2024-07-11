import React, { useState, useEffect } from "react";
import { CortosBuscar } from "./CortosBuscar";
import { CortosListado } from "./CortosListado";
import { CortosRegistro } from "./CortosRegistro";
import { generos as generosService } from "../../services/generos.services";
import { cortosService } from "../../services/cortos.service";
import modalDialogService from "../../services/modalDialog.service";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


function Cortos() {
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
    
    modalDialogService.BloquearPantalla(true);
    const data = await cortosService.Buscar(Titulo, _pagina);
    modalDialogService.BloquearPantalla(false);

    setItems(data.Cortos);
    setRegistrosTotal(data.RegistrosTotal);

    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await cortosService.BuscarPorId(item);
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
      idCorto: 0,
      titulo: "",
      fechaEstreno: moment().format("YYYY-MM-DD"),
      sinopsis: "",
      presupuesto: 0,
      idGenero: 0,
      cantidadNominaciones: 0,
    });
    modalDialogService.Alert("preparando el Alta...");
    console.log(Item);
  }

  const Imprimir = () => {
    {
      const data = Items.map((item) => ({
        Título: item.titulo,
        "Fecha Estreno": item.fechaEstreno,
        Sinopsis: item.sinopsis,
        Presupuesto: item.presupuesto,
        Genero: generos.find((genero) => genero.idGenero === item.idGenero)?.nombreGenero || "",
        "Cantidad de Nominaciones": item.cantidadNominaciones,
      }));
  
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Cortos");
  
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(dataBlob, "CortosListado.xlsx");
    };
  }

  async function Eliminar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere eliminar el corto?",
      undefined,
      undefined,
      undefined,
      async () => {
        await cortosService.Eliminar(item);
        await Buscar();
      }
    );
  }


  async function Grabar(item) {
    try {
      await cortosService.Grabar(item);
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
        "Corto " +
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
        Cortos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <CortosBuscar 
          {...{
            Titulo,
            setTitulo,
            Buscar,
            Agregar,
          }} 
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <CortosListado
          {...{
            Items,
            Consultar,
            Eliminar,
            Modificar,
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
        <CortosRegistro
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

export { Cortos };