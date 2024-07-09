import Slider from '@ant-design/react-slick';
import {Image} from '@shopify/hydrogen';
import React from 'react';

type ImageCarouselProps = {
  images: any[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({images}) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!images) return null;

  return (
    <div className="ImageCarousel max-w-[400px]">
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <div key={index}>
              <Image data={image} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
