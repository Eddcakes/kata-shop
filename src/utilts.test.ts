import { describe, expect, it } from "vitest";
import { formatPrice } from "./utils";

const testCases = [
  { price: 500, expected: "£5.00" },
  { price: 13, expected: "£0.13" },
  { price: 1000, expected: "£10.00" },
  { price: 0, expected: "£0.00" },
  { price: undefined, expected: "£0.00" },
];

describe("formatPrice", () => {
  testCases.forEach(({ price, expected }) => {
    it(`should format price for ${price}`, () => {
      const result = formatPrice(price as number);
      expect(result).toBe(expected);
    });
  });
});
