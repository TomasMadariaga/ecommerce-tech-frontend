"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "next/navigation";

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-4 sm:px-6 text-xl sm:text-3xl sm:pb-8">
        Productos destacados
      </h3>
      <Carousel className="px-2 sm:px-0">
        <CarouselContent className="-ml-1 md:-ml-4">
          {loading && <SkeletonSchema grid={3} className="flex gap-4 px-4 -ml-4 sm:ml-0 overflow-visible shrink-0 w-64 sm:w-72"/>}
          {result !== null &&
            result.map((product: ProductType) => {
              const { id, slug, images, model, price, brand } = product;

              return (
                <CarouselItem
                  key={id}
                  className="basis-2/3 sm:basis-1/2 lg:basis-1/3 group"
                >
                  <div className="py-1 px-1 sm:px-2">
                    <Card
                      onClick={() => router.push(`product/${slug}`)}
                      className="py-2 sm:py-4 border border-gray-200 shadow-none cursor-pointer"
                    >
                      <CardContent className="relative flex items-center justify-center p-2 h-28 sm:h-40 md:h-52 lg:h-64">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img
                            src={`${images[0].url}`}
                            alt="Image featured"
                            className="max-w-full max-h-full object-contain select-none rounded-md"
                          />
                          <div className="absolute hidden w-full transition duration-200 opacity-0 group-hover:opacity-100 bottom-2 sm:bottom-5 lg:block"></div>
                        </div>
                      </CardContent>
                      <div className="px-3 sm:px-6 pb-2 sm:pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                          <h3 className="text-xs sm:text-sm md:text-base font-semibold line-clamp-2 select-none">
                            {brand} {model}
                          </h3>
                          <p className="text-xs sm:text-sm md:text-base font-bold text-black dark:text-white select-none">
                            ${price}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious className="left-0 sm:left-4" />
        <CarouselNext className="right-0 sm:right-4" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
