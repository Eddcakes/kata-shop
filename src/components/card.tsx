import { Box, Image } from "@chakra-ui/react";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export function Card() {
  const data = {
    sku: String.fromCharCode(getRandomInt(26) + 97),
    price: 50,
    offer: getRandomInt(2) > 0 ? "3 for 130" : null,
  };
  return (
    <Box maxW={{ base: "100%", md: "200px" }}>
      <Image src="https://placehold.co/200x100" alt="placeholder" />
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Box>{data.sku}</Box>
          <Box>{data.price}</Box>
        </Box>
        <Box color="red.500" textAlign="center">
          {data.offer}
        </Box>
      </Box>
    </Box>
  );
}
