import React from 'react';
import { TextField } from '@material-ui/core';
  
const TextFieldInput = ({ 
  register, 
  errors,
  name,
  multiline,
  rows,
  ...props
  }) => { const error = errors ? errors[name] : false;
  
  return (      
    <TextField
      {...props}
      fullWidth
      variant="outlined"
      margin="normal"
      required
      id={name}
      label={name}
      name={name}
      size="small"
      inputRef={register}
      defaultValue=""
      multiline={multiline}            
      rows={rows}
      error={error ? true : false}        
      helperText={error ? error.message : ''}        
      InputLabelProps={{shrink:true}}
    />
  );
};

export default TextFieldInput;
