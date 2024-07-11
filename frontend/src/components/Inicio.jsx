import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion } from 'framer-motion';
import './Inicio.css'; // Crea este archivo para agregar estilos personalizados

function Inicio() {
  return (
    <div className="inicio-container">
      <div className="container mt-5 p-5 bg-light rounded text-center" style={{ marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <motion.h1
          className="mb-4"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Bienvenido a Cinerama App
        </motion.h1>
        <motion.p
          className="lead mb-4"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Gestiona tus series, películas, documentales y cortos favoritos de manera sencilla y rápida.
        </motion.p>
        <div className="row mb-4">
          <div className="col-md-6">
            <motion.div
              className="p-4 bg-white rounded shadow-sm h-100"
              whileHover={{ scale: 1.05 }}
            >
              <h5>Backend</h5>
              <p>NodeJs, Express, WebApiRest, Swagger, Sequelize, Sqlite.</p>
            </motion.div>
          </div>
          <div className="col-md-6">
            <motion.div
              className="p-4 bg-white rounded shadow-sm h-100"
              whileHover={{ scale: 1.05 }}
            >
              <h5>Frontend</h5>
              <p>Single Page Application con React, HTML, CSS y Bootstrap.</p>
            </motion.div>
          </div>
        </div>
        <div className="row">
          {['series', 'peliculas', 'documentales', 'cortos'].map((category, index) => (
            <div className="col-md-3 col-sm-6 mb-3" key={category}>
              <Link to={`/${category}`} className="btn btn-lg btn-primary w-100">
                <i className={`fas fa-${index === 0 ? 'tv' : index === 1 ? 'film' : index === 2 ? 'book' : 'video'}`}></i> Ver {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Inicio };
