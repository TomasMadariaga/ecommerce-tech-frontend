import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import Link from "next/link";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;


  return (
    <Link href={`/product/${product.slug}`}
      className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md h-fit w-4/5 sm:w-auto"
    >
      <div className="absolute flex items-center justify-between gap-3 px-2 z-1 top-4">
        <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
          {product.brand}
        </p>
        <p className="px-2 py-1 text-xs text-black bg-white rounded-full dark:bg-yellow-700 dark:text-white w-fit">
          {product.category?.categoryName}
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {product?.images?.map((image) => (
            <CarouselItem key={image.id} className="group">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                alt="Image"
                className="rounded-xl"
              />
              <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="text-2xl text-center">
        {product.brand} {product.model}
      </p>
      <p className="font-bold text-center">{formatPrice(product.price)}</p>
    </Link>
  );
};

export default ProductCard;
