import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Checkout } from "./checkout";
import { Basket, PriceList } from "../models";
import { FormEvent } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  basket: Basket;
  priceList: PriceList | null;
  handlePurchase: (evt: FormEvent) => void;
  handleUpdateQuantity: (sku: string, quantity: number) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  basket,
  priceList,
  handlePurchase,
  handleUpdateQuantity,
}: CheckoutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Checkout
            basket={basket}
            priceList={priceList}
            handlePurchase={handlePurchase}
            closeModal={onClose}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
