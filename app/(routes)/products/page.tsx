"use client";

import { Separator } from "@/components/ui/separator";
import { useGetProducts } from "@/api/getProducts";
import { useEffect, useState } from "react";
import SkeletonSchema from "@/components/skeletonSchema";
import { ProductType } from "@/types/product";
import ProductCard from "../category/components/product-card";
import { ResponseType } from "@/types/response";
import FiltersControlsProducts from "./components/filter-controls-products";
import SkeletonFilterSchema from "@/components/skeletonFilterSchema";

export default function Page() {
  const { result, loading }: ResponseType = useGetProducts();
  const maxPrice = 2000;

  const [filterBrand, setFilterBrand] = useState("");

  const [price, setPrice] = useState<[number, number]>([0, maxPrice]);

  const filteredProducts =
    result?.filter((product: ProductType) => {
      const matchesBrand = filterBrand === "" || product.brand === filterBrand;

      const matchesPrice =
        product.price >= price[0] && product.price <= price[1];

      return matchesBrand && matchesPrice;
    }) ?? [];

  useEffect(() => {
    if (!result || result.length === 0) return;

    const highestPrice = Math.max(
      ...result.map((product: ProductType) => product.price),
    );

    setPrice([0, highestPrice]);
  }, [result]);

  return (
    <div className="max-w-6xl p-4 mx-auto sm:py-16 sm:px-24">
        <h1 className="text-3xl font-medium">Productos</h1>
      
      <Separator />

      <div className="sm:flex sm:justify-between">
        {loading && <SkeletonFilterSchema grid={1}/>}
        {!loading && (
          <FiltersControlsProducts
            setFilterBrand={setFilterBrand}
            price={price}
            setPrice={setPrice}
          />
        )}

        <div className="sm:grid flex flex-col items-center gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {loading && <SkeletonSchema grid={3} />}
          {filteredProducts !== null &&
            !loading &&
            filteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          {!loading && filteredProducts.length === 0 && (
            <p className="col-span-2 text-center text-gray-500">
              No hay productos con esta marca en esta categoría
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
