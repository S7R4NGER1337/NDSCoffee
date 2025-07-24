import { useLocation } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './dataTable.css'

export default function DataTable({ data }) {
    const [productData, setProductData] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const pathName = location.pathname

    useEffect(() => {
        setProductData(data)
    }, [data]);

    async function deleteProduct(productId) {
        const deletedProct = await fetch(`http://localhost:3030/products/${productId}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            }
        })
        setProductData(prev => prev.filter(product => product._id !== productId))

        return deletedProct
    }
    function WhatButtonsToRender(productId) {
        if (pathName === '/admin/orders') {
            return <button className='deleteBtn'> Delete order</button>
        }

        const changeStatusColor = data.isActive ? 'red' : 'green'
        const changeStatus = <button className='adminBtn' style={{ color: changeStatusColor }}>{data.isActive ? 'HideProduct' : 'ShowProduct'}</button>

        const editButton = <button className='adminBtn editBtn' onClick={() => navigate(`/admin/${data._id}/edit`)}> Edit Order</button>

        const deleteBtn = <button className='adminBtn' style={{ color: 'red' }} onClick={() => deleteProduct(productId)}>Delete Product</button>
        return <>
            {deleteBtn}
            {changeStatus}
            {editButton}
        </>
    }

    const canRenderProducts = () => {
        if(productData !== undefined && productData > 0) return false
        return true
    }

    return (
        <div style={{margin: '1em'}}>
            {canRenderProducts() ? <h1>There are no products</h1> :
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Actions</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Is this product active</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Bought</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productData.map(product => (
                                <TableRow
                                    key={product.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {WhatButtonsToRender(product._id)}

                                    </TableCell>

                                    <TableCell component="th" scope="row" style={{ display: 'flex', gap: '1em' }}>
                                        {product.name}
                                    </TableCell>
                                    <TableCell align="right">{product.isActive ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="right">{product.price}</TableCell>
                                    <TableCell align="right">{product.bought}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
}
