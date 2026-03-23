import { API_URL, getAdminHeaders } from './config'

const productsUrl = `${API_URL}/products`

export async function placeOrder(orderData) {
  const response = await fetch(`${productsUrl}/order`, {
    method: 'POST',
    body: JSON.stringify(orderData),
    headers: { 'Content-type': 'application/json' },
  })
  return response.json()
}

export async function getOrders() {
  const response = await fetch(`${productsUrl}/orders`, {
    headers: getAdminHeaders(),
  })
  if (!response.ok) return []
  return response.json()
}

export async function changeOrderStatus(id, status) {
  const response = await fetch(`${productsUrl}/changeStatus/${id}`, {
    method: 'POST',
    headers: getAdminHeaders(),
    body: JSON.stringify({ status }),
  })
  return response.json()
}

export async function deleteOrder(id) {
  return fetch(`${productsUrl}/order/${id}`, {
    method: 'DELETE',
    headers: getAdminHeaders(),
  })
}
