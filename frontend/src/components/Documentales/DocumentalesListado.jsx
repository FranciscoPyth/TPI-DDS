import React from "react";
import moment from "moment";

function DocumentalesListado({
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
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Título</th>
            <th className="text-center">Investigador</th>
            <th className="text-center">Director</th>
            <th className="text-center">Genero</th>
            <th className="text-center">Fecha Estreno</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Docu) => (
              <tr key={Docu.idDocumental}>
                <td className="text-center">{Docu.titulo}</td>
                <td className="text-center">{Docu.investigador}</td>
                <td className="text-center">{Docu.director}</td>
                <td className="text-center">
                    {generos.map((Genero) => (
                        Genero.idGenero === Docu.idGenero ? Genero.nombreGenero : ""))}
                </td>
                <td className="text-center">
                  {moment(Docu.fechaEstreno).format("YYYY-MM-DD")}
                </td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Docu)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Docu)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => Eliminar(Docu)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Documentales: {RegistrosTotal}</span>
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
            <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { DocumentalesListado }