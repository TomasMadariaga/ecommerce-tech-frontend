import FilterPrice from "@/components/shared/filter-price";
import FilterBrand from "./filter-brand";

type FiltersControlsProductsProps = {
    setFilterBrand: (brand: string) => void,
    setPrice: (price: [number, number]) => void,
    price: [number, number]
}

const FiltersControlsProducts = (props: FiltersControlsProductsProps) => {
    const {setFilterBrand, setPrice, price} = props;

    return ( 
        <div className="sm:w-[250px] sm:sticky sm:top-25 h-fit">
      <FilterBrand
        setFilterBrand={setFilterBrand}
      />
      <FilterPrice setPrice={setPrice} price={price}/>
    </div>
     );
}
 
export default FiltersControlsProducts;