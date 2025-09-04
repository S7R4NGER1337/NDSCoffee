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

export async function getProductDataById(id) {
  try {
    const response = await fetch(`http://localhost:3030/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
