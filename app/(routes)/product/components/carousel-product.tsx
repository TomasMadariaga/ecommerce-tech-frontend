import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselProductProps {
  images: {
    id: number;
    url: string;
  }[];
}

const CarouselProduct = (props: CarouselProductProps) => {
  const { images } = props;
  return (
    <div className="sm:px-16 w-3/4 sm:w-auto">
      <Carousel>
        <CarouselContent>
            {images?.map((image) => (
                <CarouselItem key={image.id}>
                    <img src={`${image.url}`} alt="Image product" className="rounded-lg"/>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default CarouselProduct;
