import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Axios from '../../config/axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({ open, setOpen, page, setPage, currentTask, setRows }) {
  
  const handleClose = () => setOpen(false);
  
  const handleDelete = async () => {
    await Axios.delete("tasks/"+currentTask.current.id).then(response=>{
      console.log(response);
      setPage(-1);
      setTimeout(() => {setPage(page);}, 100);
      setRows( previousRows => ( [...previousRows.filter(x=>x.id.toString() !== currentTask.current.id.toString()) ].sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)  ));
    });
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="card text-center">
            <div className="card-header"><h4>{"Warning ?"} </h4></div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Are you sure to delete the Item ${currentTask.current?.title} ? changes cannot be reverted.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, cancel</Button>
          <Button style={{ color:'red' }} onClick={handleDelete}>Yes, Delete ■</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}