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
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
        setLoading(false);
 
  }, []);

  const login = async (token) => {
    try {
      //console.log("estamos en AuthContext")
     // console.log(token)
      tokenCtrl.setToken(token); //guardando el token el el LS
      const response = await userCtrl.getMe(); //obteniendo los datos del usuario
      console.log(response);
      setUser(response);
      setToken(token);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  
  const data = {accessToken: token, user, login};
   //data es informacion que va a tener el contexto, a la cual podemos acceder desde
    // los hijos, como este componente engloba la app, desde cualquier parte de la misma
    //podre acceder a esta informacion    

  if (loading) return null;

  return (
    <AuthContext.Provider value={data}> 
      {children}
    </AuthContext.Provider>
  );
}
