import { Box, Button, Text } from "@chakra-ui/react";
import { Basket } from "../models";

interface HeaderProps {
  basket: Basket;
}

export function Header({ basket }: HeaderProps) {
  const itemsInBasket = Object.values(basket).reduce(
    (acc = 0, curr = 0) => acc + curr,
    0
  );
  return (
    <Box as="header" p="4" bg="gray.800" color="white" display="flex">
      <Text fontSize="lg">kata-shop</Text>
      <Box as="span" ml="auto">
        <Text fontSize="lg">{itemsInBasket}</Text>
        <Button colorScheme="teal" ml="4">
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
