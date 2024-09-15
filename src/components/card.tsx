import {
  Box,
  Button,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { formatPrice } from "../utils";
import { Product } from "../models";
import { useState } from "react";

interface CardProps {
  product: Product;
  handleAddToBasket: (sku: string, quantity: number) => void;
}

export function Card({ product, handleAddToBasket }: CardProps) {
  const { sku, price, offer } = product;
  const [quantity, setQuantity] = useState(1);

  return (
    <Box maxW={{ base: "100%", md: "200px" }}>
      <Image src="https://placehold.co/200x100" alt="placeholder" />
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Box>{sku}</Box>
          <Box>{formatPrice(price)}</Box>
        </Box>
        <Box color="red.500" textAlign="center">
          {offer}
        </Box>
        <Box>
          <NumberInput
            step={1}
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(parseInt(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            onClick={() => {
              handleAddToBasket(sku, quantity);
              setQuantity(1);
            }}
          >
            Add to basket
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
