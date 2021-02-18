import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import Modal from "./Modal";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function VerGrupos(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [direccion, setdireccion] = useState([]);
  const handleClickOpen = (co, id) => {
    const di = co + "/" + id;
    setdireccion(di);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {props.grupos.map((item, index) => (
          <div key={index}>
            {item.grupo==="23192042"?(
             <p></p>
            ):(
              <ListItem button>
              <ListItemText
                onClick={() => props.vergrupo(item)}
                primary={item.grupo}
              />
              <ListItemIcon>
                <Tooltip title="Compartir grupo">
                  <IconButton
                    aria-label="Compartir grupo"
                    size="small"
                    onClick={() => handleClickOpen(props.direccion, item.id)}
                  >
                    <ShareIcon fontSize="small"></ShareIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar grupo">
                  <IconButton
                    aria-label="Eliminar Grupo"
                    color="secondary"
                    size="small"
                    onClick={() => props.eliminargrupo(item.id)}
                  >
                    <DeleteIcon fontSize="small"></DeleteIcon>
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
            </ListItem>
            )}

          </div>
        ))}
      </List>
      <Modal
        direccion={direccion}
        open={open}
        handleClose={handleClose}
      ></Modal>
    </div>
  );
}
