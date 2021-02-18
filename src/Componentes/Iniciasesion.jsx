import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "firebase/auth";
import { useFirebaseApp } from "reactfire";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const firebase = useFirebaseApp();
  const valoresiniciales = { correo: "", contrasena:"" };
  const [valor, setvalor] = useState(valoresiniciales);
  const handleInputChange = (event) => {
    setvalor({
      ...valor,
      [event.target.name]: event.target.value,
    });
  };
  const Ingresar = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(valor.correo, valor.contrasena)
      .then(function () {})
      .catch(function (error) {
        console.log(error);
        handleClick();
      });
  };

  return (
    <Container
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          GroupTaskMz
        </Typography>
        <form className={classes.form}  onSubmit={Ingresar}>
          <TextField
            margin="normal"
            required
            name="correo"
            type="email"
            label="Correo"
            onChange={handleInputChange}
            autoComplete="email"
            autoFocus
            fullWidth

          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="contrasena"
            label="Contraseña"
            type="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Mantener sesion iniciada"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar sesion
          </Button>

        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error !
        </Alert>
      </Snackbar>
    </Container>
  );
}
