/* import { Form } from "semantic-ui-react";
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
  const [files, setFiles] = useState({  })
  const [imageError, setImageError] = useState(null)
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

  async function handeFiles(e){
   let inputfiles= e.target.files
   let field= e.target.name
   setFiles({...files,[field]:inputfiles}) 
  }



  const [platform, setPlatform] = useState("")
  const formik = useFormik({
    initialValues: initialValues(game),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const formValues = { ...formValue, slug: formValue.title.replace(/ /g, "-"), platform }
      try {

        let filesEntries = Object.entries(files)
        
        if (gameId) {//modifica un juego
          
          await gameCtrl.update(formValues, gameId);
          
        } else {//crea un juego nuevo
          if(filesEntries.length !==3){ 
            setImageError(true)
             throw new Error('Debe cargar las imagenes')
          }
            let newGame = await gameCtrl.create(formValues);
            if(newGame.data.id)filesEntries.forEach(async entrie =>await gameCtrl.uploadFile(entrie[1],newGame.data.id,entrie[0]))
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
          accept="image/*"
          onChange={handeFiles}
          error={imageError}
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
          onChange={handeFiles}
          error={imageError}
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
          onChange={handeFiles}
          error={imageError}
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
 */

import { Form,TextArea } from "semantic-ui-react";
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
  const [files, setFiles] = useState({  })
  const [imageError, setImageError] = useState(null)
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

  const [imageUrls, setImageUrls] = useState({
    cover: null,
    wallpaper: null,
    screenshots: []
  });

  async function handeFiles(e){
   let inputfiles= e.target.files;
   let field= e.target.name;
   setFiles({...files,[field]:inputfiles});

   //lo que aporto
     // Use the FileReader API to convert the image files to URLs
  let fileUrls = [];
  for (let i = 0; i < inputfiles.length; i++) {
    let file = inputfiles[i];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      fileUrls.push(reader.result);
      if (i === inputfiles.length - 1) {
        
        setImageUrls({ ...imageUrls, [field]: fileUrls });
      }
    };
  }
   //
  }


  const [platform, setPlatform] = useState("")
  const formik = useFormik({
    initialValues: initialValues(game),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const formValues = { ...formValue, slug: formValue.title.replace(/ /g, "-"), platform }
      try {

        let filesEntries = Object.entries(files)
        
        if (gameId) {//modifica un juego
          
          await gameCtrl.update(formValues, gameId);
          
        } else {//crea un juego nuevo
          if(filesEntries.length !==3){ 
            setImageError(true)
             throw new Error('Debe cargar las imagenes')
          }
            let newGame = await gameCtrl.create(formValues);
            if(newGame.data.id)filesEntries.forEach(async entrie =>await gameCtrl.uploadFile(entrie[1],newGame.data.id,entrie[0]))
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
          label="Título"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />

        <Form.Input id={"platform"} list='platformslist' placeholder={game?game.platform.data.attributes.title:"Platform"}
          name="platforms"
          label="Plataforma"
          onChange={() => setPlatform(document.getElementById('platform').value)}
          error={formik.errors.platform}
          autoComplete="off"

        />
        <datalist id='platformslist'>
          <option value={platforms[0].id} >{platforms[0].attributes.title}</option>
          <option value={platforms[1].id} >{platforms[1].attributes.title}</option>
          <option value={platforms[2].id} >{platforms[2].attributes.title}</option>
          <option value={platforms[3].id} >{platforms[3].attributes.title}</option>
        </datalist>
      </Form.Group>
      <br/>
      <Form.Group widths="equal">
        <Form.Input
          name="price"
          type="number"
          placeholder="Precio"
          label="Precio"
          autoComplete="off"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
        <Form.Input
          name="discount"
          type="number"
          placeholder="Descuento"
          label="Descuento"
          autoComplete="off"
          value={formik.values.discount}
          onChange={formik.handleChange}
          error={formik.errors.discount}
        />
          <Form.Input
          name="releaseDate"
          placeholder="Fecha de lanzamiento"
          label="Fecha de lanzamiento"
          value={formik.values.releaseDate}
          onChange={formik.handleChange}
          error={formik.errors.releaseDate}
          type="date"
        />
      </Form.Group>
      <br/>
      <Form.Input
          name="summary"
          control={TextArea}
          placeholder="Descripción"
          label="Descripción"
          value={formik.values.summary}
          onChange={formik.handleChange}
          error={formik.errors.summary}
        />

        <br/>
        <Form.Input
          name="video"
          placeholder="url youtube"
          label="url youtube"
          autoComplete="off"
          value={formik.values.video}
          onChange={formik.handleChange}
          error={formik.errors.video}
        />
        
      <Form.Group widths="equal">
      </Form.Group>
      <Form.Group widths="equal">
      <Form.Input
          name="cover"
          label="Cover"
          placeholder="Cover"
          accept="image/*"
          onChange={handeFiles}
          error={imageError}
          type="file"
        /> 
        {imageUrls.cover && <img src={imageUrls.cover} alt="Cover" width="200px"/>}
      </Form.Group>
      <br/>
      <Form.Group widths="equal">
        <Form.Input
          name="wallpaper"
          label="Wallpaper"
          placeholder="wallpaper"
          onChange={handeFiles}
          error={imageError}
          type="file"
        /> 
        {imageUrls.wallpaper && <img src={imageUrls.wallpaper} alt="Wallpaper" width="250px"/>}
      </Form.Group>
      <br/>
      <Form.Group widths="equal">
 
        <Form.Input
          name="screenshots"
          label="Screenshots"
          placeholder="screenshots"
          onChange={handeFiles}
          error={imageError}
          type="file"
          multiple
        /> 
      </Form.Group>

      {imageUrls.screenshots && (
    <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
      {console.log(imageUrls.screenshots)}
      {Object.values(imageUrls.screenshots).map((file, index) => (
        <img key={index} src={file} alt={`screenshot-${index}`} style={{objectFit:"contain",width:"250px",margin:"10px"}} />
      ))}
    </div>
  )}
      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  </>);
}