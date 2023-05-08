import { Form } from "semantic-ui-react";
import { useFormik } from "formik";

import { Auth } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./LoginForm.form";
import { useEffect } from "react";


const authCtrl = new Auth();

export function LoginForm({session}) {
  

  const { login } = useAuth();

useEffect(() => {
  
  if(session) {
    (async () => {

    try {
      const response = await authCtrl.login({
        identifier:session.user.name.split(' ').join(''),
        password:session.user.email.split('').reverse().join('')+session.user.name.split(' ').join('')
      });
      login(response.jwt);
    } catch (error) {
      console.error(error);
    }
  })()
}
  
}, [session])


  const formik = useFormik({
    initialValues: initialValues(session),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.login(formValue);
        login(response.jwt);

        // router.push("/");
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
        placeholder="Correo electronico o nombre de usuario"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
    </Form>
  );
}
