import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { size } from "lodash";  
import { BasicLayout } from "@/layouts";
import { ChatbotGaming } from '@/components/Chatbot';
import {
  GridGames,
  NoResult,
  Pagination,
  Separator,
} from "@/components/Shared";
import styles from './search.module.scss'

export default function SearchPage(props) {
  const { games, pagination, searchText, searchText2 } = props;
  const hasResult = size(games) > 0;

  useEffect(() => {
    document.getElementById("search-games").focus();
  }, []);
console.log(props);
  return (
    <div className={styles.containerd} >
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={84} />

          {hasResult ? (
            <>
            <h2>Buscando: {searchText} {searchText2}</h2>
              <GridGames games={games} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult text="No se han encontrado resultados" />
          )}

          <Separator height={100} />
        </Container>
        <ChatbotGaming />
      </BasicLayout>
    </div>
  );
}
