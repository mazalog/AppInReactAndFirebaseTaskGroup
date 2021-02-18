import React, { useState } from "react";
import Inicio from "./Componentes/Inicio";
import Grid from "@material-ui/core/Grid";
import { Box,Paper } from "@material-ui/core";
import { useFirebaseApp } from "reactfire";
import Grupos from "./Componentes/Grupos";
import VerificaCorreo from "./Componentes/VerificaCorreo";
import Progreso from './Componentes/Progreso'

function App() {
  const [valor, setvalor] = useState(1);

  const firebase = useFirebaseApp();
  const Observador = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          setvalor(2);
        } else {
          setvalor(3);
        }
      } else {
        setvalor(4);
      }
    });
    switch (valor) {
      case 4:
        return <Inicio />;
      case 2:
        return <Grupos />;
      case 3:
        return <VerificaCorreo />;
      default:
        return <Progreso />;
    }
  };

  return (
    <div className="container">
      <Box marginTop={15}
      marginBottom={15}
      >
        <Grid container>
          <Grid item  sm={1} md={2}></Grid>
          <Grid item xs={12} sm={10} md={8}>
            <Paper elevation={10} className="p-5">
              {Observador()}
              </Paper>
          </Grid>
          <Grid item sm={1} md={2}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
