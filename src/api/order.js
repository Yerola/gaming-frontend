import { ENV, authFetch } from "@/utils";

export class Order {
  async getAll(userId) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`;
      const sort = "sort[0]=createdAt:desc"; //ordeno por fecha descendente
      const urlParams = `${filters}&${sort}`; // le concateno filters y sort

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${urlParams}`; //petición donde me traigo las orders

      const response = await authFetch(url);//me traigo la data con url
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
