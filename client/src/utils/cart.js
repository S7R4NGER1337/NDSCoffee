import { getProductPrices, getProductDataById } from "../api/products";

export async function subtotalFetch(setTotal, cart) {
  const price = await getProductPrices(cart);

  setTotal(price.sum);
  return price
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

export function methodsQty(productId, operation, setQty, setCart) {
  const cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cartInfo.findIndex((item) => item.id === productId);

  if (operation === "sub") {
    setQty((prev) => prev - 1);
    cartInfo[index].qty -= 1;
  }
  if (operation === "sum") {
    setQty((prev) => prev + 1);
    cartInfo[index].qty += 1;
  }
  if (cartInfo[index].qty <= 0 || operation === "del") {
    cartInfo.splice(cartInfo.indexOf(cartInfo[index]), 1);
  }

  localStorage.setItem("cart", JSON.stringify(cartInfo));

  setCart(cartInfo);

  return cartInfo;
}

export function emptyCart(navigate, cart) {
  if (cart.length === 0) {
    navigate("/");
    return;
  }
}
