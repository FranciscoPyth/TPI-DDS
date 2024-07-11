import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";

function CortosRegistro({
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
                    value: 2,
                    message: "Título debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 60,
                    message: "Título debe tener como máximo 60 caracteres",
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

          {/* campo sinopsis */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="sinopsis">
                Sinopsis<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <textarea
                {...register("sinopsis", {
                  required: { value: true, message: "Sinopsis es requerida" },
                  minLength: {
                    value: 10,
                    message: "Sinopsis debe tener al menos 10 caracteres",
                  },
                  maxLength: {
                    value: 500,
                    message: "Sinopsis debe tener como máximo 500 caracteres",
                  },
                })}
                className={
                  "form-control " + (errors?.sinopsis ? "is-invalid" : "")
                }
              />
              {errors?.sinopsis && touchedFields.sinopsis && (
                <div className="invalid-feedback">
                  {errors?.sinopsis?.message}
                </div>
              )}
            </div>
          </div>


          {/* campo guionista */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="guionista">
                Guionista<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <textarea
                {...register("guionista", {
                  required: { value: true, message: "Guionista es requerida" },
                  minLength: {
                    value: 5,
                    message: "Guionista debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 60,
                    message: "Guionista debe tener como máximo 60 caracteres",
                  },
                })}
                className={
                  "form-control " + (errors?.guionista ? "is-invalid" : "")
                }
              />
              {errors?.guionista && touchedFields.guionista && (
                <div className="invalid-feedback">
                  {errors?.guionista?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo presupuesto */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="presupuesto">
                Presupuesto<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step=".01"
                {...register("presupuesto", {
                  required: { value: true, message: "Presupuesto es requerido" },
                  min: {
                    value: 0.01,
                    message: "Presupuesto debe ser mayor a 0",
                  },
                  max: {
                    value: 999999.99,
                    message: "Presupuesto debe ser menor o igual a 999999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.presupuesto ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.presupuesto?.message}</div>
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


          {/* campo Cantidad de Nominaciones */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="cantidadNominaciones">
                Cantidad de Nominaciones<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("cantidadNominaciones", {
                  required: { value: true, message: "Cantidad de Nominaciones es requerido" },
                  min: {
                    value: -1,
                    message: "Cantidad de Nominaciones debe al menos 0",
                  },
                  isInteger: { value: true, message: "Cantidad de Nominaciones debe ser un número entero" },
                })}
                className={
                  "form-control " + (errors?.cantidadNominaciones ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.cantidadNominaciones?.message}</div>
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

export { CortosRegistro }