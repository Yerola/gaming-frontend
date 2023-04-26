import { JoinLayout } from "@/layouts";
import { LoginForm } from "@/components/Auth";
import Link from "next/link";
import styles from "./sign-in.module.scss";

function SignInPage() {
  return (
    <>
      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Iniciar sesión</h3>

          <LoginForm />

          <div className={styles.actions}>
            <Link href="/join/sign-up">Click aqui si no tienes cuenta</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}

export default SignInPage;
