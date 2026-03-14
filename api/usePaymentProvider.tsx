import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { makePaymentRequest } from "./usePaymentRequest";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

export const usePayment = () => {
  const { user, token } = useAuth();
  const { items, removeAll } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<"stripe" | "mercadopago" | null>(null);

  const buyStripe = async () => {
    try {
      if (!user || !token) {
        router.push("/login");
        return;
      }

      setIsLoading("stripe");

      const res = await makePaymentRequest.post(
        "/api/orders",
        {
          products: items,
          paymentMethod: "stripe",
          userId: user.id,
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      window.location.href = res.data.url;
      removeAll();
    } catch (error) {
      console.log(error);
      setIsLoading(null);
    }
  };

  const buyMercadoPago = async () => {
    try {
      if (!user || !token) {
        router.push("/login?redirect=/cart");
        return;
      }

      setIsLoading("mercadopago");
      const res = await makePaymentRequest.post(
        "/api/orders",
        {
          products: items,
          paymentMethod: "mercadopago",
          userId: user.id,
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      window.location.href = res.data.initPoint;
      removeAll();
    } catch (error) {
      setIsLoading(null);
    }
  };

  return { buyStripe, buyMercadoPago, isLoading };
};