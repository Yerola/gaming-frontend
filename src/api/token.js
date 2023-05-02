import { ENV } from "@/utils";
import jwtDecode from "jwt-decode";

export class Token { //guarda el token en el local storage
  setToken(token) {
    localStorage.setItem(ENV.TOKEN, token);
  }

  getToken() {//obteniendo el token que guarde en el LS cuando hice login
    return localStorage.getItem(ENV.TOKEN);
  }

  removeToken() {//elimina el token del LS
    localStorage.removeItem(ENV.TOKEN);
  }

  hasExpired(token) {
    const tokenDecode = jwtDecode(token);//para decodificar el token
    //console.log(tokenDecode)
    const expireDate = tokenDecode.exp * 1000; //para saber cuando expira
    const currentDate = new Date().getTime();

    if (currentDate > expireDate) {//retorna true si ya caduco
      return true;
    }

    return false;
  }
}
