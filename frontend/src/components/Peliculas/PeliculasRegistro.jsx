import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";

function PeliculasRegistro({
  AccionABMC,
  generos,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    data.fechaEstreno = moment(data.fechaEstreno).format("YYYY-MM-DD");
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo titulo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="titulo">
                Titulo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("titulo", {
                  required: { value: true, message: "Titulo es requerido" },
                  minLength: {
                    value: 3,
                    message: "Titulo debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 70,
                    message: "Titulo debe tener como máximo 70 caracteres",
                  },
                  unique: { value: true, message: "Titulo ya existe" },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.titulo && touchedFields.titulo && (
                <div className="invalid-feedback">
                  {errors?.titulo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo fechaEstreno */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaEstreno">
                Fecha Estreno<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaEstreno", {
                  required: { value: true, message: "Fecha Estreno es requerido" }
                })}
                className={
                  "form-control " + (errors?.fechaEstreno ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fechaEstreno?.message}
              </div>
            </div>
          </div>

          {/* campo duracion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="duracion">
                Duración<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("duracion", {
                  required: { value: true, message: "Duración es requerido" },
                  min: {
                    value: 1,
                    message: "Duración debe ser mayor a 0",
                  },
                  isInteger: { value: true, message: "Duración debe ser un número entero" },
                })}
                className={
                  "form-control " + (errors?.duracion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.duracion?.message}</div>
            </div>
          </div>

          {/* campo idGenero */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="idGenero">
                Genero<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("idGenero", {
                  required: { value: true, message: "Genero es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.idGenero ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Array.isArray(generos) && generos.map((x) => (
                  <option value={x.idGenero} key={x.idGenero}>
                    {x.nombreGenero}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.idGenero?.message}
              </div>
            </div>
          </div>

          {/* campo cantidadPremios */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="cantidadPremios">
                Cantidad de Premios<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("cantidadPremios", {
                  required: { value: true, message: "Cantidad de Premios es requerido" },
                  min: {
                    value: -1,
                    message: "Cantidad de premios debe al menos 0",
                  },
                  isInteger: { value: true, message: "Cantidad de Premios debe ser un número entero" },
                })}
                className={
                  "form-control " + (errors?.cantidadPremios ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.cantidadPremios?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}

export { PeliculasRegistro }
