import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Tooltip,
} from '@material-ui/core';
import { DeleteOutlineOutlined, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { deleteTaskRequest } from "./../../app/tasksSlice";
import Loading from './../Loading/Loading';
import TaskForm from './../TaskForm/TaskForm';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const TasksContainer = ({ tasks, loading }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [idTask, setIdTask] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setIdTask(task.id);   
  };
  
  return (
    <Container component="main">
      <TaskForm 
        idTaskEdited={idTask}
        titleEdited={title}
        descriptionEdited={description} 
      />
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
      <Loading loading={loading}/>
    </Container>
  );
};

export default TasksContainer;
