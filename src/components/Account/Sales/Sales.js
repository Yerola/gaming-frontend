import { useState, useEffect } from "react";
import { map } from "lodash";
import { Order as OrderCtrl } from "@/api";
import { NoResult, Separator } from "@/components/Shared";
import { Sale } from "./Sale";
import { Pagination as PaginationSU, Select, Loader, Dimmer, Segment } from "semantic-ui-react";
import styles from "./Sales.module.scss";

const orderCtrl = new OrderCtrl();

export function Sales() {
  const [orders, setOrders] = useState(null);
  const [sum, setSum] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialDate, setInitialDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const response1 = await orderCtrl.getAllSales({ initialDate, endDate }, currentPage);
        const response = response1.result;
        const suma = response1.suma;
        const pages = response1.pageCount;

        setOrders(response.data);
        setSum(suma.toFixed(2));
        setPageCount(pages, 'page count');
        setError(response.error);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentPage, initialDate, endDate]);

  const onPageChange = (_, data) => {
    const { activePage } = data;

    setCurrentPage(activePage);

  };

  const onSearchMes = (data) => {

    let fechaAnterior = new Date(Date.now());
    const hoy = new Date(Date.now());

    let inicio;
    let fin;
    let i;
    let f;

    switch (data) {
      case 1:
        fechaAnterior.setDate(fechaAnterior.getDate() - 6)
        inicio = `${fechaAnterior.getFullYear()}-${fechaAnterior.getMonth() + 1 < 10 ? `0${fechaAnterior.getMonth() + 1}` : fechaAnterior.getMonth() + 1}-${fechaAnterior.getDate() < 10 ? `0${fechaAnterior.getDate()}` : fechaAnterior.getDate()}`
        fin = `${hoy.getFullYear()}-${hoy.getMonth() + 1 < 10 ? `0${hoy.getMonth() + 1}` : hoy.getMonth() + 1}-${hoy.getDate() < 10 ? `0${hoy.getDate()}` : hoy.getDate()}`;
        break;
      case 2:
        i = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
        f = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
        inicio = `${i.getFullYear()}-${i.getMonth() + 1 < 10 ? `0${i.getMonth() + 1}` : i.getMonth() + 1}-${i.getDate() < 10 ? `0${i.getDate()}` : i.getDate()}`
        fin = `${f.getFullYear()}-${f.getMonth() + 1 < 10 ? `0${f.getMonth() + 1}` : f.getMonth() + 1}-${f.getDate() < 10 ? `0${f.getDate()}` : f.getDate()}`
        break;
      case 3:
        i = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1)
        f = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
        inicio = `${i.getFullYear()}-${i.getMonth() + 1 < 10 ? `0${i.getMonth() + 1}` : i.getMonth() + 1}-${i.getDate() < 10 ? `0${i.getDate()}` : i.getDate()}`
        fin = `${f.getFullYear()}-${f.getMonth() + 1 < 10 ? `0${f.getMonth() + 1}` : f.getMonth() + 1}-${f.getDate() < 10 ? `0${f.getDate()}` : f.getDate()}`
        break;
      case 4:
        inicio = `${hoy.getFullYear()}-01-01`;
        fin = `${hoy.getFullYear()}-${hoy.getMonth() + 1 < 10 ? `0${hoy.getMonth() + 1}` : hoy.getMonth() + 1}-${hoy.getDate() < 10 ? `0${hoy.getDate()}` : hoy.getDate()}`;
        break;
      case 5:
        inicio = `${hoy.getFullYear() - 1}-01-01`;
        fin = `${hoy.getFullYear() - 1}-12-31`;
        break;
      default:
        inicio = undefined;
        fin = undefined;
        break;
    }
    console.log(inicio, fin);
    setInitialDate(inicio);
    setEndDate(fin);
  }

  if (!orders) return (
    <Segment>
      <Dimmer active>
        <Loader />
      </Dimmer>
    </Segment>);

  if (error) return <NoResult text="No se encontraron coincidencias" />;

  return (
    <div>
      <div className={styles.encabezado}>
        <div className={styles.filtro}>
          <Select
            className={styles.customSelect}
            placeholder="Filtrar por: Todo"
            options={[
              { key: 'todo', value: 0, text: "Todo", style: { backgroundColor: '#272727' } },
              { key: 'estaSemana', value: 1, text: "Ultimos 7 días", style: { backgroundColor: '#272727' } },
              { key: 'esteMes', value: 2, text: "Este Mes", style: { backgroundColor: '#272727' } },
              { key: 'mesPasado', value: 3, text: "Mes Pasado", style: { backgroundColor: '#272727' } },
              { key: 'esteAnio', value: 4, text: "Este Año", style: { backgroundColor: '#272727' } },
              { key: 'anioPasaado', value: 5, text: "Año Pasado", style: { backgroundColor: '#272727' } }
            ]}
            onChange={(_, data) => onSearchMes(data.value)}
          />
        </div>
        <div className={styles.total}>
          <p>Total Ventas: € {sum}</p>
        </div>
      </div>

      <Separator height={20} />

      {map(orders, (order) => (
        <Sale key={order.id} order={order} />
      ))}

      <PaginationSU
        defaultActivePage={currentPage}
        totalPages={pageCount}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        onPageChange={onPageChange}
      />
    </div>
  );
}