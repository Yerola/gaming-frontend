import { useState, useEffect } from "react";
import { map } from "lodash";
import { Game as GameCtrl} from "@/api";
import { useAuth } from "@/hooks";
import { Game } from "./Game";
import styles from "./ListGames.module.scss";
import { Pagination as PaginationSU } from "semantic-ui-react";

const gameCtrl = new GameCtrl();


export function ListGames(props) {
  const { reload, onReload } = props;
  const [games, setGames] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

 // const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await gameCtrl.getAllPreview(currentPage);
        const pages = response.meta.pagination.pageCount;
        setGames(response.data);
        setPageCount(pages, 'page count');
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentPage,reload]);

  const onPageChange = (_, data) => {
    const { activePage } = data;

    setCurrentPage(activePage);

  };

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
            <PaginationSU
        defaultActivePage={currentPage}
        totalPages={pageCount}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        onPageChange={onPageChange}
      />
    </div>
  );
}
