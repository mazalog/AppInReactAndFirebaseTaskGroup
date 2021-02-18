import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Input from './CompForm/Input'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const FormAgregarRecurso= (props) => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid container justify="flex-end" item xs={12}>
          <Tooltip title="Cerrar Pestaña">
            <IconButton aria-label="CerrarPestaña" color="secondary" >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <form onSubmit={props.onSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Input label="Procedimiento" name="subtarea" type="text" ></Input>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid container justify="center" item xs={12}>
            <Box marginTop={3}>
              <Button variant="outlined" color="primary" type="submit">
                Agregar procedimiento
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FormAgregarRecurso;
