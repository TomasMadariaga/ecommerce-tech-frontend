import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
  return (
    <>
      <div className="mt-4 text-center">
        <h4 className="mt-2 text-5xl font-extrabold uppercase">
          PC Gaming
        </h4>
        <p className="my-2 text-lg">Encuentra tu pasión con nuestros productos</p>
        <Link href="/products" className={buttonVariants()}>
          Comprar
        </Link>
      </div>
      <div className="h-87.5 bg-cover lg:h-150 bg-[url('/slider-image.jpg')] bg-center mt-5"/>
    </>
  );
};

export default BannerProduct;
