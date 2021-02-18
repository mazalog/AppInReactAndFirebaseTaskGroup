import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { makeStyles,Box } from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FormAgregarGrupo from "./FormAgregarGrupo";
import VerGruposdos from "./VerGruposdos";
import { useFirebaseApp } from "reactfire";
import {Alert,AlertTitle} from '@material-ui/lab/'

const ListaGrupos = (props) => {
  const style = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "100%",
      },
    },
  }));
  const classes = style();

  const [addgrupo, setaddgrupo] = useState(false);
  const abriraddgrupo = () => {
    setaddgrupo(true);
  };
  const cerraraddgrupo = () => {
    setaddgrupo(false);
  };

  const grupoinicial = { grupo: "" };
  const [grupo, setgrupo] = useState(grupoinicial);
  const handleInputChange = (event) => {
    setgrupo({
      ...grupo,
      [event.target.name]: event.target.value,
    });
  };

  const firebase = useFirebaseApp();
  const onSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    firebase.auth().onAuthStateChanged((user) => {
      props.db
        .collection(user.email)
        .add({
          grupo: grupo.grupo,
        })
        .then(function (docRef) {
         console.log('Grupo Agregado')
         agregarmiembrodegrupo(docRef.id)
         agregargrupo(docRef.id)
        })
        .catch(function (error) {
          console.log('Error al crear Grupo.');
        });
    });
  };

  const agregargrupo=(id)=>{
    firebase.auth().onAuthStateChanged((user) => {
      props.db
        .collection("grupos")
        .add({
          direccion:user.email+"/"+id
        })
        .then(function (docRef) {
         console.log('Grupo General Agregado')
        })
        .catch(function (error) {
          console.log('Error en agregar grupo');
        });
    });
  }

  const agregarmiembrodegrupo=(id)=>{
    firebase.auth().onAuthStateChanged((user) => {
      props.db
        .collection(user.email+"/"+id+"/miembros")
        .add({
          miembro:user.email
        })
        .then(function (docRef) {
         console.log('Miembro Agregado')
        })
        .catch(function (error) {
          console.log('Error al crear Grupo.');
        });
    });
  }

  const [grupos, setgrupos] = useState([]);
  const [direccion, setdireccion] = useState([]);
  const [usuario, setusuario] = useState([]);

  const mostrargrupos = () => {
    firebase.auth().onAuthStateChanged((user) => {
      props.db.collection(user.email).onSnapshot((querySnapshot) => {
        const docs = [];
        const usu = user.email;
        setdireccion(user.email);
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setgrupos(docs);
        setusuario(usu);
      });
    });
  };

  useEffect(() => {
    mostrargrupos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eliminargrupo = (id) => {
    props.db
      .collection(usuario)
      .doc(id)
      .delete()
      .then(function () {
        console.log("Grupo eliminado");
      })
      .catch(function (error) {
        console.log("");
      });
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid container justify="flex-start" item xs={6}>
          <p>
            <b>Grupos</b>
          </p>
        </Grid>
        <Grid container justify="flex-end" item xs={6}>
          <Tooltip title="Agregar nuevo grupo">
            <IconButton
              aria-label="Agregar nuevo grupo"
              onClick={() => abriraddgrupo()}
              color="primary"
            >
              <PlaylistAddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {addgrupo ? (
        <div className="mt-2 mb-2">
          <FormAgregarGrupo
            cerraraddgrupo={cerraraddgrupo}
            classes={classes}
            handleInputChange={handleInputChange}
            onSubmit={onSubmit}
          ></FormAgregarGrupo>
        </div>
      ) : (
        <p></p>
      )}
      {grupos.length !== 0 ? (
        <VerGruposdos
          eliminargrupo={eliminargrupo}
          direccion={direccion}
          grupos={grupos}
          vergrupo={props.vergrupo}
        ></VerGruposdos>
      ) : (
        <Box
        marginTop={2}
        >
        <Alert severity="warning">
          <AlertTitle>Oye</AlertTitle>
          Aun no creas un grupo.<strong></strong>
        </Alert>
        </Box>
      )}
    </div>
  );
};

export default ListaGrupos;
