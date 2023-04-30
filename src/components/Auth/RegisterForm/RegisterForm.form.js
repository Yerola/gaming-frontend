import * as Yup from "yup";

//yup se usa para formularios

export function initialValues() {
  return {
    //iniciando los valores de cada input
    email: "",
    username: "",
    name: "",
    password: "",
  };
}

export function validationSchema() {
  // reglas de validacion del formulario
  return Yup.object({
    email: Yup.string().email(true).required(true),
    //valor de tipo string,email y si da error devuelvo un true,
    //es obligatorio  y si da error devuelvo un true
    username: Yup.string().required(true),
    name: Yup.string().required(true),
    password: Yup.string().required(true),
  });
  
}
