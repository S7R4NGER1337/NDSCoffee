import { useNavigate } from "react-router-dom";
import styles from './dataTable.module.css'

export function WhatButtonsToRender({productId, data, pathName, deleteProduct, changeStatusFunction}) {
    const navigate = useNavigate();

    if (pathName === "/admin/orders") {
      return <button className={styles.deleteBtn}> Delete order</button>;
    }

    const changeStatusColor = data.isActive ? "red" : "green";
    const changeStatus = (
      <button className={styles.adminBtn} style={{ color: changeStatusColor }} onClick={() => changeStatusFunction(productId)}>
        {data.isActive ? "HideProduct" : "ShowProduct"}
      </button>
    );

    const editButton = (
      <button
        className={`${styles.adminBtn} ${styles.editBtn}`}
        onClick={() => navigate(`/admin/edit/${productId}`)}>
        Edit Order
      </button>
    );

    const deleteBtn = (
      <button
        className={styles.adminBtn}
        style={{ color: "red" }}
        onClick={() => deleteProduct(productId)}>
        Delete Product
      </button>
    );
    return (
      <>
        {deleteBtn}
        {changeStatus}
        {editButton}
      </>
    );
  }