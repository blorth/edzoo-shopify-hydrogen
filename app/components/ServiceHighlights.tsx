import React from 'react';

import IconCalendar from './icons/IconCalendar';
import IconFreeShipping from './icons/IconFreeShipping';
import IconGuarantee from './icons/IconGuarantee';
import IconHighlight from './icons/IconHighlight';
import IconSecure from './icons/IconSecure';
import IconSupport from './icons/IconSupport';

type ServiceHighlightsProps = {};

const ServiceHighlights: React.FC<ServiceHighlightsProps> = ({}) => {
  return (
    <div className="ServiceHighlights bg-greens-green-light max-w-screen-lg my-6 mx-auto p-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <li className="flex gap-2 items-center">
          <IconCalendar />
          <span>Plans auto-renew, cancel anytime</span>
        </li>
        <li className="flex gap-2 items-center">
          <IconSecure /> <span>SSL secure checkout</span>
        </li>
        <li className="flex gap-2 items-center">
          <IconSupport /> <span>Dedicated customer service </span>
        </li>
        <li className="flex gap-2 items-center">
          <IconHighlight /> <span>50% of profits are donated to wildlife</span>
        </li>
        <li className="flex gap-2 items-center">
          <IconGuarantee /> <span>100% satisfaction guaranteed</span>
        </li>
        <li className="flex gap-2 items-center">
          <IconFreeShipping />
          <span> FREE Shipping in the U.S. </span>
        </li>
      </ul>
    </div>
  );
};

export default ServiceHighlights;
