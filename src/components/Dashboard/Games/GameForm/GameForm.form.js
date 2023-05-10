import * as Yup from "yup";

export function initialValues(game) {

  return {
    title: game?.title || "",
    platform: game?.platform.data.id,
    price: game?.price || "",
    discount: game?.discount || "",
    summary: game?.summary || "",
    video: game?.video || "",
    cover: game?.cover || "",
    releaseDate:game?.releaseDate || "",
   
  };
}
const msjError='El campo es requerido';
export function validationSchema() {
  return Yup.object({
    title: Yup.string()
      .required(msjError)
      .matches(/^[a-zA-Z0-9\s]+$/, 'Solo se permiten letras y numeros'),
    platform: Yup.number(),
    price: Yup.number().required(msjError),
    discount: Yup.number()
    .max(100,"Debe ser un numero de 0 a 100"),
    summary: Yup.string().required(msjError),
    video: Yup.string().url().required(msjError),
    releaseDate: Yup.date().required(msjError),
  });
}