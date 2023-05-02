import { ENV, authFetch } from "@/utils";

export class User {
  async getMe() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;
      const params = {
        headers: {
          Authorization: "",
        },
      };

      //const response = await fetch(url);  si lo hago asi da error pq no es una peticion autenticada
                                              //o sea no le estoy mandando el token del user
      const response = await authFetch(url);
//con el authFect se manda el token de manera automatica, si el usuario esta loggeado 
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
