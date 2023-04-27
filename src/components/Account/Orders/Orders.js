import { useState, useEffect } from "react";
import { map } from "lodash";
import { Order as OrderCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { NoResult } from "@/components/Shared";
import { Order } from "./Order";

const orderCtrl = new OrderCtrl();

export function Orders() {
  const [orders, setOrders] = useState(null); //los pedidos que obtenga los guardo en orders
  const { user } = useAuth();//me traigo user 
  //console.log(orders);

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll(user.id);//el user.id sale de los hooks
        //console.log(response);
        setOrders(response.data); //para mandarle el array
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) return <NoResult text="No tienes ningun producto comprado" />;

  //iteración de los pedidos y su info
  return (
    <div>
      {map(orders, (order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
}