import { getProductPrices, getProductDataById } from "../api/products";

export async function subtotalFetch(setTotal, cart) {
  const price = await getProductPrices(cart);

  setTotal(price.sum);
}

export async function productFetch(setCartProducts, cart) {
  if (cart.length === 0) {
    setCartProducts([]);
    return;
  }
  try {
    const products = await Promise.all(
      cart.map((product) => getProductDataById(product.id))
    );

    const productsWithQty = products.map((product, index) => ({
      ...product,
      qty: cart[index].qty,
    }));

    setCartProducts(productsWithQty);
  } catch (err) {
    console.error(err);
  }
}
