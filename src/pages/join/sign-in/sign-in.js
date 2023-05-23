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
          <br />

          <div>
            <Button
              onClick={() => signIn("google")}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",                
                //backgroundColor:"#f0f0f0",
              }}
            >
              <FcGoogle size={25} style={{ margin: "0 5px 0 0" }} />{" "}
              <spam style={{ color: "#f0f0f0" }}>
                Iniciar sesión con Google
              </spam>
            </Button>
          </div>

          <br />

          <LoginForm session={session} />

          <div className={styles.actions}>
            <Link href="/join/sign-up">¿No tienes una cuenta?</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
