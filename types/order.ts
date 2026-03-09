export type OrderType = {
  id: number;
  createdAt: string;
  orderStatus: string;
  products: {
    id: number;
    brand: string;
    model: string;
    price: number;
    quantity: number;
    image: { url: string };
  }[];
};