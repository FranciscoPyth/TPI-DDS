import React, { useState, useEffect } from "react";
import { seriesJWTService } from "../../services/seriesJWT.service";


function SeriesJWT() {
  const tituloPagina = "Series JWT (solo para admintradores)";
  const [series, setSeries] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarseriesJWT();
  }, []);


  async function BuscarseriesJWT() {
     try {
      let data = await seriesJWTService.Buscar();
      setSeries(data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!")
    }
  }




  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>IdSerie</th>
            <th style={{ width: "50%" }}>Titulo</th>
            <th style={{ width: "30%" }}>Fecha Estreno</th>
          </tr>
        </thead>
        <tbody>
          {series &&
            series.map((serie) => (
              <tr key={serie.idSerie}>
                <td>{serie.idSerie}</td>
                <td>{serie.titulo}</td>
                <td>{serie.fechaEstreno}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
SeriesJWT.NombreComponenteNoOfuscado = "SeriesJWT";
export { SeriesJWT };