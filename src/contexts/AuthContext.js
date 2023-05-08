import { useState, useEffect, createContext } from "react";
import { Token, User } from "@/api";
//para controlar la sesion del usuario dentro de la app
//cuando el user se loggea guardamos su token el LS y vamos  agenerar el usuario
//el contexto va a controlar si el usuario esta loggeado y ademas dar permisos o accesos

const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null); //user seria el objeto user completo que viene del back
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //para recuperar la sesion cada vez que se recargue la pagina
    (async () => {
      const token = tokenCtrl.getToken();
      if (!token) {
        logout();
        setLoading(false);
        return;
      } else {
        if (tokenCtrl.hasExpired(token)) {
          logout();
        } else {
          //el token existe y es valido
          await login(token);//cada vez que recargue actualizo los states
        }
      }
    })();
  }, []);

  const login = async (token) => {
    //
    try {
      //console.log("estamos en AuthContext")
      // console.log(token)
      tokenCtrl.setToken(token); //guardando el token en el LS
      const response = await userCtrl.getMe(); //obteniendo los datos del usuario
      console.log(response); //devuelve el {user}
      setUser(response); //actualizando el state de user
      setToken(token); //actualizando el state de token
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = () => {
    const token = tokenCtrl.getToken();
    if (token) {
      tokenCtrl.removeToken(); //borrando el token de LS
      setToken(null);
      setUser(null);
    }

    const updateUser = (key, value) => {
      setUser({ ...user, [key]: value });
    };

    console.log("sesion cerrada");
  };

  const data = { accessToken: token, user, login, logout };
  //data es informacion que va a tener el contexto, a la cual podemos acceder desde
  // los hijos, como este componente engloba la app, desde cualquier parte de la misma
  //podre acceder a esta informacion

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
