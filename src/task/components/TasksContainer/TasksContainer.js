import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { useSelector } from "react-redux";
import Loading from './../../../components/Loading/Loading';
import TaskForm from '../TaskForm/TaskForm';
import TasksList from '../TasksList/TasksList';

const TasksContainer = () => {
    
  const { tasks, loading, task } = useSelector(state => state.tasks);     
  
  return (
    <Container component="main">
      <TaskForm task={task}/>
      <Grid>
        <TasksList tasks={tasks}/>
      </Grid>
      <Loading loading={loading}/>
    </Container>
  );
};

export default TasksContainer;
