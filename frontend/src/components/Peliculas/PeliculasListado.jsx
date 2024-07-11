import React from "react";
import moment from "moment";

function PeliculasListado({
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
            <th className="text-center">Fecha Estreno</th>
            <th className="text-center">Duración</th>
            <th className="text-center">Genero</th>
            <th className="text-center">Cantidad de Premios</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Peli) => (
              <tr key={Peli.idPelicula}>
                <td className="text-center">{Peli.titulo}</td>
                <td className="text-center">
                  {moment(Peli.fechaEstreno).format("YYYY-MM-DD")}
                </td>
                <td className="text-center">{Peli.duracion} m</td>
                <td className="text-center">
                    {generos.map((Genero) => (
                        Genero.idGenero === Peli.idGenero ? Genero.nombreGenero : ""))}
                </td>
                <td className="text-center">{Peli.cantidadPremios}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Peli)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Peli)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => Eliminar(Peli)}
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
            <span className="pyBadge">Peliculas: {RegistrosTotal}</span>
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

export { PeliculasListado }