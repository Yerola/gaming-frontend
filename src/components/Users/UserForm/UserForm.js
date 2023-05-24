import { Form } from "semantic-ui-react";

export function UserForm(props) {
  const {
    onClose,
    onReload,
    id,
    username,
    email,
    firstname,
    lastname,
    blocked,
    createdAt,
    updatedAt,
  } = props;

  return (
    <Form>
      {firstname && lastname && (
        <Form.Input
          name="fullname"
          value={`Nombre y apellidos: ${firstname} ${lastname}`}
        />
      )}

      <Form.Group widths="equal">
        <Form.Input name="username" value={`username: ${username}`} />
        <Form.Input name="email" value={`email: ${email}`} />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="created"
          value={`Created: ${createdAt.slice(0, 10)}`}
        />
        <Form.Input
          name="updated"
          value={`Last Update: ${updatedAt.slice(0, 10)}`}
        />
        <Form.Input name="blocked" value={`Blocked: ${blocked}`} />
      </Form.Group>

      <Form.Button type="submit" fluid onClick={onClose}>
        Ok
      </Form.Button>
    </Form>
  );
}
