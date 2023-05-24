import { BasicLayout } from "@/layouts";
import { Game } from "@/components/Game";
import { Separator, Seo } from "@/components/Shared";
import { useRouter } from "next/router";
import { ChatbotGaming } from '@/components/Chatbot';
import styles from './game.module.scss'

export default function GamePage(props) {
  const { game } = props;
  const router = useRouter();
  if (game == 404) {
    router.push('/404')
    return null
  }
  else {
    const wallpaper = game.attributes.wallpaper;

    return (
      <div className={styles.containerd}>
        <Seo
          title={game.attributes.title}
          description={game.attributes.summary}
        />

        <BasicLayout>
          <Game.HeaderWallpaper image={wallpaper.data.attributes.url} />
          <Game.Panel gameId={game.id} game={game.attributes} />

          <Separator height={50} />

          <Game.Info game={game.attributes} />

          <Separator height={30} />

          <Game.Media
            video={game.attributes.video}
            screenshots={game.attributes.screenshots.data}
          />

          <Separator height={50} />
          <Game.Reviews gameId={game.id} />
          <Separator height={50} />
          <ChatbotGaming />
        </BasicLayout>
      </div>
    );
  }
}
