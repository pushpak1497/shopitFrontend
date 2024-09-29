export const getPriceQueryParams = (searchParams, key, value) => {
  const hasSearchParams = searchParams.has(key);

  if (value && hasSearchParams) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasSearchParams) {
    searchParams.delete(key);
  }
  return searchParams;
};

export const caluculateOrderCost = (cartItems) => {
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = (0.15 * itemsPrice).toFixed(2);
  console.log(typeof taxPrice);
  const totalPrice = (itemsPrice + shippingPrice + Number(taxPrice)).toFixed(2);
  return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};
