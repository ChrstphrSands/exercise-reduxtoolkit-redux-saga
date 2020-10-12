import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasksRequest } from "./tasksSlice";
import TasksContainer from './../components/TasksContainer/TasksContainer';

const Tasks = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasksRequest())
  }, [dispatch])

  const { tasks, loading } = useSelector(state => state.tasks);  
  
  return (
    <TasksContainer 
      tasks={tasks}
      loading={loading}
    />
  );
}

export default Tasks;
