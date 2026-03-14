"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import CartItem from "./components/cart-item";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { usePayment } from "@/api/usePaymentProvider";

export default function Page() {
  const { items } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { buyStripe, buyMercadoPago, isLoading } = usePayment();

  const prices = items?.map((product) => product?.price * product?.quantity);
  const totalPrice = prices.reduce((total, price) => total + price, 0);

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-5 text-3xl font-bold">Shopping Cart</h1>

      {!user && (
        <div className="bg-yellow-100 p-4 rounded-lg mb-4">
          <p className="text-yellow-800">
            Inicia sesión para guardar tu historial de compras
          </p>
          <Button
            variant="link"
            onClick={() => router.push("/login?redirect=/cart")}
            className="text-yellow-800 underline cursor-pointer"
          >
            Iniciar Sesión
          </Button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {items.length === 0 && <p>No hay productos en el carrito</p>}
          <ul>
            {items.map((item) => (
              <CartItem key={item?.id} product={item} />
            ))}
          </ul>
        </div>
        <div className="max-w-xl">
          <div className="p-6 rounded-lg bg-slate-100">
            <p className="mb-3 text-lg font-semibold dark:text-black">
              Order summary
            </p>
            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p className="dark:text-black">Order total</p>
              <p className="dark:text-black">{formatPrice(totalPrice)}</p>
            </div>

            <div className="flex flex-col items-center justify-center w-full mt-3 gap-3">
              <Button
                className="w-full dark:bg-black dark:text-white transition duration-200 cursor-pointer relative"
                onClick={buyStripe}
                disabled={isLoading !== null}
              >
                {isLoading === "stripe" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Pagar con Tarjeta"
                )}
              </Button>

              <Button
                className="w-full bg-[#009EE3] hover:bg-[#0086c0] text-white transition duration-200 cursor-pointer relative"
                onClick={buyMercadoPago}
                disabled={isLoading !== null}
              >
                {isLoading === "mercadopago" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Pagar con Mercado Pago"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
