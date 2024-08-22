import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const banner = [
  {
    id: 0,
    url: "https://utfs.io/f/e46d9949-4b46-425d-851d-5ab00b8446e7-n3ch5g.png",
  },
  {
    id: 1,
    url: "https://utfs.io/f/9c6060f7-74c3-400d-9a8c-4bece2918be1-5km7wa.jpg",
  },
];

export function Hero() {
  return (
    <Carousel>
      <CarouselContent>
        {banner.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                src={item.url}
                alt="Banner Image"
                fill
                priority
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
