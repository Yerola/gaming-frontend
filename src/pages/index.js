import { Button } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { signOut } from "next-auth/react";
/**{user ? (
          <div>
            <p>{`Hola ${user.username}`}</p>
            <Button onClick={logout}>Cerrar sesión</Button>
          </div>
        ) : (
          <div>
            <a href="/join/sign-in">Iniciar sesión</a>
          </div>
        )} */

export default function Index() {
  const { user, logout } = useAuth();
  // console.log(user);

  function handleClick() {
    logout();
    signOut();
  }
  return (
    <main>
      <div>
        <h2>Videogames Shop</h2>
        <Button primary>Ir al login</Button>
        {user ? (
          <div>
            <p>{`Hola ${user.username}`}</p>
            <img
              src={user.image}
              alt="imagen del perfil"
              style={{ borderRadius: "50px" }}
            />
            <Button onClick={handleClick}>Cerrar sesión</Button>
          </div>
        ) : (
          <div>
            <a href="/join/sign-in">Iniciar sesión</a>
          </div>
        )}
      </div>
    </main>
  );
}
