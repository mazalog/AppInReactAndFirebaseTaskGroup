import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import "firebase/firestore";
import { useFirestore, useFirebaseApp } from "reactfire";
import { List, ListItem, ListItemText, Box } from "@material-ui/core";
import ExtensionIcon from "@material-ui/icons/Extension";
import FormAgregarCom from "./FormAgregarCom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Alert, AlertTitle } from "@material-ui/lab/";
import BackspaceIcon from "@material-ui/icons/Backspace";

const UnirmeGrupo = (props) => {
  const [addgrupo, setaaddgrupo] = useState(false);
  const abriraddgrupo = () => {
    setaaddgrupo(true);
  };
  const cerraraddgrupo = () => {
    setaaddgrupo(false);
  };

  const db = useFirestore();
  const firebase = useFirebaseApp();

  const [grupos, setgrupos] = useState([]);
  const [uniones, setuniones] = useState([]);
  const mostraruniones = () => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(user.email + "-grupocompartido").onSnapshot(
        (querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setuniones(docs);
        }
      );
    });
  };
  useEffect(() => {
    mostraruniones();
  }, []);

  const unioninicial = { grupo: "", direccion: "" };
  const [union, setunion] = useState(unioninicial);
  const handleInputChange = (event) => {
    setunion({
      ...union,
      [event.target.name]: event.target.value,
    });
  };

  const [unir, setunir] = useState(true);
  const verificarmiembros = () => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(union.direccion + "/miembros").onSnapshot(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().miembro === user.email) {
              console.log("Ya formas parte de este grupo.");
              setunir(false);
            }
          });
        }
      );
      if (unir === true) {
        unionagrupo();
      }
    });
  };

  const verificargrupo = () => {
    db.collection("grupos").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().direccion === union.direccion) {
          verificarmiembros();
        } else {
          console.log("No existe grupo");
        }
      });
    });
  };
  const unionagrupo = () => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(user.email + "-grupocompartido")
        .add({
          grupo: union.grupo,
          direccion: union.direccion,
        })
        .then(function () {
          agregarmiembro();
        })
        .catch(function () {
          console.log("Ups,Error");
        });
    });
  };
  const agregarmiembro = () => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(union.direccion + "/miembros")
        .add({
          miembro: user.email,
        })
        .then(function () {
          console.log("Documento subido");
        })
        .catch(function () {
          console.log("Ups,Error");
        });
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    verificargrupo();
  };

  const salirgrupo = (id, item) => {
    
    firebase.auth().onAuthStateChanged((user) => {
      db.collection(item.direccion + "/miembros").onSnapshot(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (user.email === doc.data().miembro) {
              db.collection(item.direccion + "/miembros")
                .doc(doc.id)
                .delete()
                .then(function () {
                  console.log("Documento eliminado");
                })
                .catch(function () {
                  console.log("Ups,error");
                });
            }
          });
        }
      );
    });

    firebase.auth().onAuthStateChanged((user) => {
      db.collection(user.email + "-grupocompartido")
        .doc(id)
        .delete()
        .then(function () {
          console.log("Documento eliminado");
        })
        .catch(function () {
          console.log("Ups,error");
        });
    });
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        endIcon={<ExtensionIcon />}
        onClick={() => abriraddgrupo()}
      >
        Unirme a un grupo
      </Button>

      {addgrupo ? (
        <div>
          <FormAgregarCom
            onSubmit={onSubmit}
            cerraraddgrupo={cerraraddgrupo}
            handleInputChange={handleInputChange}
          ></FormAgregarCom>
        </div>
      ) : (
        <p></p>
      )}

      <Box marginTop={3} marginBottom={3}>
        <h6>Grupos compartidos</h6>
      </Box>
      {uniones.length !== 0 ? (
        <div>
          {uniones.map((item, index) => (
            <ListItem key={index} button>
              <ListItemText
                primary={item.grupo}
                onClick={() => props.vergrupocompartido(item)}
              ></ListItemText>
              <Tooltip title="Salirme de este grupo">
                <IconButton
                  aria-label="Salirme del grupo"
                  color="secondary"
                  size="small"
                  onClick={() => salirgrupo(item.id, item)}
                >
                  <BackspaceIcon fontSize="small"></BackspaceIcon>
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </div>
      ) : (
        <Box marginTop={2}>
          <Alert severity="warning">
            <AlertTitle></AlertTitle>
            Aun no te unes a un grupo.<strong></strong>
          </Alert>
        </Box>
      )}
      <List></List>
    </div>
  );
};

export default UnirmeGrupo;
