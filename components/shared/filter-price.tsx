import { Slider } from "../ui/slider";

type FilterPriceProps = {
  setPrice: (price: [number, number]) => void;
  price: [number, number];
};

const FilterPrice = ({ setPrice, price }: FilterPriceProps) => {
    
  const handleChange = (value: number[]) => {
    if (value.length !== 2) return;

    setPrice([value[0], value[1]]);
  };

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Precio</p>

      <p className="text-sm text-muted-foreground mb-2">
        ${price[0]} - ${price[1]}
      </p>

      <div className="px-2">
        <Slider
        className="w-[150px]"
          value={price}
          min={0}
          max={2000}
          step={10}
          onValueChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FilterPrice;
