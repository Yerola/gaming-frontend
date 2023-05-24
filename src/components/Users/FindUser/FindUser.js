import React from "react"; //widths={"equal"}
import { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FindUser.form";
import Error from "@/components/Error/Error";

export const FindUser = (props) => {
  let { users, setId, onReload } = props;

  const [error, setError] = useState();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isVisible = setTimeout(() => {
      setVisible(false);
    }, 5000); //cuando pasan 5 seg visible pasa a false y no se ve mas el error

    return () => clearTimeout(isVisible);
  }, [visible, error]);

  function resetUsers() {
    setId(0);
    onReload();
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      try {
        let res = users.filter(
          (e) =>
            e.username == formValue.identifier ||
            e.email == formValue.identifier
        );
        if (res.length) {
          setId(res[0].id);
          onReload();
        } else {
        
          setVisible(true);
          setError("Usuario no registrado");
          resetUsers();
        }
      } catch (err) {        
        setVisible(true);
        setError(err.error.message);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Input
            style={{ width: "300px" }}
            name="identifier"
            type="text"
            placeholder="Correo electrónico o nombre de usuario"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            error={formik.errors.identifier}
          />

          <Form.Button type="submit" fluid>
            Buscar
          </Form.Button>
          <Button
            type="button"
            style={{
              backgroundColor: "#ff5400",
              margin: "0",
              padding: "10px 25px",
              borderRadius: "6px",
              margin: "0",
              height: "45px",
            }}
            onClick={resetUsers}
          >
            Limpiar
          </Button>
        </Form.Group>
      </Form>

      {error && visible && <Error msj={error} />}
    </>
  );
};
