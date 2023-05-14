import { useState } from "react";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import { WishlistIcon } from "@/components/Shared";
import styles from "./Panel.module.scss";

export function Panel(props) {
  const { gameId, game } = props;
  console.log(game)
  const [loading, setLoading] = useState(false);
  const { addCart } = useCart();

  const platform = game.platform.data;
  const buyPrice = fn.calcDiscountedPrice(game.price, game.discount);

  const addCartWrapper = () => {
    setLoading(true);
    addCart(gameId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContiner}>
        <Image src={game.cover.data.attributes.url} />
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{game.title}</h2>

          <div className={styles.moreInfo}>
            <span>
              <Image src={platform.attributes.icon.data.attributes.url} />
              {platform.attributes.title}
            </span>
            <span>
              {game.stock === null ? <Icon name="close" color="red" /> : <Icon name="check" />}
              {game.stock === null ? `Sin stock` : game.stock === 1 ? `Último disponible` : `En stock: ${game.stock}`}
            </span>
          </div>

          <div className={styles.price}>
            {game.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />
                  {game.price}€
                </span>

                <span className={styles.discount}>-{game.discount}%</span>
              </>
            )}

            <span className={styles.price}>{buyPrice}€</span>
          </div>

{         game.stock?<Button primary fluid onClick={addCartWrapper} loading={loading}>
            Comprar ahora
          </Button>:
          <h3 className={styles.sinStock}>
          Sin stock
        </h3>}


          <WishlistIcon gameId={gameId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}
