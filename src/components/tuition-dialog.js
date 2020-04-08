import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions } from "@material-ui/core";
import React from 'react';

export const TuitionDialog = ({ tuitioninfo, schoolName, handleClose, open}) => {
    
return (<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
<DialogTitle id="customized-dialog-title" onClose={handleClose}>
  {schoolName} Tuition Info
</DialogTitle>
<DialogContent dividers>
  { tuitioninfo.map( msg => {
    return (<Typography>
          {msg}
      </Typography>)
  })}
</DialogContent>
<DialogActions>
  <Button autoFocus onClick={handleClose} color="primary">
    Close
  </Button>
</DialogActions>
</Dialog>)
}