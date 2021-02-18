import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Box } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Button from "@material-ui/core/Button";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import FormAgregarSubTa from "./FormAgregarSubTa";
import { useFirebaseApp, useFirestore } from "reactfire";
import "firebase/firestore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import WarningIcon from "@material-ui/icons/Warning";
import VisibilityIcon from "@material-ui/icons/Visibility";
import RestoreIcon from "@material-ui/icons/Restore";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Alert } from "@material-ui/lab/";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ModalRecurso from './ModalRecurso'


const Tarea = (props) => {


  const [addtarea, setaddtarea] = useState(false);
  const abriraddtarea = () => {
    setaddtarea(true);
  };
  const cerraraddtarea = () => {
    setaddtarea(false);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [recurso,setrecurso]=useState({recurso:""})
  const handleRecurso=(event)=>{
    setrecurso({
      ...recurso,[event.target.name]:event.target.value
    })
  }

  const [addrecurso,setaddrecurso]=useState(false)
  const abriraddrecurso=()=>{
    setaddrecurso(true)
  }

  const agregarecurso=(event)=>{
    event.preventDefault()
    event.target.reset()
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(
        user.email +
          "/" +
          props.padre.id +
          "/tareas/"
      )
        .doc(props.items.id)
        .update({
        recurso:recurso.recurso
        })
        .then(function () {
          abriraddrecurso()
          console.log("Recurso actualizado");
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    });
  }


  const valorinicial = { subtarea: "" };
  const [subtarea, setsubtarea] = useState(valorinicial);
  const handleInputChange = (event) => {
    setsubtarea({
      ...subtarea,
      [event.target.name]: event.target.value,
    });
  };

  const firebase = useFirebaseApp();
  const db = useFirestore();
  const onSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(
        user.email +
          "/" +
          props.padre.id +
          "/tareas/" +
          props.items.id +
          "/subtareas"
      )
        .add({
          subtarea: subtarea.subtarea,
          estado: "pendiente",
          encargado: "nadie",
        })
        .then(function (docRef) {
          console.log("Documento subido");
        })
        .catch(function (error) {
          console.log("ocurrio un error");
        });
    });
  };
  const [subtareas, setsubtareas] = useState([]);
  const [usuarioactual, setusuarioactual] = useState([]);
  const mostrardatos = () => {
    firebase.auth().onAuthStateChanged((user) => {
      setusuarioactual(user.email);
      db.collection(
        user.email +
          "/" +
          props.padre.id +
          "/tareas/" +
          props.items.id +
          "/subtareas"
      ).onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setsubtareas(docs);
      });
    });
  };
  useEffect(() => {
    mostrardatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iniciarprocedimiento = (id) => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(
        user.email +
          "/" +
          props.padre.id +
          "/tareas/" +
          props.items.id +
          "/subtareas"
      )
        .doc(id)
        .update({
          estado: "procesando",
          encargado: user.email,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    });
  };
  const terminarprocedimiento = (id) => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(
        user.email +
          "/" +
          props.padre.id +
          "/tareas/" +
          props.items.id +
          "/subtareas"
      )
        .doc(id)
        .update({
          estado: "completo",
          encargado: user.email,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.log("Error updating document: ");
        });
    });
  };
  const procedimiento = (item) => {
    switch (item.estado) {
      case "pendiente":
        return (
          <ListItem button>
            <ListItemIcon>
              <WarningIcon></WarningIcon>
            </ListItemIcon>
            <ListItemText
              primary={item.subtarea}
              secondary={item.estado}
            ></ListItemText>
            <Tooltip title="Encargarme del procedimiento">
              <IconButton
                aria-label="Encargarme de esta tarea"
                onClick={() => iniciarprocedimiento(item.id)}
              >
                <VisibilityIcon></VisibilityIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar procedimiento">
              <IconButton
                aria-label="Eliminar procedimiento"
                onClick={() => eliminarrprocedimiento(item.id)}
                size="small"
                color="secondary"
              >
                <DeleteForeverIcon fontSize="small"></DeleteForeverIcon>
              </IconButton>
            </Tooltip>
          </ListItem>
        );
      case "procesando":
        return (
          <ListItem button>
            <ListItemIcon>
              <RestoreIcon></RestoreIcon>
            </ListItemIcon>
            <ListItemText
              primary={item.subtarea}
              secondary={"procesando por " + item.encargado}
            ></ListItemText>
            {item.encargado === usuarioactual ? (
              <Tooltip title="Marcar como terminado">
                <IconButton
                  aria-label="proceso terminado"
                  onClick={() => terminarprocedimiento(item.id)}
                >
                  <DoneAllIcon></DoneAllIcon>
                </IconButton>
              </Tooltip>
            ) : (
              <span></span>
            )}
            <Tooltip title="Eliminar procedimiento">
              <IconButton
                aria-label="Eliminar procedimiento"
                onClick={() => eliminarrprocedimiento(item.id)}
                size="small"
                color="secondary"
              >
                <DeleteForeverIcon fontSize="small"></DeleteForeverIcon>
              </IconButton>
            </Tooltip>
          </ListItem>
        );
      case "completo":
        return (
          <ListItem button>
            <ListItemIcon>
              <CheckBoxIcon></CheckBoxIcon>
            </ListItemIcon>
            <ListItemText
              primary={item.subtarea}
              secondary={"Completado por " + item.encargado}
            ></ListItemText>
            <IconButton aria-label="proceso terminado">
              <CheckBoxIcon></CheckBoxIcon>
            </IconButton>
            <Tooltip title="Eliminar procedimiento">
              <IconButton
                aria-label="Eliminar procedimiento"
                onClick={() => eliminarrprocedimiento(item.id)}
                size="small"
                color="secondary"
              >
                <DeleteForeverIcon fontSize="small"></DeleteForeverIcon>
              </IconButton>
            </Tooltip>
          </ListItem>
        );
      default:
        return <p></p>;
        break;
    }
  };
  const eliminarrprocedimiento = (id) => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(
        user.email +
          "/" +
          props.padre.id +
          "/tareas/" +
          props.items.id +
          "/subtareas"
      )
        .doc(id)
        .delete()
        .then(function () {
          console.log("Document delete");
        })
        .catch(function (error) {
          console.log("Error updating document: ");
        });
    });
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="default"
            startIcon={<PeopleOutlineIcon />}
            onClick={() => props.vergrupo(props.padre)}
          >
            {props.padre.grupo}
          </Button>
        </Grid>
        {props.items.recurso.length !== 0 ? (
          <Grid container justify="flex-start" item xs={12} sm={12}>
            <a
              className="btn btn-sm btn-primary"
              href={props.items.recurso}
              target="_black"
            >
              Recurso
            </a>
          </Grid>
        ) : (
            <Grid container justify="flex-start" item xs={12} sm={12}>
              <Button
                variant="outlined"
                className="bg-success text-white"
                size="small"
                color="default"
                onClick={()=>handleClickOpen()}
              >
                Agregar recurso
              </Button>
            </Grid>
        )}

        <Grid container justify="flex-start" item xs={6}>
          <p>
            <b>{props.items.tarea}</b>
          </p>
        </Grid>
        <Grid container justify="flex-end" item xs={6}>
          <Tooltip title="Agregar un procedimiento de tarea">
            <IconButton
              aria-label="Agregar un procedimiento de tarea"
              color="primary"
              onClick={() => abriraddtarea()}
            >
              <PlaylistAddIcon></PlaylistAddIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {addtarea ? (
        <FormAgregarSubTa
          cerraraddtarea={cerraraddtarea}
          handleInputChange={handleInputChange}
          onSubmit={onSubmit}
        />
      ) : (
        <p></p>
      )}
      {subtareas.length !== 0 ? (
        <div>
          <List>
            {subtareas.map((item, index) => (
              <div key={index}>{procedimiento(item)}</div>
            ))}
          </List>
        </div>
      ) : (
        <Box marginTop={2}>
          <Alert severity="warning">
            No hay procedimientos en esta actividad<strong></strong>
          </Alert>
        </Box>
      )}
        <ModalRecurso
        handleRecurso={handleRecurso}
        agregarecurso={agregarecurso}
        open={open}
        handleClose={handleClose}
        addrecurso={addrecurso}
      ></ModalRecurso>

    </div>
  );
};

export default Tarea;
