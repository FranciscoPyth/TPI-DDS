/*
En este archivo se definen las URL de los servicios REST que se van a consumir. Para
estandarizar un poco más el proceso y no tener que modificar cada archivo que consuma una URL
*/

// opcion 1 cuando se hacen pruebas locales
const urlServidor = "https://tpi-dds-utn-frc.onrender.com/"


// opcion 2 cuando se despliega el frontend en un servidor distinto al backend
//const urlServidor = "https://labsys.frc.utn.edu.ar/dds-backend-2024"
//const urlServidor = "https://dds-backend.azurewebsites.net"
//const urlServidor = "https://webapi.pymes.net.ar"


// opcion 3 cuando se despliega el frontend, en el mismo servidor que el backend
//const urlServidor = ""  


const urlResourceSeriesJWT = urlServidor + "/api/seriesJWT";
const urlResourcePeliculas = urlServidor + "/api/peliculas";
const urlResourceSeries = urlServidor + "/api/series";
const urlResourceDocumentales = urlServidor + "/api/documentales";
const urlResourceCortos = urlServidor + "/api/cortos";
const urlResourceGeneros = urlServidor + "/api/generos";


export const config = {
    urlServidor,
    urlResourcePeliculas,
    urlResourceSeries,
    urlResourceDocumentales,
    urlResourceCortos,
    urlResourceGeneros,
    urlResourceSeriesJWT
}
