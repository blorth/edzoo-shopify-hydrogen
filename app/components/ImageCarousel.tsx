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
    <div className="ImageCarousel mob:w-[280px] tab:w-[250px] max-w-[450px]">
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <div key={index}>
              <Image data={image} />
            </div>
          );
        })}
      </Slider>
      <style jsx>
        {`
          .slick-arrow {
            transform: scale(1.7);
            color: black;
          }
          .slick-next:before,
          .slick-prev:before {
            color: grey;
          }
          .slick-next {
            right: -40px;
          }
          .slick-prev {
            left: -40px;
          }
        `}
      </style>
    </div>
  );
};

export default ImageCarousel;
