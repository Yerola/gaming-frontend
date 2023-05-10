import Link from "next/link";
import { JoinLayout } from "@/layouts";
import { RegisterForm } from "@/components/Auth";
import { Seo } from "@/components/Shared";
import styles from "./sign-up.module.scss";
import { useSession,signIn } from "next-auth/react";

export default function SignUpPage() {
  const{data:session}=useSession()
  return (
    <>
      <Seo title="Registrarse" />

      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Crear cuenta</h3>
          <button className={styles.button} onClick={()=>signIn()}>Registrarse con Google</button>
          <RegisterForm session={session} />

          <div className={styles.actions}>
            <Link href="/join/sign-in">Atrás</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
