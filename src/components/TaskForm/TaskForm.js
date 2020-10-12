import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { saveTaskRequest, updateTaskRequest } from "./../../app/tasksSlice";
import TextFieldInput from './../TextFieldInput/TextFieldInput';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 60,
  },
}));

const schema = yup.object().shape({
  title: yup.string().required('Title is a required field'),
  description: yup.string().required('Description is a required field'),
});

const TaskForm = ({ idTaskEdited, titleEdited, descriptionEdited }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, reset, setValue } = useForm({
      resolver: yupResolver(schema)
    });
    
    if (idTaskEdited) {
        setValue('title', titleEdited)
        setValue('description', descriptionEdited)
    };

  const onSubmit = (data) => {
    if (idTaskEdited) {
      data['id'] = idTaskEdited; //neste ponto está sendo injetado o ID no data do UseForm
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
