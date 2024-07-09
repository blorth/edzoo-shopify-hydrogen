import {Button, extendVariants} from '@nextui-org/react';

export const MyButton = extendVariants(Button, {
  variants: {
    color: {
      green:
        'text-[#FFFFFF] bg-[#53A500] font-volkhov hidden md:block rounded-sm font-semibold tracking-wide uppercase',
      brown:
        'bg-[#D4784C] text-[#fff] font-volkhov hidden md:block rounded-sm font-semibold tracking-wide uppercase',
      violet: 'bg-[#8b5cf6] text-[#fff]',
    },
  },
  defaultVariants: {
    color: 'green',
    size: 'md',
    radius: 'none',
  },
});

export default Button;
