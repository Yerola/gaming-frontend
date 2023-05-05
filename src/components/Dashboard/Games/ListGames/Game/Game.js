import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { Game as GameCtrl } from "@/api";
import { BasicModal, Confirm } from "@/components/Shared";
import { GameForm } from "../../GameForm";
import styles from "./Game.module.scss";

const gameCtrl = new GameCtrl();


export function Game(props) {
  const { gameId, game, onReload} = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);
  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await gameCtrl.delete(gameId);
      onReload();
    } catch (error) {
      console.error(error);
    }
  }; 
  return (
    <>
      <div className={styles.game}>
        <div>
          <p className={styles.title}>{game.title}: </p>
          <p className={styles.gameInfo}> - 
            {game.platform.data.attributes.title} - Precio :  {game.price}
           
          </p>
        </div>

        <div className={styles.actions}>
          <Button primary icon onClick={openCloseEdit}>
            <Icon name="pencil" />
          </Button>
          <Button primary icon onClick={openCloseConfirm}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>

      <Confirm
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={onDelete}
        content="¿Estas seguro de que quieres eliminar el juego?"
      />

      <BasicModal
        show={showEdit}
        onClose={openCloseEdit}
        title="Editar juego"
      >
        <GameForm
          onClose={openCloseEdit}
          onReload={onReload}
          gameId={gameId}
          game={game}
        />
      </BasicModal>
    </>
  );
}
