import { Form } from "semantic-ui-react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Auth } from "@/api"; //hace el fetch para register y otro para login
import { useAuth } from "@/hooks"; //con este hook sacamos info del contexto
import { initialValues, validationSchema } from "./LoginForm.form"; //yup form validation

const authCtrl = new Auth(); //hace los fetch al server para login y register

export function LoginForm({ session }) {
  const router = useRouter();
  const { login } = useAuth(); //hace el login en la app, actualiza los states(token, user...)
  //useAuth()-custom hook que usa el AuthContext(que es el que tiene los states)

  useEffect(() => {
    if (session) {
      (async () => {
        const data = {
          name: session.user.name,
          email: session.user.email,
          username: session.user.email,
          image: session.user.image,
          password:
            session.user.email.split("").reverse().join("") +
            session.user.name.split(" ").join(""),
        };
        const dataLogin = {
          identifier: session.user.email,
          password:
            session.user.email.split("").reverse().join("") +
            session.user.name.split(" ").join(""),
        };

        try {
          const response = await authCtrl.login(dataLogin);
          console.log(response);
          if (response.error) {
            const res = await authCtrl.register(data);
            const response = await authCtrl.login(dataLogin);
            console.log(response);
            login(response.jwt);
            // router.push("/");
          }
          login(response.jwt);
         // router.push("/");
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [session]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const response = await authCtrl.login(formValues); //devuelve el objeto user de la bd
        login(response.jwt); //hago el login en la app y le paso el token que devolvio el login anterior
        router.push("/");
        //console.log(response);
        // console.log("usuario loggeado");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
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

        <Form.Button
          type="submit"
          fluid
          loadding={formik.isSubmitting ? true : undefined}
        >
          Entrar
        </Form.Button>
      </Form>
    </>
  );
}
