import { type Basket } from "./models";

// assuming price is in pennies
export const formatPrice = (price: number) => {
  let priceString = "";
  switch (true) {
    case price == null:
      priceString = "0.00";
      break;
    case price.toString().length === 1:
      priceString = `0.0${price}`;
      break;
    case price.toString().length === 2:
      priceString = `0.${price}`;
      break;
    default:
      priceString = `${price.toString().slice(0, -2)}.${price
        .toString()
        .slice(-2)}`;
      break;
  }
  return `£${priceString}`;
};

export const logger = (message: string) => {
  // could be a logger service
  console.log(message);
};

// will need to create a system for offers
export const calculateBasketTotal = (basket: Basket, priceList) => {
  let total = 0;
  Object.keys(basket).forEach((sku) => {
    console.log(`sku: ${sku}`);
    const price = priceList[sku].price;
    const quantity = basket[sku];
    total += price * quantity;
  });
  return total;
};
