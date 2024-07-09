import {Button} from '@nextui-org/button';
import {Image, Money} from '@shopify/hydrogen';
import cx from 'classnames';
import React from 'react';

export enum CardModeEnum {
  QUANTITY = 'QUANTITY',
  SINGLE_ADD = 'SINGLE_ADD',
}

export enum QuantityActionsEnum {
  ADD = 'ADD',
  MINUS = 'MINUS',
}

type ProductCardProps = {
  product: {
    availableForSale: boolean;
    description: string;
    handle: string;
    id: string;
    productType: string;
    title: string;
    images: {
      nodes: {
        id: string;
        url: string;
        altText: string;
        width: number;
        height: number;
      }[];
    };
    featuredImage: {
      id: string;
      url: string;
      altText: string;
      width: number;
      height: number;
    };
    priceRange: {
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  };
  isSelected?: boolean;
  onSelect: (product: any, quantityAction?: QuantityActionsEnum) => void;
  showPurchaseType?: boolean;
  cardMode?: CardModeEnum;
  quantity?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  isSelected,
  onSelect,
  product,
  showPurchaseType,
  cardMode = CardModeEnum.SINGLE_ADD,
  quantity,
}) => {
  const inStock = true;

  const productCx = cx('ProductCard md:w-[250px] w-full rounded-md bg-white', {
    'border-2 border-greens-green-primary': isSelected,
  });

  const soldOutDivCx = cx(
    'out-of-stock bg-reds-red-light text-white text-xs font-semibold uppercase',
    'tracking-wider rounded-[4px] text-center p-2 absolute top-[30%] left-[20%] rotate-[10deg]',
    'font-volkhov',
    {
      block: !inStock,
      hidden: inStock,
    },
  );

  const handleOnSelect = (quantityAction?: QuantityActionsEnum) => {
    onSelect(product, quantityAction);
  };

  return (
    <div className={productCx}>
      {isSelected && (
        <div className="current-selection bg-greens-green-primary text-white text-center font-bold font-volkhov p-2">
          Current Selection
        </div>
      )}
      <div className="flex flex-row md:flex-col pr-5 md:px-5 pb-5 pt-11 items-center justify-center gap-1">
        <div className="relative min-w-[160px] max-w-[160px]">
          <Image
            data={product.featuredImage}
            aspectRatio="1/1"
            sizes="(min-width: 160px, max-width: 160px)"
            className={inStock ? 'opacity-100' : 'opacity-50'}
          />
          <div className={soldOutDivCx}>Sold Out!</div>
        </div>

        <div className="metadata flex flex-col md:justify-center md:items-center lg:mt-5 gap-1">
          <div className="font-volkhov text-browns-brown font-bold md:text-center">
            {product.title}
          </div>
          <div className="price flex flex-row gap-2 font-volkhov">
            <Money
              data={product.priceRange.minVariantPrice}
              className="text-light-red font-semibold"
            />{' '}
            /mo{' '}
            <Money
              data={product.priceRange.minVariantPrice}
              className="text-neutrals-gray-medium font-semibold line-through"
            />
          </div>
          {showPurchaseType && (
            <div className="purchaseType bg-light-yellow p-2 rounded-sm text-center text-sm">
              Bills and ships monthly
            </div>
          )}
          {CardModeEnum.SINGLE_ADD && (
            <div className="mt-4">
              {inStock ? (
                <Button
                  color="primary"
                  className="font-volkhov rounded-sm font-semibold tracking-wide uppercase px-[30px]"
                  onClick={() => handleOnSelect()}
                >
                  + Add
                </Button>
              ) : (
                <Button
                  color="secondary"
                  className="font-volkhov rounded-sm font-semibold tracking-wide uppercase px-[30px]"
                >
                  Join The Waitlist
                </Button>
              )}
            </div>
          )}

          {cardMode === CardModeEnum.QUANTITY && quantity && quantity === 0 && (
            <div className="mt-4">
              <Button
                color="primary"
                className="font-volkhov rounded-sm font-semibold tracking-wide uppercase px-[30px]"
                onClick={() => handleOnSelect(QuantityActionsEnum.ADD)}
              >
                + Add
              </Button>
            </div>
          )}

          {cardMode === CardModeEnum.QUANTITY && quantity && quantity >= 1 && (
            <div className="mt-4">
              <div>
                <Button
                  color="primary"
                  className="font-volkhov rounded-sm font-semibold tracking-wide uppercase px-[30px]"
                  onClick={() => handleOnSelect(QuantityActionsEnum.MINUS)}
                >
                  -
                </Button>
                <div className="">{quantity}</div>
                <Button
                  color="primary"
                  className="font-volkhov rounded-sm font-semibold tracking-wide uppercase px-[30px]"
                  onClick={() => handleOnSelect(QuantityActionsEnum.ADD)}
                >
                  +
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
