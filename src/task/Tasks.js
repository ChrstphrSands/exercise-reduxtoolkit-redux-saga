import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getTasksRequest } from "./tasksSlice";
import TasksContainer from './components/TasksContainer/TasksContainer';

const Tasks = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasksRequest())
  }, [dispatch])
  
  return (
    <TasksContainer/>
  );
}

export default Tasks;
