import { forEach } from "lodash";
import { ENV, authFetch } from "@/utils";

export class Cart {
  add(gameId) {
    const games = this.getAll(); // obtenemos los juegos
    const objIndex = games.findIndex((game) => game.id === gameId);// verifico si el juego existe

    if (objIndex < 0) { // si no existe
      games.push({ id: gameId, quantity: 1 });
    } else {
      const game = games[objIndex];
      games[objIndex].quantity = game.quantity + 1; // para añadir existentes
    }

    localStorage.setItem(ENV.CART, JSON.stringify(games));
  }

  getAll() {
    const response = localStorage.getItem(ENV.CART); // CAT=carrito

    if (!response) { // si no hay nada en el carrito
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  count() { // para contar productos del carrito
    const response = this.getAll();
    let count = 0;

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }

  changeQuantity(gameId, quantity) {
    const games = this.getAll();
    const objIndex = games.findIndex((game) => game.id === gameId);

    games[objIndex].quantity = quantity; //cantidad que el usuario ingresa

    localStorage.setItem(ENV.CART, JSON.stringify(games));
  }

  delete(gameId) {
    const games = this.getAll();
    const updateGames = games.filter((game) => game.id !== gameId);

    localStorage.setItem(ENV.CART, JSON.stringify(updateGames));
  }

  deleteAll() {
    localStorage.removeItem(ENV.CART);
  }

  async paymentCart(token, products, idUser, address) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENY_ORDER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          products,
          idUser,
          addressShipping: address,
        }),
      };

      const response = await authFetch(url, params);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
