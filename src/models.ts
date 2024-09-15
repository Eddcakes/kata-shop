export interface Product {
  sku: string;
  price: number;
  offer: string | null;
}

export interface Basket {
  [sku: string]: number;
}
