import { type PriceList, type Basket } from "./models";

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

export const calculateBasketTotal = (basket: Basket, priceList: PriceList) => {
  let total = 0;
  Object.keys(basket).forEach((sku) => {
    // should never be null|undefined, but avoids ignoring TS error
    if (basket[sku] == null) return;
    const price = priceList[sku].price;
    const quantity = basket[sku];
    const offer = priceList[sku].offer;
    if (offer != null) {
      const { offerQuantity, offerPrice } = offerHelper(offer);
      const remainder = quantity % offerQuantity;
      if (remainder > 0) {
        logger(`Offer: add ${remainder} more to benifit from ${offer}`);
      }
      // at offer
      const offersUsed = Math.floor(quantity / offerQuantity);
      const offerCost = offersUsed * offerPrice;
      const remainderCost = remainder * price;
      // how many times offer is applicable
      total += offerCost + remainderCost;
      return;
    }
    total += price * quantity;
  });
  return total;
};

// helper to extract offer quantity and price from offer string
const offerHelper = (offerText: string) => {
  const [quantity, price] = offerText.split(" for ");
  return {
    offerQuantity: parseInt(quantity),
    offerPrice: parseInt(price),
  };
};
