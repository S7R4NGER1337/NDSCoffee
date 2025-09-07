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

export async function getProductPrices(id) {
  let idArr = []
  id.map((id) => {
    for (let index = 0; index < id.qty; index++) {
      idArr.push(id.id)
    }
    return id
  })

  const response = await fetch(`http://localhost:3030/products/price`, {
    method: "POST",
    body: JSON.stringify({ids: idArr}),
    headers: {
      "Content-type": "application/json",
    },
  })
  
  const price = await response.json()
  
  return price
}


export async function getCartProducts(id) {
  let idArr = []
  id.map((id) => {
    for (let index = 0; index < id.qty; index++) {
      idArr.push(id.id)
    }
    return id
  })

  const response = await fetch(`http://localhost:3030/products/cartProduct`, {
    method: "POST",
    body: JSON.stringify({ids: idArr}),
    headers: {
      "Content-type": "application/json",
    },
  })
  
  const product = await response.json()
  
  return product
}