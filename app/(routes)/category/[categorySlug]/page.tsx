"use client";

import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import FiltersControlsCategory from "../components/filters-controls-category";
import SkeletonSchema from "@/components/skeletonSchema";
import { ProductType } from "@/types/product";
import { useState, useMemo } from "react";
import ProductCard from "../components/product-card";
import SkeletonFilterSchema from "@/components/skeletonFilterSchema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const params = useParams();
  const categorySlug = params?.categorySlug as string;
  const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug);
  const maxPrice = 2000;

  const [filterBrand, setFilterBrand] = useState("");
  const [price, setPrice] = useState<[number, number]>([0, maxPrice]);

  const availableBrands = useMemo(() => {
    if (!result) return [];

    const brands: string[] = result.map(
      (product: ProductType) => product.brand,
    );
    return [...new Set(brands)];
  }, [result]);

  const filteredProducts = useMemo(() => {
    if (!result || loading) return [];

    return result.filter((product: ProductType) => {
      const matchesBrand = filterBrand === "" || product.brand === filterBrand;

      const matchesPrice =
        product.price >= price[0] && product.price <= price[1];

      return matchesBrand && matchesPrice;
    });
  }, [result, loading, filterBrand, price]);

  return (
    <div className="max-w-6xl p-4 mx-auto sm:py-16 sm:px-24">
      {result !== null && !loading ? (
        <h1 className="text-3xl font-medium">
          {result[0]?.category.categoryName}
        </h1>
      ) : <Skeleton className="h-9 w-50 rounded-xl hidden sm:block"/>}
      <Separator />

      <div className="sm:flex sm:justify-between">
        {loading && <SkeletonFilterSchema grid={1}/>}
        {!loading && (
          <FiltersControlsCategory
            setFilterBrand={setFilterBrand}
            availableBrands={availableBrands}
            price={price}
            setPrice={setPrice}
          />
        )}

        <div className="sm:grid flex flex-col items-center gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {loading && <SkeletonSchema grid={3} />}

          {!loading &&
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
