import { ENV, authFetch } from "@/utils";

export class Order {
  async getAll(userId) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`;
      const sort = "populate=*&sort[0]=createdAt:desc";
      const urlParams = `${filters}&${sort}`;

      const url = userId?`${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${urlParams}`:`${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${sort}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllSales(text,page) {

      const { initialDate, endDate } = text; 

    try {

      const filters = initialDate?`filters[createdAt][$between]=${initialDate}&filters[createdAt][$between]=${endDate}`:``;
      const sort = "populate=*&sort[0]=createdAt:desc";
      let pagination = `pagination[page]=${page}`;
      let urlParams = `${filters}&${sort}&${pagination}`;

      let url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${urlParams}`;

      const response = await authFetch(url);
      const result = await response.json();
      const pageCount = result.meta.pagination.pageCount;
      let result2 = result;

      let suma = 0;
      if (result2.data){
        for(let i=1; i<=result2.meta.pagination.pageCount;i++){

            pagination = `pagination[page]=${i}`;
            urlParams = `${filters}&${sort}&${pagination}`;
            url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${urlParams}`;
            let response2 = await authFetch(url);
            result2= await response2.json();

          result2.data.forEach(element => {
            suma+=element.attributes.totalPayment;
          });

        }
      }

      if (response.status !== 200) throw result;

      return {result,suma,pageCount};
    } catch (error) {
      throw error;
    }
  }

}
