import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import { useDispatch } from "react-redux";
import { saveTaskRequest, updateTaskRequest } from "../../tasksSlice";
import TextFieldInput from './../../../components/TextFieldInput/TextFieldInput';
import useStyles from './TaskForm.style.js';
import schema from './validate.js'

const TaskForm = ({ task }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
    
  const { register, handleSubmit, errors, reset , setValue} = useForm({
      resolver: yupResolver(schema)
    });
    
    useEffect(() => {
      if (task?.id) {
        setValue('title', task.title)
        setValue('description', task.description)
      };
    },[setValue, task]);
    
  const onSubmit = (data) => {
    if (task) {      
      data['id'] = task.id; //neste ponto está sendo injetado o ID no data do UseForm
      dispatch(updateTaskRequest(data));
      setValue('title', '')
      setValue('description', '')
    } else {
      dispatch(saveTaskRequest(data));
    }
    reset();
  };

  return (
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextFieldInput 
            register={register}
            errors={errors}
            name="title"
            multiline={false}
            rows={0}   
        />
        <TextFieldInput
            register={register}
            errors={errors}
            name="description"   
            multiline={true}
            rows={4}   
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
  );
};

export default TaskForm;
