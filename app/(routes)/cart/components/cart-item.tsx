import ProductCategory from "@/components/shared/product-category";
import ProductImage from "@/components/shared/product-image";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X, Minus, Plus } from "lucide-react";

interface CartItemProps {
  product: ProductType & { quantity: number };
}

const CartItem = (props: CartItemProps) => {
  const { product } = props;
  const { removeItem, updateQuantity } = useCart();

  const subtotal = product.price * product.quantity;

  return (
    <li className="flex py-6 border-b">
      <ProductImage slug={product.slug} url={product.images[0]?.url} />
      
      <div className="flex justify-between flex-1 px-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">
            {product.brand} {product.model}
          </h2>
          
          <div className="flex items-center gap-4 mt-1">
            <p className="font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-md transition disabled:opacity-50"
                disabled={product.quantity <= 1}
              >
                <Minus size={14} />
              </button>
              
              <span className="w-8 text-center text-sm font-medium">
                {product.quantity}
              </span>
              
              <button
                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-md transition"
              >
                <Plus size={14} />
              </button>
            </div>
            <p>Subtotal: {formatPrice(subtotal)}</p>
          </div>

          <ProductCategory category={product.category?.categoryName || "Sin categoría"} />
        </div>

        {/* Botón eliminar */}
        <div>
          <button
            className={cn(
              "rounded-full flex items-center justify-center bg-white dark:text-black border shadow-md p-1 hover:scale-110 transition hover:bg-red-50 dark:hover:bg-red-900/20"
            )}
            onClick={() => removeItem(product.id)}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;