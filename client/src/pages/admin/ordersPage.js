import { useNavigate } from "react-router-dom";
import styles from "./ordersPage.module.css";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { deleteOrder } from '../../api/orders'

export default function OrdersPage() {
  const [orders, setOrders] = useState();
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrders() {
      const response = await fetch("http://localhost:3030/products/order/s");
      const data = await response.json();

      setFiltered(data);
      setOrders(data);
    }
    
    getOrders();
  }, []);

  function deleteProduct(id) {
    const filteredOrders = filtered.filter(order => order._id !== id)
    setFiltered(filteredOrders);
    
    deleteOrder(id)
  }

  return (
    <>
      <div className={styles.tableWrap}>
        <div className={styles.tableData}>
          <div className={styles.pageData}>
            <h1 className={styles.tableDataName}>Order Management</h1>
            <p>Efficiently monitor and manage all customer orders.</p>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadersWrapper}>
              <th className={styles.tableHeader}>ORDER ID</th>
              <th className={styles.tableHeader}>CUSTOMER</th>
              <th className={styles.tableHeader}>DATE</th>
              <th className={styles.tableHeader}>AMOUNT</th>
              <th className={styles.tableHeader}>STATUS</th>
              <th className={styles.tableHeader}>ACTIONS</th>
            </tr>
          </thead>
          <tbody className={styles.tableBodysWrapper}>
            {filtered.map((product) => <OrderCard product={product} key={product._id} deleteProduct={deleteProduct}/>)}
          </tbody>
        </table>
      </div>
    </>
  );
}
