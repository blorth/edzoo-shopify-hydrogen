import React, {HTMLProps} from 'react';

type IconBagProps = HTMLProps<HTMLBaseElement>;

const IconBag: React.FC<IconBagProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
    >
      <path
        d="M5.04004 4.66971V2.53787C5.04004 0.245873 9.04004 0.470873 9.04004 2.53787V4.66971M1 5.09784H13V15.0978H1V5.09784Z"
        stroke="#363636"
      />
    </svg>
  );
};

export default IconBag;
