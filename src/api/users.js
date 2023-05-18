import { ENV, authFetch } from "@/utils";

export class Users {
  async getAllUsers() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}`;
      const response = await authFetch(url);
      const result = await response.json();
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateState(userId, state) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;

      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blocked: state,
          
        }),
      };
     
      const response = await authFetch(url, params);
      const result = await response.json();    

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
