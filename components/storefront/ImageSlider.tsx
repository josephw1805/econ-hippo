"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }
  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={images[mainImageIndex]}
          alt="product image"
          width={600}
          height={600}
          priority
          className="object-cover w-full h-auto"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={handlePreviousClick} variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button onClick={handleNextClick} variant="ghost" size="icon">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setMainImageIndex(index)}
            className={cn(
              index === mainImageIndex
                ? "border-2 border-primary"
                : "border border-gray-200",
              "relative overflow-hidden rounded-lg cursor-pointer flex-shrink-0",
              "w-[100px] h-[100px]"
            )}
          >
            <Image
              src={image}
              alt="product image"
              width={100}
              height={100}
              className="object-cover object-top w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
