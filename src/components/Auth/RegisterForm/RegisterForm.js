import { Form } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { Auth } from "@/api";
import { initialValues, validationSchema } from "./RegisterForm.form";

const auth = new Auth();

export function RegisterForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(), //inicializa
    validationSchema: validationSchema(), //toma las reglas de validacion
    validateOnChange: false, //asi el formulario no esta validando cada vez que cambia
    //un valor sino solo cuando se envia
    onSubmit: async (formValues) => {
      try {
        await auth.register(formValues);
        router.push("/join/sign-in");
        console.log("se envio formulario");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />

        <Form.Input
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          placeholder="Nombre y apellidos"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />

        <Form.Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Registrarse
      </Form.Button>
    </Form>
  );
  
}
