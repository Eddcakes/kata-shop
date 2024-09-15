import { Box, Button, Text } from "@chakra-ui/react";
import type { Basket, PriceList } from "../models";
import { calculateBasketTotal, formatPrice } from "../utils";

interface HeaderProps {
  basket: Basket;
  priceList: PriceList | null;
}

export function Header({ basket, priceList }: HeaderProps) {
  const itemsInBasket = Object.values(basket).reduce(
    (acc = 0, curr = 0) => acc + curr,
    0
  );
  const total = calculateBasketTotal(basket, priceList);
  return (
    <Box as="header" p="4" bg="gray.800" color="white" display="flex">
      <Text fontSize="lg">kata-shop</Text>
      <Box as="span" ml="auto">
        <Text fontSize="lg">items: {itemsInBasket}</Text>
        <Text fontSize="lg">{formatPrice(total)}</Text>
        <Button colorScheme="teal" ml="4">
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
