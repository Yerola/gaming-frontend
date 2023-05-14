import { ENV, authFetch } from "@/utils";

export class Review {
  async add(userId, gameId, review, rating) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REVIEW}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            review,
            rating,
            user: {
              id: Number(userId)
            },
            game: {
              id: Number(gameId)
            }
          },
        }),
      };

      const response = await authFetch(url, params);
      console.log(response)
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REVIEW}/${id}`;
      const params = {
        method: "DELETE",
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll(gameId) {
    try {
      const filters = `filters[game][id][$eq]=${gameId}`;
      const populate = "populate=user";
      const urlParams = `${filters}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REVIEW}?${urlParams}`;
      
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
