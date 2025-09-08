export async function changeOrderStatus(id, status){
    const response = await fetch(`http://localhost:3030/products/changeStatus/${id}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ status })
    })

    const changedProduct = await response.json()

    return changedProduct
}