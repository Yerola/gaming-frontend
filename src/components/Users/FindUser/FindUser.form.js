import * as Yup from "yup";

export function initialValues() {
 
  return {
    identifier: "",
  };
}

export function validationSchema() {
  return Yup.object({
    identifier: Yup.string().required(true),
  });
}