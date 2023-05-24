import * as Yup from "yup"; //reglas validación

export function initialValues() {
  return {
    email: "",
    username: "",
    name: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email(true).required(true),
    username: Yup.string().matches(/^[A-Za-z\s]+$/, 'Solo se permiten letras y espacios').required(true),
    name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Solo se permiten letras y espacios').required(true),
    password: Yup.string().required(true),
  });
}
