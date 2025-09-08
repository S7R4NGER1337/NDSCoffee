import { useEffect, useState } from 'react';
import styles from './orderCard.module.css'
import { subtotalFetch } from '../../utils/cart'


export default function OrderCard({product}) {
    const [ totalPrice, setTotalPrice ] = useState(0)

    useEffect(() => {
        subtotalFetch(setTotalPrice, product.cart)
    }, [product])

  return (
    <tr className={styles.tableBodyWrap} key={product._id}>
      <td className={`${styles.tableBody} ${styles.tableBodyDarker}`}>
        {product._id}
      </td>
      <td className={styles.tableBody}>{product.fullName}</td>
      <td className={styles.tableBody}>15.11.24</td>
      <td className={styles.tableBody}>{totalPrice}</td>
      <td className={styles.tableBody}>{product.status}</td>
      <td className={`${styles.tableBody} ${styles.tableActions}`}>
        <p>Details</p>
      </td>
    </tr>
  );
}
