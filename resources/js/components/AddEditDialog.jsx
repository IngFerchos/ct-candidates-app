import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Alert, AlertTitle, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

//import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from '../../hooks/useForm';
import Axios from '../../config/axios';


function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function AddEditDialog({ open, setOpen, dataUsers, option, currentUser, setRows, currentTask, setRecharge, page, setPage}) {
    //const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState(option.current===1 ? '':currentTask.current?.userassignedId);
    const { formData , onChange } = useForm({
        title:option.current===1 ? '':currentTask.current?.title,
        order:option.current===1 ? '':currentTask.current?.order,
    });
    const { title , order } = formData;
    const [enabledErrors, setEnabledErrors] = React.useState(false);

    /*const [newTask, setNewtask] = React.useState({
        title:'',
        order:'',
        usercreate:0,
        userassigned:0,
        completed:0
    });*/

    const handleChange = (event) => {
        setUser(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async() => {
        if (title==='' || order==='' || user===0 || user==='') {
            setEnabledErrors(true);
            return;
        }
        const newTask={
            id:option.current===1 ? '':currentTask.current?.id,
            title:title,
            order:order,
            usercreate:currentUser.Id,
            userassigned:user,
            completed:0
        }
        console.log(newTask)
        if (option.current===1){
            await Axios.post("tasks",newTask).then(response=>{
                console.log(response);
                let NId=response.data.split('-')[1];
                setRows( previousRows => ([...previousRows, {...newTask, id:NId, usercreateId:newTask.usercreate,userassignedId:newTask.userassigned, usercreate:currentUser.Name, userassigned:dataUsers.current?.find(y=>y.id===newTask.userassigned)?.name }]));
                setTimeout(() => {setRecharge(state=>!state);}, 100);
            });
        }else{
            await Axios.put("tasks/"+currentTask.current.id,newTask).then(response=>{
                console.log(response);     
                setPage(-1);
                setTimeout(() => {setPage(page);}, 100);
                setRows( previousRows => ( [...previousRows.filter(x=>x.id.toString() !== currentTask.current.id.toString()), {...newTask,usercreateId:newTask.usercreate,userassignedId:newTask.userassigned, usercreate:currentUser.Name, userassigned:dataUsers.current?.find(y=>y.id===newTask.userassigned)?.name }].sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)  ));
            });
        }
        setOpen(false);
    };


    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open draggable dialog
      </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <div className="card text-center">
                <div className="card-header"><h4>{option.current===1 ? 'Add New Task':'Editing Task'} </h4></div>
                </div>
                    
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ width:'25vw' }}>
                    
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <TextField 
                        error={enabledErrors && title===''}
                        helperText={enabledErrors && title==='' ? "Title is required.":''}
                        value={title} name="title" onChange={onChange} style={{ width:'100%' }} id="outlined-basic" label="Title" variant="outlined" 
                        />
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <div style={{ height:'120px' }}>
                        <TextField
                            error={enabledErrors && order===''}
                            helperText={enabledErrors && order==='' ? "Order is required.":''}
                            value={order} name="order" onChange={onChange}
                            style={{ width:'100%', height:'100%' }}
                            id="outlined-multiline-flexible"
                            label="Order Description"
                            multiline
                            maxRows={4}
                        />
                        </div>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <InputLabel id="demo-simple-select-label">Assign to user</InputLabel>
                        
                        <Select
                            error={enabledErrors && (user===0 || user==='')}
                            helperText={ (enabledErrors && (user===0 || user==='')) ? "You must assign the task":''}
                            style={{ width:'100%' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={user}
                            label="User"
                            onChange={handleChange}
                        >
                            {dataUsers.current.map( x => {
                               return <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>
                            })}                            
                        </Select>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        {enabledErrors && (title==='' || order==='' || user===0 || user==='') &&
                        <Alert severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            Please fill out all required fields.
                        </Alert>
                        }
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>{option.current===1 ? 'Save':'Update'}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}