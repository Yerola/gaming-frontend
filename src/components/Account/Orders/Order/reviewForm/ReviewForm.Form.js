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
      .max(600, "El campo no puede tener más de 600 caracteres")
        .required("Campo obligatorio"),
    rating: Yup.string().required("Por favor, selecciona una puntuación."),
    });
  }
