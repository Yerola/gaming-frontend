import { JoinLayout } from "@/layouts";
import { LoginForm } from "@/components/Auth";
import Link from "next/link";
import styles from "./sign-in.module.scss";

const loginGithubUrl = `http://localhost:1337/api/connect/github`;

function SignInPage() {
  return (
    <>
      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Iniciar sesión</h3>

          <div>
            <a href={loginGithubUrl}>Continue with Github</a>
          </div>

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
