import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import {WhatButtonsToRender} from '../components/adminPageButtons'
import "./dataTable.css";

export default function DataTable({ data }) {
  const [productData, setProductData] = useState([]);
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    setProductData(data);
  }, [data]);

  async function deleteProduct(productId) {
    const deletedProct = await fetch(
      `http://localhost:3030/products/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    setProductData((prev) =>
      prev.filter((product) => product._id !== productId)
    );

    return deletedProct;
  }

  async function changeStatus(productId) {
     await fetch(`http://localhost:3030/products/status/${productId}`, {
        method: 'POST',
    })
    setProductData(prev => 
      prev.map(item => item._id === productId ? { ...item, isActive: !item.isActive}: item)
    );
  }


  const canRenderProducts = () => {
    if (productData !== undefined && productData.length > 0) return false;
    return true;
  };

  
  return (
    <div style={{ margin: "1em" }}>
      {canRenderProducts() ? (
        <h1>There are no products</h1>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              {pathName !== "/admin/orders" ? (
                <TableRow>
                  <TableCell>Actions</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Is this product active</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Bought</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Phone</TableCell>
                </TableRow>
              )}
            </TableHead>
            {pathName !== "/admin/orders" ? (
              <TableBody>
                {productData.map((product) => (
                  <TableRow
                    key={product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <WhatButtonsToRender productId={product._id} data={data} pathName={pathName} deleteProduct={deleteProduct} changeStatusFunction={changeStatus} />
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      style={{ display: "flex", gap: "1em" }}
                    >
                      {product.name}
                    </TableCell>
                    <TableCell align="right">
                      {product.isActive ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.bought}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {productData.map((product) => (
                  <TableRow
                    key={product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ display: "flex", gap: "1em" }}>
                      {(product["productId"][0].id)}
                    </TableCell>
                    <TableCell align="right">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">
                      {product.address}
                    </TableCell>
                    <TableCell align="right">
                      {product.phone}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
