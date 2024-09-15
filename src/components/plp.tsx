import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Card } from "./card";
import { type Product } from "../models";

interface PlpProps {
  items: Product[];
  handleAddToBasket: (sku: string, quantity: number) => void;
}

export function Plp({ items, handleAddToBasket }: PlpProps) {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" p="4">
        Products
      </Text>
      <SimpleGrid p={4} columns={{ base: 1, md: 3 }}>
        {items.map((product) => {
          return (
            <Card
              key={product.sku}
              product={product}
              handleAddToBasket={handleAddToBasket}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
