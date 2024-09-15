import {
  Box,
  Button,
  Divider,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import type { Basket, PriceList } from "../models";
import { calculateBasketTotal, formatPrice } from "../utils";
import { FormEvent } from "react";

interface CheckoutProps {
  basket: Basket;
  priceList: PriceList | null;
  handlePurchase: (evt: FormEvent) => void;
  closeModal: () => void;
  handleUpdateQuantity: (sku: string, quantity: number) => void;
}

export function Checkout({
  basket,
  priceList,
  handlePurchase,
  closeModal,
  handleUpdateQuantity,
}: CheckoutProps) {
  const total = calculateBasketTotal(basket, priceList);
  if (priceList == null) {
    return <Text>No price list found</Text>;
  }
  return (
    <Box as="form" onSubmit={handlePurchase}>
      <BasketItems
        basket={basket}
        priceList={priceList}
        handleUpdateQuantity={handleUpdateQuantity}
      />
      <Box display="flex" py={4} justifyContent="space-between">
        <Text fontSize="lg">Basket price: {formatPrice(total)}</Text>
        <Box display="flex">
          <Button onClick={closeModal}>Cancel</Button>
          <Button colorScheme="teal" ml="4" type="submit">
            Buy now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

interface BasketItemsProps {
  basket: Basket;
  priceList: PriceList;
  handleUpdateQuantity: (sku: string, quantity: number) => void;
}

function BasketItems({
  basket,
  priceList,
  handleUpdateQuantity,
}: BasketItemsProps) {
  return (
    <Box>
      {basket &&
        Object.keys(basket).map((sku) => {
          if (priceList[sku] == null) {
            return <Text key={sku}>No price found for SKU: {sku}</Text>;
          }
          const price = priceList[sku].price;
          const quantity = basket[sku];
          const offer = priceList[sku].offer;
          // our Basket type allows undefined, but we know it's defined here so we cast to number
          return (
            <Item
              key={sku}
              sku={sku}
              price={price}
              offer={offer}
              quantity={quantity as number}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          );
        })}
    </Box>
  );
}

interface ItemProps {
  sku: string;
  price: number;
  offer: string | null;
  quantity: number;
  handleUpdateQuantity: (sku: string, quantity: number) => void;
}

function Item({
  sku,
  price,
  offer,
  quantity,
  handleUpdateQuantity,
}: ItemProps) {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Text>{sku}</Text>
        <Text>{formatPrice(price)}</Text>
      </Box>
      {offer && (
        <Text color="red.500" textAlign="center">
          {offer}
        </Text>
      )}
      <Box></Box>

      <NumberInput
        step={1}
        min={0}
        value={quantity}
        onChange={(value) => handleUpdateQuantity(sku, parseInt(value))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Divider pt={2} />
    </Box>
  );
}
