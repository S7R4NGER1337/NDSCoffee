import styles from "./testTable.module.css";

export default function TestTable({ data }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableData}>
        <h1 className={styles.tableDataName}>Products</h1>
        <div className={styles.tableDataActions}>
            <button>Search</button>
            <button>Add Product</button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeadersWrapper}>
            <th className={styles.tableHeader}>PRODUCT NAME</th>
            <th className={styles.tableHeader}>PRICE</th>
            <th className={styles.tableHeader}>ROAST LEVEL</th>
            <th className={styles.tableHeader}>ORIGIN</th>
            <th className={styles.tableHeader}>STOCK QUANTITY</th>
            <th className={styles.tableHeader}>IS ACTIVE</th>
            <th className={styles.tableHeader}>TIMES BOUGHT</th>
            <th className={styles.tableHeader}>ACTIONS</th>
          </tr>
        </thead>
        <tbody className={styles.tableBodysWrapper}>
          {data.map((product) => (
            <tr className={styles.tableBodyWrap} key={product._id}>
              <td className={`${styles.tableBody} ${styles.tableBodyDarker}`}>{product.name}</td>
              <td className={styles.tableBody}>${product.price}</td>
              <td className={styles.tableBody}>{product.roastLevel}</td>
              <td className={styles.tableBody}>{product.origin}</td>
              <td className={styles.tableBody}>{product.qty}</td>
              <td className={styles.tableBody}>{product.isActive}</td>
              <td className={styles.tableBody}>{product.bought}</td>
              <td className={styles.tableBody}>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
