"use client";

import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/formatPrice";
import { useGetOrders } from "@/api/getOrders";

export default function OrdersPage() {
  const { user } = useAuth();
  const { loading, orders, error } = useGetOrders();

  if (loading) {
    return <div className="text-center py-20">Cargando...</div>;
  }
  console.log(orders)

  if (!user) {
    return (
      <div className="text-center py-20">
        Inicia sesión para ver tus pedidos
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No tienes pedidos aún</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  {order.products.map((product, i) => (
                    <div key={i} className="flex gap-5 my-2">
                      <img
                        src={`${product?.image}`}
                        alt="Product image"
                        className="h-24 rounded-lg"
                      />
                      <div>
                        <h2 className="text-xl">
                          {product.brand} {product.model}
                        </h2>
                        <p>
                          {" "}
                          <span className="text-gray-400">
                            x{product.quantity}
                          </span>{" "}
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    {formatPrice(
                      order.products.reduce(
                        (sum: number, product: any) =>
                          sum + product.price * product.quantity,
                        0,
                      ),
                    )}
                  </p>
                  <p
                    className={`text-sm ${
                      order.orderStatus === "approved"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
