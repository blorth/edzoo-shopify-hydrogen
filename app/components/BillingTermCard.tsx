import {Checkbox, Radio} from '@nextui-org/react';
import {Money} from '@shopify/hydrogen';
import {BillingTermEnum} from '~/utils/textUtils';
import React from 'react';

type BillingTermCardProps = {
  banner?: string;
  billingTerm: BillingTermEnum;
  payDescription: React.ReactNode;
  price: number;
  compareAtPrice: number;
  productId: string;
};

const TERM_LENGTH = {
  Month: 1,
  '3 Months': 3,
  '6 Months': 6,
  '12 Months': 12,
};

const BillingTermCard: React.FC<BillingTermCardProps> = ({
  banner,
  billingTerm,
  payDescription,
  price,
  compareAtPrice,
  productId,
}) => {
  const monthlyPrice =
    billingTerm === BillingTermEnum.MONTHLY
      ? price
      : price / TERM_LENGTH[billingTerm];

  const renderSaveDescription = () => {
    if (billingTerm === BillingTermEnum.MONTHLY) {
      const savedPrice = compareAtPrice - monthlyPrice;
      return (
        <div className="flex gap-1">
          Save{' '}
          <Money data={{amount: savedPrice.toString(), currencyCode: 'USD'}} />
          /month
        </div>
      );
    }

    const savedPrice =
      (compareAtPrice - monthlyPrice) * TERM_LENGTH[billingTerm];

    return (
      <div className="flex items-end justify-end gap-1">
        Save{' '}
        <Money data={{amount: savedPrice.toString(), currencyCode: 'USD'}} />
      </div>
    );
  };
  return (
    <div className="BillingTermCard border-1 border-neutrals-gray-light py-4 pl-4 pr-5 w-full relative bg-white">
      {banner && (
        <div className="banner uppercase text-white absolute text-[11px] py-1 px-3 bg-[#D4784C] right-[20px] top-[-12px]">
          {banner}
        </div>
      )}
      <div className="flex gap-2 items-baseline">
        <Radio value={productId} />
        <div className="middle-content">
          <div className="font-volkhov text-[20px] text-browns-brown">
            {billingTerm}
          </div>
          <div className="text-[13px]/[20px]">{payDescription}</div>
        </div>
        <div className="right-content ml-auto">
          <div className="flex gap-1 font-volkhov text-[14px]">
            <span className="text-light-red font-bold">
              <Money
                data={{amount: monthlyPrice.toString(), currencyCode: 'USD'}}
              />
            </span>{' '}
            /mo{' '}
            <span className="line-through text-neutrals-gray-medium font-bold">
              {compareAtPrice}
            </span>
          </div>
          <div className="text-sm mt-2 text-right">
            <div>{renderSaveDescription()}</div>
            <div>Free Shipping!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTermCard;
