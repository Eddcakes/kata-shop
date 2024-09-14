import { Box, Button, Text } from "@chakra-ui/react";

export function Header() {
  return (
    <Box as="header" p="4" bg="gray.800" color="white" display="flex">
      <Text fontSize="lg">kata-shop</Text>
      <Box as="span" ml="auto">
        App bar |
        <Button colorScheme="teal" ml="4">
          items
        </Button>
      </Box>
    </Box>
  );
}
