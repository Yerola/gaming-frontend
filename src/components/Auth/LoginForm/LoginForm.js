import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Auth } from "@/api";
import { useAuth } from "@/hooks"; //con este hook sacamos info del contexto
import { initialValues, validationSchema } from "./LoginForm.form";

const auth = new Auth();

export function LoginForm() {

  const router = useRouter();
  const {login} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const response = await auth.login(formValues);
        login(response.jwt)
        router.push("/");
        //console.log(response);
        // console.log("usuario loggeado");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electrónico o usuario"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      {/**asi pq la clave que requiere strapi es "identifier"*/}
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.pasword}
      />
      <Form.Button type="submit" fluid loadding={formik.isSubmitting}>
        Entrar
      </Form.Button>
    </Form>
  );
  
}
