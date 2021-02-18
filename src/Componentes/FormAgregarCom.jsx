import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Input from "./CompForm/Input";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from '@material-ui/core'

const FormAgregarCom = (props) => {
  const style = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "80%",
        margin: theme.spacing(3),
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
              onClick={() => props.cerraraddgrupo()}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <form onSubmit={props.onSubmit} className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={6} >
            <Input
              onChange={props.handleInputChange}
              type="text"
              label="Direccion"
              name="direccion"
              helperText="Direccion que te compartieron"
              fullWidth
            ></Input>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              onChange={props.handleInputChange}
              type="text"
              label="Nombre"
              name="grupo"
              helperText="Como deseas llamar este grupo"
              fullWidth
            ></Input>
          </Grid>
          <Grid container justify="center" item xs={12}>
            <Box marginTop={4}>
              <Button variant="outlined" color="primary" type="submit">
                Unirme
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FormAgregarCom;
