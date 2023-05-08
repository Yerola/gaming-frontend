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
        <button className={styles.button} onClick={()=>signIn()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M22.537 10.175H21V10c0-2.17-.917-3.662-2.067-4.831C17.38 4.932 15.351 4 12 4 7.823 4 4.427 6.2 2.888 9.382L0 9.04C1.672 4.899 6.016 2 12 2c4.702 0 8.223 1.7 10.338 4.419 2.098 2.635 2.722 6.413 1.161 9.756z"/>
        </svg>
        Iniciar sesión con Google
        </button>  
       // <button className={styles.button} onClick={()=>signIn()}>Iniciar sesión con Google</button>
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
