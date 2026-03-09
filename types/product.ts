export type ProductType = {
  id: number;
  slug: string;
  images: {
    id: number;
    url: string;
  }[];
  model: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  brand: string;
  price: number;
  category: {
    id: number;
    categoryName: string;
    slug: string;
  };
};
