import FilterPrice from "@/components/shared/filter-price";
import FilterBrand from "./filter-brand";

type FiltersControlsCategoryProps = {
  setFilterBrand: (brand: string) => void;
  availableBrands: string[];
  setPrice: (price: [number, number]) => void;
  price: [number, number];
};

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
  const { setFilterBrand, availableBrands, setPrice, price } = props;

  return (
    <div className="sm:w-[250px] sm:sticky sm:top-25 h-fit">
      <FilterBrand
        setFilterBrand={setFilterBrand}
        availableBrands={availableBrands}
      />
      <FilterPrice setPrice={setPrice} price={price}/>
    </div>
  );
};

export default FiltersControlsCategory;
