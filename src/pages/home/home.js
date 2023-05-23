import { Container } from "semantic-ui-react";
import { BasicLayout } from "@/layouts";
import { Home } from "@/components/Home";
import { Separator, BarTrust, BannerAd, Seo } from "@/components/Shared";
import { ChatbotGaming } from '@/components/Chatbot';
import { useAuth } from "@/hooks";
import styles from './home.module.scss';

const platformsId = {
  playstation: 1,
  nintendo: 2,
  xbox: 3,
  pc: 4,
};

export default function HomePage() {

  const { user } = useAuth();

  return (
    <div className={styles.containerd} >
      <Seo />

      <BasicLayout>
        <Home.BannerLastGamePublished />

        <Separator height={100} />

        <Container>
          <Home.LatestGames title="Ultimos lanzamientos" />
        </Container>

        <Separator height={100} />

        <BarTrust />

        <Separator height={100} />

        <Container>
          <Home.LatestGames
            title="PlayStation"
            limit={3}
            platformId={platformsId.playstation}
          />
        </Container>

        <Separator height={100} />

        {!user?<BannerAd
          title="Registrate y obten los mejores precios"
          subtitle="¡Compara con otros juegos y elige el tuyo!"
          btnTitle="Entrar ahora"
          btnLink="join/sign-in"
          image="/images/img01.png"
        />:""}

        <Separator height={50} />

        <Container>
          <Home.LatestGames
            title="Xbox"
            limit={3}
            platformId={platformsId.xbox}
          />
        </Container>
      
        <Separator height={100} />

        <ChatbotGaming />
      </BasicLayout>
    </div>
  );
}
