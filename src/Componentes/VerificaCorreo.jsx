import {
  Grid,
  makeStyles,
  Paper,
  Box,
  IconButton,
  Button
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from '../email.png';
import { useFirebaseApp } from "reactfire";
import Tooltip from '@material-ui/core/Tooltip';
import "../app.css";


const Verificacorreo = () => {

//style
  const style = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(5),
      padding: "6%",
    },
    Centrado: {
      marginTop: "20%",
    },
  }));

  const classes = style();

  //firebase

  const firebase = useFirebaseApp();
  function cierra(){
    firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("cerrado");
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  const verificar=()=>{
    var user=firebase.auth().currentUser
    user.sendEmailVerification()
    .then(function(){

    })
    .catch(function(error){

        console.log(error)
    })
}

  return (
    <Paper className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6} md={6}></Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={3} md={2}>
          <Tooltip title="Cerrar">
             <IconButton onClick={cierra} color="primary" aria-label="Cerrar" >
                      <ExitToAppIcon/>
               </IconButton> 
           </Tooltip> 
        </Grid>
      </Grid>
      <Box >
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
             <b> Revisa tu correo </b> 
            </p>
            <Button
              variant="outlined"
              color="primary"
              href="/"
              className="mt-3 enlace nav-link"
            >
              Actualizar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className="mt-3 enlace nav-link"
              onClick={()=>verificar()}
            >
              Reenviar correo de verificacion
            </Button>
          </div> 
        </div>
      </Box>
    </Paper>
  );
};
export default Verificacorreo;
