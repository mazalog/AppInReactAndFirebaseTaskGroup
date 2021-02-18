import React from "react";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Iniciasesion from './Iniciasesion'
import Registra from './Registra'

const Inicio = () => {
  return (
    <div>
      <Router>
        <Grid container spacing={1}>
          <Grid  item xs={6}>
            <Link to="/" className="btn btn-sm btn-dark" >
             <b>INGRESO</b>
            </Link>
          </Grid>
          <Grid container  item xs={6}>
          <Link to="Registra" className="btn btn-sm btn-primary ">
            <b>REGISTRO</b>
          </Link>
          </Grid>
          <Box marginTop={4}>
            <Switch>
              <Route path="/Registra">
               <Registra/>
              </Route>
              <Route path="/">
                <Iniciasesion />
              </Route>
            </Switch>
          </Box>
        </Grid>
      </Router>
    </div>
  );
};

export default Inicio;
