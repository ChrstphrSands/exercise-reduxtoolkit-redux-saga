import * as yup from "yup";

export const schema = yup.object().shape({
    title: yup.string().required('Title is a required field'),
    description: yup.string().required('Description is a required field'),
  });
  
  export default schema;