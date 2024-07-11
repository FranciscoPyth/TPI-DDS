import React from "react";
import moment from "moment";

export function CortosListado({
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
}) {
   
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Título</th>
            <th className="text-center" style={{ width: "15%" }}>Fecha Estreno</th>
            <th className="text-center" style={{ width: "20%" }}>Sinopsis</th>
            <th className="text-center">Guionista</th>
            <th className="text-center">Presupuesto</th>
            <th className="text-center" style={{ width: "15%" }}>Genero</th>
            <th className="text-center">Cantidad de Nominaciones</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.idSerie}>
                <td className="text-center align-middle">{Item.titulo}</td>
                <td className="text-center">
                  {moment(Item.fechaEstreno).format("YYYY-MM-DD")}
                </td>
                <td className="text-center align-middle" style={{ width: "20%" }}>{Item.sinopsis}</td>
                <td className="text-center align-middle">{Item.guionista}</td>
                <td className="text-center align-middle">{"$"+Item.presupuesto}</td>
                <td className="text-center align-middle" style={{ width: "15%" }}>
                  {generos.find((Genero) => Genero.idGenero === Item.idGenero)?.nombreGenero || ""}
                </td>
                <td className="text-center align-middle">{Item.cantidadNominaciones}</td>
                <td className="text-center align-middle text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => Eliminar(Item)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>
          <div className="col">
            <button className="btn btn-primary float-end" onClick={Imprimir}>
              <i className="fa fa-print"></i> Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}