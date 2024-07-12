import React from 'react';

const RightSliderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 80 80"
      fill="none"
    >
      <g filter="url(#filter0_d_5551_2979)">
        <circle cx="30.5" cy="30" r="20" fill="white" />
      </g>
      <path
        d="M28.5 22L35.5 29L28.5 36"
        stroke="#3B2A00"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_5551_2979"
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
            result="effect1_dropShadow_5551_2979"
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
            result="effect1_dropShadow_5551_2979"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5551_2979"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default RightSliderIcon;
