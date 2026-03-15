import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";
import { useState } from "react";

type FilterBrandProps = {
  setFilterBrand: (brand: string) => void;
};

const FilterBrand = (props: FilterBrandProps) => {
  const { setFilterBrand } = props;
  const { result, loading }: FilterTypes = useGetProductField();
  const [showBrands, setShowbrands] = useState(false);

  const brands: [] = result?.schema?.attributes?.brand?.enum || [];

  const slicedBrands = showBrands ? brands : brands.slice(0, 5);
  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Marca</p>

      <RadioGroup
        onValueChange={(value) => setFilterBrand(value)}
        defaultValue=""
      >
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="" id="all" />
          <Label htmlFor="all" className="cursor-pointer">
            Todas las marcas
          </Label>
        </div>

        {slicedBrands.map((brand: string) => (
          <div key={brand} className={`flex items-center space-x-2 mb-2`}>
            <RadioGroupItem value={brand} id={brand} />
            <Label htmlFor={brand} className="cursor-pointer">
              {brand}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {
        <p
          onClick={() => setShowbrands(!showBrands)}
          className="text-center cursor-pointer underline w-37.5"
        >
          {!showBrands ? "Ver mas..." : "Ver menos"}
        </p>
      }
    </div>
  );
};

export default FilterBrand;
