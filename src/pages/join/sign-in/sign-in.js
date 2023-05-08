import Link from "next/link";
import { JoinLayout } from "@/layouts";
import { LoginForm } from "@/components/Auth";
import { Seo } from "@/components/Shared";
import styles from "./sign-in.module.scss";
import { useSession,signIn } from "next-auth/react";


export default function SignInPage() {
  const{data:session}=useSession()


  return (
    <>
      <Seo title="Iniciar sesión" />

      <JoinLayout>

        <div className={styles.signIn}>
        <button className={styles.button} onClick={()=>signIn()}>Iniciar sesión con Google</button>
          <h3>Iniciar sesión</h3>
          <LoginForm session={session}/>

          <div className={styles.actions}>
            <Link href="/join/sign-up">¿No tienes una cuenta?</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
