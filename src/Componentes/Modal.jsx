import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from '@material-ui/core/Snackbar';

export default function FormDialog(props) {
  const copiar = () => {
    document.execCommand("selectAll");
    document.execCommand("copy");
    handleClick()
  };
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Comparte este grupo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Compartele a tus miembros de equipo esta direccion para que se
            integren.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Direccion del grupo"
            type="email"
            value={props.direccion}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Tooltip title="copiar">
            <IconButton
              onClick={() => copiar()}
              color="default"
              aria-label="copiar"
            >
              <FileCopyIcon></FileCopyIcon>
            </IconButton>
          </Tooltip>
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
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message="Direccion copiada en el portapapeles "
      />
    </div>
  );
}
