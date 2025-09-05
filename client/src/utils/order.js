export function setOrder(productId) {
  if (!productId) return;
  const cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cartInfo.findIndex((item) => item.id === productId);

  if (index > -1) {
    cartInfo[index].qty += 1;
  } else {
    cartInfo.push({ id: productId, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartInfo));
  return cartInfo;
}