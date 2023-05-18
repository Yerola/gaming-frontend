import Link from "next/link";
import { Container, Image, Button } from "semantic-ui-react";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.columns}>
          <div className={styles.img_logo}>
            <Link href="/">
              <Image src="/images/logo.png" alt="Gaming" />
            </Link>
          </div>
//eliminar esta linea
          <div  className={styles.politicas}>
            <ul>
              <Link href="https://www.instant-gaming.com/en/terms-of-use/" target="_blank">Términos y condiciones</Link>
              <Link href="https://www.instant-gaming.com/en/privacy-policy/" target="_blank">Política de privacidad</Link>
              <Link href="https://gaming-frontend.vercel.app/join/sign-in">Contacto</Link>
              <Link href="https://www.instant-gaming.com/en/frequently-asked-questions/" target="_blank">FAQs</Link>
            </ul>
          </div>

          <div className={styles.social}>
            <Button as="a" href="https://www.facebook.com/Instant.Gaming" target="_blank" circular color="facebook" icon="facebook" />
            <Button as="a" href="https://twitter.com/InstantGamingES" target="_blank" circular color="twitter" icon="twitter" />
            <Button as="a" href="https://www.twitch.tv/instantgamingen" target="_blank" circular color="purple" icon="twitch" />  
            <Button as="a" href="https://www.youtube.com/channel/UCJ4IjxQrCVSunrWIknciNNg" target="_blank" circular color="youtube" icon="youtube" />
          </div>
        </div>

        <div className={styles.copyright}>
          <span>Copyright © 2023 Gaming - All rights reserved</span>
        </div>
      </Container>
    </div>
  );
};
