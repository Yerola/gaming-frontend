import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Auth } from "@/api";
import Error from "@/components/Error/Error";
import { translateError } from "@/utils/translateError";

const authCtrl = new Auth();

export function RegisterForm() {
  const [error, setError] = useState();
  const [visible, setVisible] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const isVisible = setTimeout(() => {
      setVisible(false);
    }, 5000); //cuando pasan 5 seg visible pasa a false y no se ve mas el error

    return () => clearTimeout(isVisible);
  }, [visible, error]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authCtrl.register(formValue);
        router.push("/join/sign-in");
      } catch (err) {        
        setVisible(true);
        setError(translateError(err.error.message));
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
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
            name="email"
            type="text"
            placeholder="Correo electronico"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
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

      {error && visible && <Error msj={error} />}
    </>
  );
}
