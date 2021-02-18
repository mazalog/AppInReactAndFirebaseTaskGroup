import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Input from "./CompForm/Input";
import { Grid, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";



const FormAgregarGrupo = (props) => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid container justify="flex-end" item xs={12}>
          <Tooltip title="Cerrar Pestaña">
            <IconButton
              aria-label="CerrarPestaña"
              color="secondary"
              onClick={() => props.cerraraddgrupo()}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <form className={props.classes.root} onSubmit={props.onSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Asunto"
              name="grupo"
              type="text"
              onChange={props.handleInputChange}
            ></Input>
          </Grid>
          <Grid item xs={6}>
            <IconButton
              aria-label="Agregar asunto"
              color="primary"
              type="submit"
            >
              <AddIcon></AddIcon>
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FormAgregarGrupo;
