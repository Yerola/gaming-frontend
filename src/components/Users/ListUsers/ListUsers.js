import { useState, useEffect } from "react";
import { map } from "lodash";
import { Users } from "@/api"; //la clase que trae de la bd
import { User } from "./User"; //componente
import styles from "./ListUsers.module.scss";
import { FindUser } from "../FindUser";

const usersCtrl = new Users();

export function ListUsers(props) {
  const { reload, onReload } = props;
  const [users, setUsers] = useState(null);
  const [uno, setUno] = useState(null);
  const [id, setId] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        let todos = await usersCtrl.getAllUsers();
        if (id === 0) {
          setUsers(todos);
        } else {
          setUno(users.filter((e) => e.id == id));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!users) return null;

  return (
    <div className={styles.users}>
      <div>
        <FindUser
          users={users}
          setUsers={setUsers}
          setId={setId}
          onReload={onReload}
        />
        <br />
      </div>

      <br />

      {id === 0 &&
        map(users, (user) => (
          <User
            key={user.id}
            id={user.id}
            username={user.username}
            email={user.email}
            firstname={user.firstname}
            lastname={user.lastname}
            blocked={user.blocked}
            createdAt={user.createdAt}
            updatedAt={user.updatedAt}
            onReload={onReload}
          />
        ))}

      {id !== 0 &&
        map(uno, (user) => (
          <User
            key={user.id}
            id={user.id}
            username={user.username}
            email={user.email}
            firstname={user.firstname}
            lastname={user.lastname}
            blocked={user.blocked}
            createdAt={user.createdAt}
            updatedAt={user.updatedAt}
            onReload={onReload}
          />
        ))}
    </div>
  );
}
