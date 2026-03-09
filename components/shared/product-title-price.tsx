import { formatPrice } from "@/lib/formatPrice";

interface ProductTitlePriceProps {
    brand: string,
    model: string,
    price: number
}

const ProductTitlePrice = (props: ProductTitlePriceProps) => {
    const {brand, model, price} = props
  return (
    <>
      <h2 className="text-lg font-bold">
        {brand} {model}
      </h2>
      <p className="font-bold">{formatPrice(price)}</p>
    </>
  );
};

export default ProductTitlePrice;
