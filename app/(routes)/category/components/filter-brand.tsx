import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FilterBrandProps = {
  setFilterBrand: (brand: string) => void;
  availableBrands: string[];
};

const FilterBrand = (props: FilterBrandProps) => {
  const { setFilterBrand, availableBrands } = props;

  if (availableBrands.length === 0) {
    return null;
  }

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Marca</p>
      
      <RadioGroup onValueChange={(value) => setFilterBrand(value)} defaultValue="">
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="" id="all" />
          <Label htmlFor="all" className="cursor-pointer">
            Todas las marcas
          </Label>
        </div>

        {availableBrands.map((brand: string) => (
          <div key={brand} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={brand} id={brand} />
            <Label htmlFor={brand} className="cursor-pointer">
              {brand}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {availableBrands.length === 0 && (
        <p className="text-sm text-gray-500">No hay marcas disponibles</p>
      )}
    </div>
  );
};

export default FilterBrand;