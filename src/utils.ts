import type { PriceList, Basket, Product } from "./models";

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
  // could be a logger service that pushes to a logging service and removes console logs in production
  console.log(message);
};

interface BasketTotal {
  total: number;
  feedback: Record<string, string>;
}

export const calculateBasketTotal = (
  basket: Basket,
  priceList: PriceList | null
): BasketTotal => {
  // initialise total and feedback
  const basketTotal = { total: 0, feedback: {} as Record<string, string> };
  if (priceList == null) {
    logger("No price list found");
    basketTotal.feedback = { error: "No price list found" };
    return basketTotal;
  }
  Object.keys(basket).forEach((sku) => {
    // should never be null|undefined, but avoids ignoring TS error
    if (basket[sku] == null) return;
    if (priceList[sku] == null) {
      logger(`No price found for SKU: ${sku}`);
      basketTotal.feedback[sku] = "No price found";
      return;
    }
    const price = priceList[sku].price;
    const quantity = basket[sku];
    const offer = priceList[sku].offer;
    if (offer != null) {
      const { offerQuantity, offerPrice } = offerHelper(offer);
      const remainder = quantity % offerQuantity;
      if (remainder > 0) {
        logger(`Offer: add ${remainder} more to benefit from ${offer}`);
        basketTotal.feedback[
          sku
        ] = `Offer: add ${remainder} more to benefit from ${offer}`;
      }
      // at offer
      const offersUsed = Math.floor(quantity / offerQuantity);
      const offerCost = offersUsed * offerPrice;
      const remainderCost = remainder * price;
      // how many times offer is applicable
      basketTotal.total += offerCost + remainderCost;
      return;
    }
    basketTotal.total += price * quantity;
  });
  return basketTotal;
};

// helper to extract offer quantity and price from offer string
const offerHelper = (offerText: string) => {
  const [quantity, price] = offerText.split(" for ");
  return {
    offerQuantity: parseInt(quantity),
    offerPrice: parseInt(price),
  };
};

export const priceListFromProductsList = (
  productsList: Product[]
): PriceList => {
  const priceList: PriceList = {};
  for (const product of productsList) {
    if (product.price == null) {
      logger(`Product with SKU: ${product.sku} is missing a price`);
    }
    if (priceList[product.sku] != null) {
      logger(`Duplicate SKU: ${product.sku} found`);
    }
    priceList[product.sku] = { price: product.price, offer: product.offer };
  }
  return priceList;
};
