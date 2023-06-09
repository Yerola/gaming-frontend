import { useState } from "react";
import { Image } from "semantic-ui-react";
import { DateTime } from "luxon";
import { forEach, map } from "lodash";
import { BasicModal } from "@/components/Shared";
import { fn } from "@/utils";
import styles from "./Order.module.scss";
//<
import { Button } from "semantic-ui-react";
import { ReviewForm } from "./reviewForm";

//>

export function Order(props) {
  const { order,userId } = props;
  const [showModal, setShowModal] = useState(false);
  const createdAt = new Date(order.attributes.createdAt).toISOString();
  const products = order.attributes.products;
  const address = order.attributes.addressShipping;

  const openCloseModal = () => setShowModal((prevState) => !prevState);

  const getTotalProducts = () => {
    let total = 0;

    forEach(products, (product) => {
      total += product.quantity;
    });

    return total;
  };

  //<
  const { onReload } = props;
  const [show, setShow] = useState(false);
  const [idGame,setIdGame]= useState(null)
  const onOpenClose = (id=null) =>{
    setShow((prevState) => !prevState);
    setIdGame(id)
  } 
  //>
  return (
    <>
      <div className={styles.order} onClick={openCloseModal}>
        <div>
          <span>
            {DateTime.fromISO(createdAt, { locale: "es" }).toFormat(
              "dd/MM/yyyy"
            )}
          </span>
          <p>{getTotalProducts()} productos</p>
        </div>

        <p>{order.attributes.totalPayment.toFixed(2)}€</p>
      </div>

      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title="Información del pedido"
      >
        {map(products, (product) => (
          
          <div className={styles.product}>
            <Image src={product.attributes.cover.data.attributes.url} />

            <div>
              <div className={styles.info}>
                <div>
                  <p>{product.attributes.title}</p>
                  <p>{product.attributes.platform.data.attributes.title}</p>
                </div>
              </div>
              <div className={styles.quantity}>
              {/* < */}
                <Button primary onClick={()=>onOpenClose(product.id)}>Reseñas</Button> 

                <BasicModal show={show} onClose={onOpenClose} title="Reseña">
                  
        <ReviewForm onClose={onOpenClose} onReload={onReload}  userId={userId} gameId={idGame} />
      </BasicModal>
                {/* > */}
                <span>x{product.quantity}</span>
                <span>
                  {fn.calcDiscountedPrice(
                    product.attributes.price,
                    product.attributes.discount
                  )}
                  €
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.address}>
          <div>
            <p className={styles.title}>{address.attributes.title}</p>
            <p className={styles.addressInfo}>
              {address.attributes.name}, {address.attributes.address},{" "}
              {address.attributes.state}, {address.attributes.city},{" "}
              {address.attributes.postal_code}
            </p>
          </div>
        </div>

        <div className={styles.total}>
          <p>TOTAL: {order.attributes.totalPayment.toFixed(2)}€</p>
        </div>
      </BasicModal>
    </>
  );
}
