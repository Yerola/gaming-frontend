import { Game } from "@/api";

export { default } from "./search";

export async function getServerSideProps(context) {
  const {
    query: { s, p, o, d,page = 1 },
  } = context;

  const text = {s,p,o,d};
  const gameCtrl = new Game();
  const response = await gameCtrl.searchGames(text, page);

  const platform=response.data[0].attributes.platform.data.attributes.title;

  const sort= o?o.charAt(0)==='p'?'mejores precios':"últimos lanzamientos":""; 

  const searchText2 = `${p?`en plataforma ${platform} -`:``}${o?` ordenado por ${sort}`:``}${d?` - solo con descuentos -`:``}`;

  return {
    props: {
      games: response.data,
      pagination: response.meta.pagination,
      searchText: s,
      searchText2,
    },
  };
}
