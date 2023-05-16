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
      .max(400, "El campo no puede tener más de 315 caracteres")
        .required("Campo obligatorio"),
    rating:Yup.number()
    .max(5,"debe ser un numero entre 1 a 5")
      .min(1,"debe ser un numero entre 1 a 5")
    .required("Campo obligatorio")
    });
  }
