import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";

function SeriesRegistro({
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
                Título<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("titulo", {
                  required: { value: true, message: "Título es requerido" },
                  minLength: {
                    value: 3,
                    message: "Título debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 70,
                    message: "Título debe tener como máximo 70 caracteres",
                  },
                  unique: { value: true, message: "Título ya existe" },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.titulo ? "is-invalid" : "")
                }
              />
              {errors?.titulo && touchedFields.titulo && (
                <div className="invalid-feedback">
                  {errors?.titulo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo descripcion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="descripcion">
                Descripción<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <textarea
                {...register("descripcion", {
                  required: { value: true, message: "Descripción es requerida" },
                  minLength: {
                    value: 10,
                    message: "Descripción debe tener al menos 10 caracteres",
                  },
                  maxLength: {
                    value: 500,
                    message: "Descripción debe tener como máximo 500 caracteres",
                  },
                })}
                className={
                  "form-control " + (errors?.descripcion ? "is-invalid" : "")
                }
              />
              {errors?.descripcion && touchedFields.descripcion && (
                <div className="invalid-feedback">
                  {errors?.descripcion?.message}
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
                  required: { value: true, message: "Fecha Estreno es requerida" }
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

          {/* campo temporadas */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="temporadas">
                Temporadas<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("temporadas", {
                  required: { value: true, message: "Temporadas es requerido" },
                  min: {
                    value: 1,
                    message: "Temporadas debe ser mayor a 0",
                  },
                  isInteger: { value: true, message: "Temporadas debe ser un número entero" },
                })}
                className={
                  "form-control " + (errors?.temporadas ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.temporadas?.message}</div>
            </div>
          </div>

          {/* campo idGenero */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="idGenero">
                Género<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("idGenero", {
                  required: { value: true, message: "Género es requerido" },
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

          {/* campo calificacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="calificacion">
                Calificación<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("calificacion", {
                  required: { value: true, message: "Calificación es requerida" },
                  min: {
                    value: 0,
                    message: "Calificación debe ser al menos 0",
                  },
                  max: {
                    value: 10,
                    message: "Calificación debe ser como máximo 10",
                  },
                  isInteger: { value: true, message: "Calificación debe ser un número entero" },
                })}
                className={
                  "form-control " + (errors?.calificacion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.calificacion?.message}</div>
            </div>
          </div>

          {/* campo creador */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="creador">
                Creador<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("creador", {
                  required: { value: true, message: "Creador es requerido" },
                  minLength: {
                    value: 3,
                    message: "Creador debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Creador debe tener como máximo 100 caracteres",
                  },
                })}
                className={
                  "form-control " + (errors?.creador ? "is-invalid" : "")
                }
              />
              {errors?.creador && touchedFields.creador && (
                <div className="invalid-feedback">
                  {errors?.creador?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo trailer_url */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="trailer_url">
                URL del Trailer<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="url"
                {...register("trailer_url", {
                  required: { value: true, message: "URL del Trailer es requerido" },
                  pattern: {
                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                    message: "URL no válida",
                  },
                })}
                className={
                  "form-control " + (errors?.trailer_url ? "is-invalid" : "")
                }
              />
              {errors?.trailer_url && touchedFields.trailer_url && (
                <div className="invalid-feedback">
                  {errors?.trailer_url?.message}
                </div>
              )}
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

export { SeriesRegistro }