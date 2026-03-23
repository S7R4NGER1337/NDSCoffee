import styles from './ordersPage.module.css'
import { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { getOrders, deleteOrder } from '../../api/orders'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      const data = await getOrders()
      setOrders(data)
    }
    fetchOrders()
  }, [])

  function handleDeleteOrder(id) {
    setOrders((prev) => prev.filter((order) => order._id !== id))
    deleteOrder(id)
  }

  return (
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
          {orders.map((order) => (
            <OrderCard product={order} key={order._id} deleteProduct={handleDeleteOrder} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
