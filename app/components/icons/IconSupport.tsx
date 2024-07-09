import {SVGProps} from 'react';

const IconSupport = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#A59674"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 10.164h1.5v7H4a1.5 1.5 0 0 1-1.5-1.5v-4a1.5 1.5 0 0 1 1.5-1.5ZM18.5 10.164H20a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-1.5v-7Z"
    />
    <path
      stroke="#A59674"
      d="M4.626 9.716V7.824c0-3.21 3.541-6.488 7.188-6.488s7.4 2.815 7.4 6.488v1.892M12.5 22.163a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
    <path
      stroke="#A59674"
      strokeLinecap="round"
      d="M14.629 20.163a4.862 4.862 0 0 0 4.916-2.658"
    />
  </svg>
);
export default IconSupport;
