import { Icon, Image } from "semantic-ui-react";
import Link from "next/link";
import styles from "./JoinLayout.module.scss";

//este componente sera mi contenedor de contenido

export function JoinLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/">
          <Image src="/images/logo.png" alt="logo Gaming" />
        </Link>
        <Link href="/">
          <Icon name="close" />
        </Link>
      </div>

      <div className={styles.blockLeft}>{children}</div>
      <div className={styles.blockRight} />
    </div>
  );
}
