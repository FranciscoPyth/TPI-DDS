// src/App.jsx
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Series } from "./components/Series/Series";
import { Peliculas } from "./components/Peliculas/Peliculas";
import { Documentales } from "./components/Documentales/Documentales";
import { Cortos } from "./components/Cortos/Cortos";
import { ModalDialog } from "./components/ModalDialog";
import {RequireAuth} from "./components/RequiereAuth" ;
import { Login } from "./components/login/Login";
import { SeriesJWT } from "./components/seriesJWT/SeriesJWT";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="divBody">
        <ModalDialog />
        <Menu />
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/series" element={<Series />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/documentales" element={<Documentales />} />
          <Route path="/cortos" element={<Cortos />} />
          <Route
            path="/seriesjwt"
            element={
              <RequireAuth>
                <SeriesJWT />
              </RequireAuth>
            }
          />
          <Route path="/login/:componentFrom" element={<Login />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
