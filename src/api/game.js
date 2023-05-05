import { ENV, authFetch } from "@/utils";

export class Game {
  async getLastPublished() {
    try {
      const sort = "sort=publishedAt:desc";
      const pagination = "pagination[limit]=1";
      const populate = "populate=*";
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {

      const populate = "populate=platform";
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  async create(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            title: data.title,
            price: Number(data.price),
            discount: Number(data.discount) || undefined,
            slug: data.slug,
            summary: data.summary,
            video: data.video,
            releaseDate: data.releaseDate,
            platform: Number(data.platform)
          }
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

  async uploadFile(files, gameId, field) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.UPLOAD}`;
      const formData = new FormData()
      formData.append('ref', 'api::game.game')
      formData.append('refId', gameId)
      formData.append('field', field)
      for (const file of files) {
        formData.append("files", file);
      }
      const params = {
        method: "POST",
        body: formData
      };

      const response = await authFetch(url, params);
      const result = await response.json();
      console.log(params)
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  async update(data, gameId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}/${gameId}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data:{
            title: data.title,
            price: Number(data.price),
            discount: Number(data.discount) || undefined,
            slug: data.slug,
            summary: data.summary,
            video: data.video,
            releaseDate: data.releaseDate,
            platform: Number(data.platform)
          }
        }),
      };
      console.log(url,params)
      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  async delete(gameId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}/${gameId}`;
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
  async getLatestPublished({ limit = 9, platformId = null }) {
    try {
      const filterPlatform =
        platformId && `filters[platform][id][$eq]=${platformId}`;
      const paginationLimit = `pagination[limit]=${limit}`;
      const sort = `sort[0]=publishedAt:desc`;
      const populate = `populate=*`;
      const urlParams = `${sort}&${paginationLimit}&${filterPlatform}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getGamesByPlatformSlug(slug, page) {
    try {
      const filters = `filters[platform][slug][$eq]=${slug}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
      const populate = "populate=*";
      const urlParams = `${filters}&${pagination}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async searchGames(text, page) {
    try {
      const filters = `filters[title][$containsi]=${text}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
      const populate = "populate=*";
      const urlParams = `${filters}&${pagination}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    try {
      const filters = `filters[slug][$eq]=${slug}`;
      const populate = `populate[0]=wallpaper&populate[1]=cover&populate&populate[2]=screenshots&populate[3]=platform&populate[4]=platform.icon`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${filters}&${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getGameById(id) {
    try {
      const populate = `populate[0]=cover&populate[1]=platform`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}/${id}?${populate}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
