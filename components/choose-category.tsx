"use client";
import { useGetCategory } from "@/api/getCategory";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategory();

  return (
    <div className="max-w-6xl py-8 mx-auto sm:py-16 sm:px-24">
      <div className="px-4 sm:px-6 mb-8 sm:mb-12">
        <h3 className="mt-2 text-5xl font-extrabold uppercase">
          Nuestras categorías
        </h3>
        <p className="my-2 text-lg">
          Descubre nuestra amplia selección de productos organizados por categoría
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-0">
        {!loading &&
          result !== undefined &&
          result?.map((category: CategoryType) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative block overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-square sm:aspect-4/3 overflow-hidden bg-gray-100">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`}
                  alt={category.categoryName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-center">
                  <p className="text-white font-bold text-sm sm:text-base lg:text-lg">
                    {category.categoryName}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-square sm:aspect-4/3 rounded-xl sm:rounded-2xl bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChooseCategory;