"use client";

import { Separator } from "@/components/ui/separator";
import { useGetProducts } from "@/api/getProducts";
import { useEffect, useState } from "react";
import SkeletonSchema from "@/components/skeletonSchema";
import { ProductType } from "@/types/product";
import ProductCard from "../category/components/product-card";
import { ResponseType } from "@/types/response";
import FiltersControlsProducts from "./components/filter-controls-products";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonFilterSchema from "@/components/skeletonFilterSchema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { result, loading }: ResponseType = useGetProducts();
  const maxPrice = 2000;

  const [filterBrand, setFilterBrand] = useState("");
  const [price, setPrice] = useState<[number, number]>([0, maxPrice]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
      <div className="flex items-center justify-between mb-2">
        {result !== null && !loading ? (
          <h1 className="text-3xl font-medium">Productos</h1>
        ) : (
          <Skeleton className="h-9 w-50 rounded-xl hidden sm:block" />
        )}

        {!loading && (
          <Button
            variant="outline"
            size="sm"
            className="sm:hidden flex items-center gap-2"
            onClick={() => setShowMobileFilters(true)}
          >
            <Filter size={18} />
            Filtros
          </Button>
        )}
      </div>

      <Separator />

      {showMobileFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setShowMobileFilters(false)}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 z-50 p-6 shadow-xl
          transform transition-transform duration-300 ease-in-out
          sm:hidden
          ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <FiltersControlsProducts
          setFilterBrand={setFilterBrand}
          price={price}
          setPrice={setPrice}
        />
      </div>

      <div className="sm:flex sm:justify-between">
        <div className="hidden sm:block">
          {loading && <SkeletonFilterSchema />}
          {!loading && (
            <FiltersControlsProducts
              setFilterBrand={setFilterBrand}
              price={price}
              setPrice={setPrice}
            />
          )}
        </div>

        <div className="grid grid-cols-2 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10 justify-items-center">
          {loading && <SkeletonSchema grid={6}/>}
          {filteredProducts !== null &&
            !loading &&
            filteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product}/>
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
