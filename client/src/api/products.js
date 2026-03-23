import { API_URL, getAdminHeaders } from './config'

const productsUrl = `${API_URL}/products`

export async function editProduct(productData, productId) {
  const response = await fetch(`${productsUrl}/edit/${productId}`, {
    method: 'POST',
    body: JSON.stringify(productData),
    headers: getAdminHeaders(),
  })
  return response
}

export async function createNewProducts(productData) {
  const response = await fetch(`${productsUrl}/create`, {
    method: 'POST',
    body: JSON.stringify(productData),
    headers: getAdminHeaders(),
  })
  return response
}

export async function getProductDataById(id) {
  try {
    const response = await fetch(`${productsUrl}/${id}`)
    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getProductPrices(cart) {
  const idArr = cart.flatMap(({ id, qty }) => Array(qty).fill(id))

  const response = await fetch(`${productsUrl}/price`, {
    method: 'POST',
    body: JSON.stringify({ ids: idArr }),
    headers: { 'Content-type': 'application/json' },
  })
  return response.json()
}

export async function getCartProducts(cart) {
  const idArr = cart.flatMap(({ id, qty }) => Array(qty).fill(id))

  const response = await fetch(`${productsUrl}/cartProduct`, {
    method: 'POST',
    body: JSON.stringify({ ids: idArr }),
    headers: { 'Content-type': 'application/json' },
  })
  return response.json()
}

export async function getAllProducts() {
  const response = await fetch(productsUrl, {
    headers: getAdminHeaders(),
  })
  if (!response.ok) return []
  return response.json()
}

export async function deleteProduct(productId) {
  return fetch(`${productsUrl}/${productId}`, {
    method: 'DELETE',
    headers: getAdminHeaders(),
  })
}

export async function changeProductStatus(productId) {
  return fetch(`${productsUrl}/status/${productId}`, {
    method: 'POST',
    headers: getAdminHeaders(),
  })
}
