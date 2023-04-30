import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Game } from "@/api";
import { CartLayout } from "@/layouts";
import { useCart } from "@/hooks";
import { Cart } from "@/components/Cart";
import { Seo } from "@/components/Shared";

const gameCtrl = new Game();

export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step); // transformo en número
  const [games, setGames] = useState(null); // en principio no sé cuales son
  const { cart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const data = []; //datos de los juegos a medida que los obtenemos
        for await (const item of cart) {
          const response = await gameCtrl.getGameById(item.id);
          data.push({ ...response.data, quantity: item.quantity });
        }
        setGames(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  return (
    <>
      <Seo title="Carrito" />

      <CartLayout>
        {currentStep === 1 && <Cart.StepOne games={games} />}
        {currentStep === 2 && <Cart.StepTwo games={games} />}
        {currentStep === 3 && <Cart.StepThree />}
      </CartLayout>
    </>
  );
}
