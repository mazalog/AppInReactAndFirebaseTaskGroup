import React from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';

const AgregarTarea = (props) => {
  const { register, errors, handleSubmit } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Grid container spacing={1}>
          <Grid container justify="flex-end" item xs={12}>
             <IconButton aria-label="cerrar" onClick={()=>props.cerraragregartarea()} color="secondary">
                 <CloseIcon/>
             </IconButton>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="Asunto de la tarea">Asunto de la tarea:</label>
            <input
              type="text"
              name="tarea"
              className="form-control"
              ref={register({
                required: { value: true, message: "Requerido" },
              })}
            />
            <p>
              <small className="text-danger text-small">
                {errors.tarea && errors.tarea.message}
              </small>
            </p>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="Fecha">Fecha:</label>
            <input
              type="date"
              name="fecha"
              className="form-control"
              ref={register({
                required: { value: true, message: "Requerido" },
              })}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" item xs={12}>
          <Button type="submit" variant="outlined" color="primary">
            Agregar
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default AgregarTarea;
