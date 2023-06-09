import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { ChatbotGaming } from '@/components/Chatbot';
import { BasicLayout } from "@/layouts";
import {
  GridGames,
  Separator,
  NoResult,
  Pagination,
  Seo,
} from "@/components/Shared";
import styles from './platform.module.scss'

export default function PlatformPage(props) {
  const { games, platform, pagination } = props;
  const hasProducts = size(games) > 0;

  return (
    <div className={styles.containerd}>
      <Seo title={`Juegos de ${platform.attributes.title}`} />

      <BasicLayout relative>
        <Container>
          <Separator height={50} />

          <h2>{platform.attributes.title}</h2>

          {hasProducts ? (
            <>
              <GridGames games={games} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult
              text={`La categoria ${platform.attributes.title} aun no tiene productos`}
            />
          )}

          <Separator height={100} />
        </Container>
        <ChatbotGaming />
      </BasicLayout>
    </div>
  );
}
