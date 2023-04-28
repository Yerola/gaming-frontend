import { Token } from "@/api";//se usa para usar una peticion autenticada sin tener que pasarle el token

export async function authFetch(url, params) {
  const tokenCtrl = new Token();
  const token = tokenCtrl.getToken();
  //console.log(token)

  const logout = () => {//logout exclusivo para este authFetch
    tokenCtrl.removeToken(); 
    window.location.replace("/");
  };//elimino el token del LS y me voy a inicio

  if (!token) {//si no existe el token, a cerrar la sesion
    logout();
  } else {
    if (tokenCtrl.hasExpired(token)) {//si caduco cierro session
      logout();
    } else {  //si no ha caducado hago la peticion http, añado los parametros que mande el usuario
      //y añado los headers , si hay, y ademas el authorization(bearer +token)
      const paramsTemp = {
       
        
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        return await fetch(url, paramsTemp);  // aqui finalmente hago el fetch
      } catch (error) {
        return error;
      }
    }
  }
}
