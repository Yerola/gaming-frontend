import * as Yup from "yup";

export function initialValues() {

  return {
    review:"",
    rating:""
  };
}

export function validationSchema() {
    return Yup.object({
    review: Yup.string()
        .required("Campo obligatorio"),
    rating:Yup.number()
    .max(5,"debe ser un numero entre 1 a 5")
    .required("Campo obligatorio")
    });
  }