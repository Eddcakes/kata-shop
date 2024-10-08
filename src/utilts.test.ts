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

const baskets = [
  {
    basket: { a: 2, c: 1 },
    expected: {
      total: 200,
      feedback: {
        a: "Offer: add 2 more to benefit from 3 for 130",
      },
    },
  },
  {
    basket: { a: 5, d: 2 },
    expected: {
      total: 290,
      feedback: {
        a: "Offer: add 2 more to benefit from 3 for 130",
      },
    },
  },
  {
    basket: { c: 5, b: 4 },
    expected: {
      total: 530,
      feedback: { b: "Offer: add 1 more to benefit from 3 for 20" },
    },
  },
];

const priceList = {
  a: { price: 50, offer: "3 for 130" },
  b: { price: 10, offer: "3 for 20" },
  c: { price: 100, offer: null },
  d: { price: 30, offer: null },
};

describe("calculateBasketTotal", () => {
  baskets.forEach(({ basket, expected }) => {
    it(`should calculate the correct total for a basket: ${expected.total}`, () => {
      const result = calculateBasketTotal(basket, priceList);
      expect(result).toEqual(expected);
    });
  });
});
