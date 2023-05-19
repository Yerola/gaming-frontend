import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";

import { BasicModal, Confirm } from "@/components/Shared";
import {UserForm} from '../../UserForm'
import { Users } from "@/api";
import styles from "./User.module.scss";

export function User(props) {
  const { id, username, email, firstname, lastname, blocked, createdAt, updatedAt, onReload } = props;

  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const usersCtrl = new Users();

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);

  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);
  console.log(showEdit)
  const updateUserState = async () => {
    try {
      setIsLoading(true);
      await usersCtrl.updateState(id, !blocked);
      onReload();
      openCloseConfirm();
    } catch (error) {
      console.error(error);
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      <div className={styles.game}>
        <div>
          <p className={styles.title}>Username: {username} </p>
          <p className={styles.gameInfo}>email: {email}</p>
          <p className={styles.gameInfo}>
            Nombre: {`${firstname} ${lastname}`}
          </p>
        </div>

        <div className={styles.actions}>
          <Button primary icon onClick={openCloseEdit}>
            <Icon name="eye" />
          </Button>

          {blocked ? (
            <Button primary icon onClick={openCloseConfirm}>
              <Icon name="lock" />
            </Button>
          ) : (
            <Button primary icon onClick={openCloseConfirm}>
              <Icon name="unlock alternate" />
            </Button>
          )}
        </div>
      </div>

      <Confirm
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={updateUserState}
        confirmButton={
          <Button primary loading={isLoading}>
            Confirmar
          </Button>
        }
        content={
          blocked
            ? "¿Estás seguro que deseas activar el usuario?"
            : "¿Estás seguro que deseas desactivar el usuario?"
        }
      />

      <BasicModal
        show={showEdit}
        onClose={openCloseEdit}
        title="Detalles del usuario"
      >
      <UserForm  
          key={id}
          id={id}
          username={username}
          email={email}
          firstname={firstname}
          lastname={lastname}
          blocked={blocked}
          createdAt={createdAt}
          updatedAt={updatedAt}
          onReload={onReload}
          onClose={openCloseEdit}
          />
      </BasicModal>
    </>
  );
}
