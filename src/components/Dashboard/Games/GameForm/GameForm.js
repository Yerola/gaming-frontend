import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Game, Platform as PlatformCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./GameForm.form";
import { useState, useEffect } from "react";

const gameCtrl = new Game();
const platformCtrl = new PlatformCtrl()

export function GameForm(props) {
  const { onClose, onReload, gameId, game } = props;
  const [platforms, setPlatforms] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await platformCtrl.getAll();
        setPlatforms(res.data)
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);




  const [platform, setPlatform] = useState("")
  const formik = useFormik({
    initialValues: initialValues(game),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const formValues = { ...formValue, slug: formValue.title.replace(" ", "-"), platform }
      try {
        if (gameId) {
         let resCover=  await gameCtrl.uploadFile(formValues.cover)
          //await gameCtrl.update(formValues, gameId);
          console.log(formValues)
          console.log(resCover)
          console.log(res)
        } else {
          console.log(formValues)
          //await gameCtrl.create(formValues, platform);
        }

        formik.handleReset();
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (!platforms) return null

  return (<>
    <Form onSubmit={formik.handleSubmit}>

      <Form.Group widths="equal">
        <Form.Input
          name="title"
          placeholder="Titulo del Juego"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />

        <Form.Input id={"platform"} list='platformslist' placeholder={game?.platform.data.attributes.title}
          name="platforms"
          onChange={() => setPlatform(document.getElementById('platform').value)}
          error={formik.errors.platform}

        />
        <datalist id='platformslist'>
          <option value={platforms[0].id} >{platforms[0].attributes.title}</option>
          <option value={platforms[1].id} >{platforms[1].attributes.title}</option>
          <option value={platforms[2].id} >{platforms[2].attributes.title}</option>
          <option value={platforms[3].id} >{platforms[3].attributes.title}</option>
        </datalist>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="price"
          placeholder="Precio"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
        <Form.Input
          name="discount"
          placeholder="Descuento"
          value={formik.values.discount}
          onChange={formik.handleChange}
          error={formik.errors.discount}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="summary"
          placeholder="Descripcion"
          value={formik.values.summary}
          onChange={formik.handleChange}
          error={formik.errors.summary}
        />

        <Form.Input
          id={"cover"}
          name="cover"
          label="Cover"
          placeholder="Cover"
          value={formik.values.cover}
          onChange={formik.handleChange}
          error={formik.errors.cover}
          type="file"
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="video"
          placeholder="url youtube"
          value={formik.values.video}
          onChange={formik.handleChange}
          error={formik.errors.video}
        />

        <Form.Input
          name="wallpaper"
          label="Wallpaper"
          placeholder="wallpaper"
          value={formik.values.wallpaper}
          onChange={formik.handleChange}
          error={formik.errors.wallpaper}
          type="file"
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="releaseDate"
          placeholder="Fecha de lanzamiento"
          value={formik.values.releaseDate}
          onChange={formik.handleChange}
          error={formik.errors.releaseDate}
          type="date"
        />

        <Form.Input
          name="screenshots"
          label="Screenshots"
          placeholder="screenshots"
          value={formik.values.screenshots}
          onChange={formik.handleChange}
          error={formik.errors.screenshots}
          type="file"
          multiple
        />
      </Form.Group>
      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  </>);
}
