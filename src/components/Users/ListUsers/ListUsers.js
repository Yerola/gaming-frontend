import { useState, useEffect } from "react";
import { map } from "lodash";
import { Users } from "@/api"; //la clase que trae de la bd
import { User } from "./User"; //componente
import styles from "./ListUsers.module.scss";

const usersCtrl = new Users();

export function ListUsers(props) {
  const { reload, onReload } = props;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await usersCtrl.getAllUsers();
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!users) return null;

  return (
    <div className={styles.users}>
      {map(users, (user) => (
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
