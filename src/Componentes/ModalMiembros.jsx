import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { List,ListItem,ListItemText} from "@material-ui/core";

export default function FormDialog(props) {
  return (
    <div>
        {props.mostrarmiebros}
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Miembros</DialogTitle>
        <DialogContent>
             <List>
                 {
                     props.miembros.map( (item,index)=>
                     <ListItem key={index}>
                     <ListItemText primary={item.miembro}>
                     </ListItemText>
                 </ListItem>
                     )
                 }
             </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose()} color="default">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
