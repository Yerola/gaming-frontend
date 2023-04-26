export const ENV = {
  SERVER_HOST: "http://localhost:1337",// el día de mañana "https://XXX.railway.app",
  API_URL: "http://localhost:1337/api",//"https://XXX.railway.app/api",
  ENDPOINTS: {
    AUTH: {
      REGISTER: "auth/local/register",
      LOGIN: "auth/local",
    },
    USERS_ME: "users/me",
    USERS: "users",
    PLATFORM: "platforms",
    ADDRESS: "addresses",
    GAME: "games",
    WISHLIST: "wishlists",
    PAYMENY_ORDER: "payment-order",
    ORDER: "orders",
  },
  TOKEN: "token",
  CART: "cart",
  STRIPE_TOKEN:
    "pk_test_51MzkCuDLxN5QCNvKdZf11Gu2hcMl1pmsS7ZipDBdSN4dhWQQv3SDnFDKvFwK46yvcov7dqMO3l63YA5NuctAT4cJ0048U0FbHt",
};
