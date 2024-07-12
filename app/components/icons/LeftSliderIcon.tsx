import React from 'react';

const LeftSliderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 80 80"
      fill="none"
    >
      <g filter="url(#filter0_d_5551_2974)">
        <circle
          cx="20"
          cy="20"
          r="20"
          transform="matrix(-1 0 0 1 50.5 10)"
          fill="white"
        />
      </g>
      <path
        d="M32.5 22L25.5 29L32.5 36"
        stroke="#3B2A00"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_5551_2974"
          x="3.5"
          y="5"
          width="54"
          height="54"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_5551_2974"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.211765 0 0 0 0 0.211765 0 0 0 0 0.211765 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5551_2974"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5551_2974"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LeftSliderIcon;
