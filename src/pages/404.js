import Link from 'next/link';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Oops! Página no encontrada</h1>
      <p>La página que estás buscando no existe.</p>
      <Link href="/" passHref>
        <div className="link-wrapper">
          <a>Volver a la página de inicio</a>
        </div>
      </Link>
      <button onClick={() => router.back()}>Volver a la página anterior</button>
    </div>
  );
};

export default NotFoundPage;