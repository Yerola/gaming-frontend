import { useState, useEffect } from "react";
import { map } from "lodash";
import { Game as GameCtrl} from "@/api";
import { useAuth } from "@/hooks";
import { Game } from "./Game";
import styles from "./ListGames.module.scss";

const gameCtrl = new GameCtrl();


export function ListGames(props) {
  const { reload, onReload } = props;
  const [games, setGames] = useState(null);

 // const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await gameCtrl.getAll();
        setGames(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!games) return null;

  return (
    <div className={styles.games}>
      {map(games, (game) => (
   
         <Game
          key={game.id}
          gameId={game.id}
          game={game.attributes}
        
          onReload={onReload}
        /> 
      ))}
    </div>
  );
}
