import Slider from '@ant-design/react-slick';
import {Image} from '@shopify/hydrogen';
import React from 'react';
import LeftSliderIcon from './icons/LeftSliderIcon';
import RightSliderIcon from './icons/RightSliderIcon';

type ImageCarouselProps = {
  images: any[];
};

const CustomNextArrow = (props: any) => {
  const {className, style, onClick} = props;
  return (
    <div
      className={`${className}`}
      style={{
        ...style,
        display: 'block',
        right: '-35px',
        transform: 'scale(1.7)',
        color: 'black',
      }}
      onClick={onClick}
    >
      <RightSliderIcon />
    </div>
  );
};

const CustomPrevArrow = (props: any) => {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        left: '-50px',
        transform: 'scale(1.7)',
        color: 'black',
      }}
      onClick={onClick}
    >
      <LeftSliderIcon />
    </div>
  );
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({images}) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  if (!images) return null;

  return (
    <div className="ImageCarousel mob:w-[280px] tab:w-[250px] max-w-[500px]">
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
          .slick-next:before,
          .slick-prev:before {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default ImageCarousel;
