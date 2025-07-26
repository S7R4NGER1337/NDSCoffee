import { useNavigate } from "react-router-dom";

async function ShowProduct(id) {
    console.log(id);
    
}
export function WhatButtonsToRender({productId, data, pathName, deleteProduct}) {
    const navigate = useNavigate();

    if (pathName === "/admin/orders") {
      return <button className="deleteBtn"> Delete order</button>;
    }

    const changeStatusColor = data.isActive ? "red" : "green";
    const changeStatus = (
      <button className="adminBtn" style={{ color: changeStatusColor }} onClick={() => ShowProduct(productId)}>
        {data.isActive ? "HideProduct" : "ShowProduct"}
      </button>
    );

    const editButton = (
      <button
        className="adminBtn editBtn"
        onClick={() => navigate(`/admin/edit/${productId}`)}>
        Edit Order
      </button>
    );

    const deleteBtn = (
      <button
        className="adminBtn"
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