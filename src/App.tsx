import { FormEvent, useEffect, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { CheckoutModal } from "./components/checkout-modal";
import { Header } from "./components/header";
import { Plp } from "./components/plp";
import { PriceList, type Basket } from "./models";
import { data } from "./data";
import { priceListFromProductsList } from "./utils";

function App() {
  // would be fetched from an API, using react-query or RTK Query type solution for caching
  const [productsList, setProductsList] = useState(data);
  // basket state high in the tree as is used in both Header and Plp
  const [basket, setBasket] = useState<Basket>({});
  const [priceList, setPriceList] = useState<PriceList | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddToBasket = (sku: string, quantity: number) => {
    setBasket((prev: Basket) => {
      if (prev[sku]) {
        return { ...prev, [sku]: (prev[sku] += quantity) };
      } else {
        return { ...prev, [sku]: quantity };
      }
    });
  };

  const handleUpdateQuantity = (sku: string, quantity: number) => {
    setBasket((prev: Basket) => {
      return { ...prev, [sku]: quantity };
    });
  };

  const handleOpenCheckout = () => {
    // refetch priceList, if this has changed the effect will rerun to generate new priceList
    setProductsList(data);
    onOpen();
  };

  const handlePurchase = (evt: FormEvent) => {
    evt.preventDefault();
    // validation
    // API call to purchase items
    // clear basket
    console.log("Purchased items", basket);
    setBasket({});
    onClose();
  };

  // useEffect to simulate syncing with an API
  useEffect(() => {
    const priceListFromProducts = priceListFromProductsList(productsList);
    setPriceList(priceListFromProducts);
    return () => {
      setPriceList(null);
    };
  }, [productsList]);

  return (
    <Box>
      <Header
        basket={basket}
        priceList={priceList}
        openCheckout={handleOpenCheckout}
      />
      <Plp items={productsList} handleAddToBasket={handleAddToBasket} />
      <CheckoutModal
        isOpen={isOpen}
        onClose={onClose}
        basket={basket}
        priceList={priceList}
        handlePurchase={handlePurchase}
        handleUpdateQuantity={handleUpdateQuantity}
      />
    </Box>
  );
}

export default App;
