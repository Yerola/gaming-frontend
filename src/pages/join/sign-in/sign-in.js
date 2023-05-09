import Link from "next/link";
import { JoinLayout } from "@/layouts";
import { LoginForm } from "@/components/Auth";
import { Seo } from "@/components/Shared";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "semantic-ui-react";
import styles from "./sign-in.module.scss";

export default function SignInPage() {
  const { data: session } = useSession();

  return (
    <>
      <Seo title="Iniciar sesión" />

      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Iniciar sesión</h3>

          <div>
            <Button className={styles.buttom2} onClick={() => signIn("google")}>
              <FcGoogle size={25} /> Iniciar sesión con Google
            </Button>
          </div>

          <LoginForm session={session} />

          <div className={styles.actions}>
            <Link href="/join/sign-up">¿No tienes una cuenta?</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
