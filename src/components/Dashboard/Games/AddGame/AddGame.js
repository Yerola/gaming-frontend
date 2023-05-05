import { useState } from "react";
import { Button } from "semantic-ui-react";
import { BasicModal } from "@/components/Shared";
import { GameForm } from "../GameForm";
import styles from "./AddGame.module.scss";

export function AddGame(props) {
  const { onReload } = props;
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  return (
    <>
      <Button primary className={styles.addBtn} onClick={onOpenClose}>
        Crear
      </Button>

      <BasicModal show={show} onClose={onOpenClose} title="Nuevo Juego">
        <GameForm onClose={onOpenClose} onReload={onReload} />
      </BasicModal>
    </>
  );
}
