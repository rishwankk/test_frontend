import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import image1 from "../assets/scroll1.png";
import image2 from "../assets/scroll1.png";
import image3 from "../assets/scroll1.png";

const images = [image1, image2, image3];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="w-full bg-black py-3 h-[300px]">
      <div className="flex items-center justify-between border-t-[10px] border-b-[10px] border-dashed border-white h-full">
        <ArrowLeft
          onClick={goToPrevious}
          className="text-white cursor-pointer hover:text-gray-400"
          size={40}
        />
        <div className="relative w-full overflow-hidden h-full flex items-center justify-center">
          <div
            className="flex transition-all duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="object-contain rounded-3xl mx-auto p-2
                           h-[90%] w-[90%] sm:h-[80%] sm:w-[80%] md:h-[50%] md:w-[50%] lg:h-[50%] lg:w-[50%]"
              />
            ))}
          </div>
        </div>
        <ArrowRight
          onClick={goToNext}
          className="text-white cursor-pointer hover:text-gray-400"
          size={40}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
