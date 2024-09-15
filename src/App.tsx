import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Header } from "./components/header";
import { Plp } from "./components/plp";
import { type Basket } from "./models";
import { data } from "./data";

function App() {
  // basket state high in the tree as is used in both Header and Plp
  const [basket, setBasket] = useState<Basket>({});

  // would be fetched from an API, using react-query or RTK Query type solution for caching
  const productsList = data;

  const handleAddToBasket = (sku: string, quantity: number) => {
    setBasket((prev: Basket) => {
      if (prev[sku]) {
        return { ...prev, [sku]: (prev[sku] += quantity) };
      } else {
        return { ...prev, [sku]: quantity };
      }
    });
  };
  return (
    <Box>
      <Header basket={basket} />
      <Plp items={productsList} handleAddToBasket={handleAddToBasket} />
    </Box>
  );
}

export default App;
