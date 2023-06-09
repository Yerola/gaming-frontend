import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './404.module.scss';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className={styles['not-found-page']}>
      <img
        src="https://gaming-frontend.vercel.app/images/logo.png"
        alt="GAMING"
      />
      <h1>Oops! Página no encontrada</h1>
      <hr className={styles.hr} />
      <p className={styles.p}>La página que estás buscando no existe.</p>
      <hr className={styles.hr} />
      <Link href="/" passHref>
        <div className={styles['link-wrapper']}>
          <a>Volver a la página de inicio</a>
        </div>
      </Link>
      <br/>
      <button className={styles.backButton} onClick={() => router.back()}>Volver a la página anterior</button>
    </div>
  );
};

export default NotFoundPage;