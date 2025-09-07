export function setOrder(productId, qty) {
  if (!productId) return;
  const cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cartInfo.findIndex((item) => item.id === productId);

  if (index > -1) {
    cartInfo[index].qty += 1;
  } else {
    cartInfo.push({ id: productId, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cartInfo));
  return cartInfo;
}