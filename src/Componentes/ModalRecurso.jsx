import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";

export default function FormDialog(props) {

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    console.log(open)
  };
  

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agrega un recurso</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Los recursos generalmente son enlaces onedrive, googledrive entre
            otros.
          </DialogContentText>
          <form onSubmit={props.agregarecurso}>
            <TextField
              autoFocus
              name="recurso"
              margin="dense"
              label="Direccion del recurso..."
              type="text"
              onChange={props.handleRecurso}
              fullWidth
            />
            <Button type="submit" className="mt-2" color="default">
              Agregar recurso
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose()} color="default">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
       <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={props.addrecurso}
        autoHideDuration={2500}
        onClose={handleClose}
        message="Cuando vuelvas a cargar veras el recurso"
      />
    </div>
  );
}
