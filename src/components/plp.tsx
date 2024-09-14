import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Card } from "./card";

export function Plp() {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" p="4">
        Products
      </Text>
      <SimpleGrid p={4} columns={{ base: 1, md: 3 }}>
        <Card />
        <Card />
        <Card />
        <Card />
      </SimpleGrid>
    </Box>
  );
}
