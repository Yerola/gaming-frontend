import * as Yup from "yup";

export function initialValues(game) {

  return {
    title: game?.title || "",
    platform: game?.platform.data.id || 1,
    price: game?.price || "",
    discount: game?.discount || "",
    summary: game?.summary || "",
    video: game?.video || "",
    cover: game?.cover || "",
    wallpaper: game?.wallpaper || "",
    screenshots: game?.screenshots || "",
    releaseDate: game?.releaseDate || "",
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required(true),
    platform: Yup.number().required(true),
    price: Yup.number().required(true),
    discount: Yup.number().required(false),
    summary: Yup.string().required(true),
    video: Yup.string().url().required(true),
    cover: Yup.mixed().required(true),
    wallpaper: Yup.mixed().required(true),
    screenshots: Yup.mixed().required(true),
    releaseDate: Yup.date().required(true),
  });
}
