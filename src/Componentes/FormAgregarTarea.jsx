import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Input from "./CompForm/Input";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Grid,makeStyles } from "@material-ui/core/";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import InputDate from "./CompForm/InputDate";
import TextField from '@material-ui/core/TextField'


const FormAgregarTarea = (props) => {
 
  const style = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "80%",
      },
    },
  }));
  const classes = style();
  

  
  return (
    <div>
      <Grid container spacing={1}>
        <Grid container justify="flex-end" item xs={12}>
          <Tooltip title="Cerrar Pestaña">
            <IconButton
              aria-label="CerrarPestaña"
              color="secondary"
              onClick={() => props.cerraraddtarea()}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <form onSubmit={props.onSubmit} className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Box marginTop={1.9}>
              <Input
                label="Asunto"
                name="tarea"
                type="text"
                onChange={props.handleInputChange}
              ></Input>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <InputDate
              label="Fecha"
              name="fechatarea"
              value={props.tarea.fechatarea}
              onChange={props.handleInputChange}
            ></InputDate>
          </Grid>
          <Grid item xs={6}>
            <Box marginTop={1.4}>
            <TextField
              autoComplete="off"
              label="Recurso"
              name="recurso"
              type="text"
              onChange={props.handleInputChange}
              helperText="Si no dejelo en blanco"             
              size="small" 
            />
            </Box>
          </Grid>
          <Grid container justify="center" item xs={12}>
            <Box marginTop={3}>
              <Button variant="outlined" color="primary" type="submit">
                Agregar Tarea
              </Button>
            </Box>
          </Grid>

        </Grid>
      </form>
    </div>
  );
};

export default FormAgregarTarea;
