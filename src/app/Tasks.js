import React, { useEffect, useState } from 'react';

import { 
  Container, 
  Grid, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Tooltip,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { DeleteOutlineOutlined, Edit } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { getTasksRequest, deleteTaskRequest, saveTaskRequest, updateTaskRequest } from "./tasksSlice";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    minWidth: 650,
  },
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 60,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const schema = yup.object().shape({
  title: yup.string().required('Title is a required field'),
  description: yup.string().required('Description is a required field'),
});

function Tasks() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [idTask, setIdTask] = useState();

  const { register, handleSubmit, errors, reset, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    if (idTask) {
      data['id'] = idTask; //neste ponto está sendo injetado no data do UseForm o id
      dispatch(updateTaskRequest(data));
      setIdTask('');
    } else {
      dispatch(saveTaskRequest(data));
    }
    reset();
  };

  useEffect(() => {
    dispatch(getTasksRequest())
  }, [dispatch])


  const { tasks, loading } = useSelector(state => state.tasks)  

  const handleEdit = (task) => {
    setValue("title", task.title);
    setValue("description", task.description);
    setIdTask(task.id);    
  }

  return (
    <Container component="main">
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          required
          id="title"
          label="Title"
          name="title"
          size="small"
          inputRef={register}
          defaultValue=""
          error={!!errors?.title}
          helperText={errors.title?.message}
          InputLabelProps={{shrink:true}}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          required
          id="description"
          label="Description"
          name="description"
          size="small" 
          defaultValue=""
          multiline            
          rows={4}
          inputRef={register}
          error={!!errors?.description}
          helperText={errors.description?.message}
          InputLabelProps={{shrink:true}}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
      </form>
      <Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell component="th" scope="row">{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell align="right">
                  <div className={classes.buttonActions}>
                    <Tooltip title="Delete" onClick={() => dispatch(deleteTaskRequest(task.id))}>
                      <DeleteOutlineOutlined />
                    </Tooltip>
                    <Tooltip title="Edit" onClick={() => handleEdit(task)}>
                      <Edit />
                    </Tooltip>
                  </div>
                </TableCell>               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default Tasks;
