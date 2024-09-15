import { describe, expect, it } from "vitest";
import { calculateBasketTotal, formatPrice } from "./utils";

const formatPrices = [
  { price: 500, expected: "£5.00" },
  { price: 13, expected: "£0.13" },
  { price: 1000, expected: "£10.00" },
  { price: 0, expected: "£0.00" },
  { price: undefined, expected: "£0.00" },
];

describe("formatPrice", () => {
  formatPrices.forEach(({ price, expected }) => {
    it(`should format price for ${price}`, () => {
      const result = formatPrice(price as number);
      expect(result).toBe(expected);
    });
  });
});

const basket = {
  a: 2,
  c: 1,
};

const priceList = {
  a: { price: 50, offer: "3 for 130" },
  b: { price: 10, offer: "3 for 20" },
  c: { price: 100, offer: null },
  d: { price: 30, offer: null },
};

// calculate basket
describe("calculateBasketTotal", () => {
  it("should calculate the total for a basket", () => {
    const result = calculateBasketTotal(basket, priceList);
    expect(result).toBe(200);
  });
});
