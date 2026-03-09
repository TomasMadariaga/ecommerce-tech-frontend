import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { toast } from "sonner";
import { ProductType } from "@/types/product";

interface CartItem extends ProductType {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
          toast(
            `✅ ${data.brand} ${data.model}: ahora tienes ${Number(existingItem.quantity + 1)} unidades`,
          );
        } else {
          set({
            items: [...get().items, { ...data, quantity: 1 }],
          });
          toast(`🛍️ ${data.brand} ${data.model} añadido al carrito`);
        }
      },
      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast("Producto eliminado del carrito 🗑️");
      },
      updateQuantity: (id: number, quantity: number) => {
        if (quantity < 1) return;

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
export const useCartTotal = () => {
  const items = useCart((state) => state.items);
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
