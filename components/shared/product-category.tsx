interface ProductCategoryProps {
    category: string
}

const ProductCategory = (props: ProductCategoryProps) => {
  const { category } = props;
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
        {category}
      </p>
    </div>
  );
};

export default ProductCategory;
