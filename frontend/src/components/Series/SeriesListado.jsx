import React from "react";

export function SeriesListado({
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
            <th className="text-center" style={{ width: "20%" }}>Descripción</th>
            <th className="text-center" style={{ width: "15%" }}>Fecha Estreno</th>
            <th className="text-center">Temporadas</th>
            <th className="text-center" style={{ width: "15%" }}>Genero</th>
            <th className="text-center">Calificación</th>
            <th className="text-center">Creador</th>
            <th className="text-center">Trailer</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.idSerie}>
                <td className="text-center align-middle">{Item.titulo}</td>
                <td className="text-center align-middle" style={{ width: "20%" }}>{Item.descripcion}</td>
                <td className="text-center align-middle" style={{ width: "15%" }}>{Item.fechaEstreno}</td>
                <td className="text-center align-middle">{Item.temporadas}</td>
                <td className="text-center align-middle" style={{ width: "15%" }}>
                  {generos.find((Genero) => Genero.idGenero === Item.idGenero)?.nombreGenero || ""}
                </td>
                <td className="text-center align-middle">{Item.calificacion}</td>
                <td className="text-center align-middle">{Item.creador}</td>
                <td className="text-center align-middle">
                  <a href={Item.trailer_url} target="_blank" rel="noopener noreferrer">
                    Ver Trailer
                  </a>
                </td>
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