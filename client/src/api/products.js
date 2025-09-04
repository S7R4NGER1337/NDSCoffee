const apiUrl = "http://localhost:3030/products";

export async function editProduct(productData, productId) {
  const product = await fetch(`${apiUrl}/edit/${productId}`, {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-type": "application/json",
    },
  });

  return product;
}

export async function createNewProducts(productData) {
  const product = await fetch(`${apiUrl}/create`, {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-type": "application/json",
    },
  });
  
  return product;
}
