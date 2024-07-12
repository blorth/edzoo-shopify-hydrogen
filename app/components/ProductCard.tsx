import {Button} from '@nextui-org/button';
import {CartForm, Image, Money} from '@shopify/hydrogen';
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
              {
                inStock && !quantity && (
                  // <CartForm
                  //   action="CustomEditInPlace"
                  //   inputs={{
                  //     lines: [
                  //       {
                  //         merchandiseId: product.id,
                  //         quantity: 1,
                  //       },
                  //     ],
                  //   }}
                  // >
                  <Button
                    color="primary"
                    className="font-volkhov rounded-sm font-semibold tracking-wide uppercase px-[30px]"
                    onClick={() => handleOnSelect()}
                  >
                    + Add
                  </Button>
                  // </CartForm>
                )
                //  : (
                //   <Button
                //     color="secondary"
                //     className="font-volkhov rounded-sm font-semibold tracking-wide uppercase px-[30px]"
                //   >
                //     Join The Waitlist
                //   </Button>
                // )
              }
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
            <div className="flex items-center justify-center border w-fit text-large">
              <Button
                color="primary"
                className="font-volkhov rounded-sm min-w-8"
                onClick={() => handleOnSelect(QuantityActionsEnum.MINUS)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M7.33301 0C6.04192 0 4.96687 0.983037 4.78643 2.25H2.2686C2.23726 2.24454 2.20551 2.24184 2.17372 2.24194C2.14625 2.24255 2.11886 2.24524 2.09178 2.25H0.892881C0.819733 2.24895 0.747109 2.26272 0.679229 2.29051C0.611349 2.31831 0.549567 2.35957 0.497474 2.41191C0.445381 2.46425 0.404016 2.52661 0.375781 2.59538C0.347547 2.66415 0.333008 2.73795 0.333008 2.8125C0.333008 2.88705 0.347547 2.96085 0.375781 3.02962C0.404016 3.09839 0.445381 3.16075 0.497474 3.21309C0.549567 3.26543 0.611349 3.30669 0.679229 3.33449C0.747109 3.36228 0.819733 3.37605 0.892881 3.375H1.67993L2.60641 13.136C2.70617 14.1885 3.58367 15 4.62111 15H10.0442C11.0817 15 11.9592 14.1886 12.0589 13.136L12.9861 3.375H13.7731C13.8463 3.37605 13.9189 3.36228 13.9868 3.33449C14.0547 3.30669 14.1164 3.26543 14.1685 3.21309C14.2206 3.16075 14.262 3.09839 14.2902 3.02962C14.3185 2.96085 14.333 2.88705 14.333 2.8125C14.333 2.73795 14.3185 2.66415 14.2902 2.59538C14.262 2.52661 14.2206 2.46425 14.1685 2.41191C14.1164 2.35957 14.0547 2.31831 13.9868 2.29051C13.9189 2.26272 13.8463 2.24895 13.7731 2.25H12.575C12.5164 2.24032 12.4567 2.24032 12.3981 2.25H9.87959C9.69915 0.983037 8.62409 0 7.33301 0ZM7.33301 1.125C8.02455 1.125 8.59188 1.60056 8.75401 2.25H5.91201C6.07414 1.60056 6.64147 1.125 7.33301 1.125ZM2.78826 3.375H11.877L10.9599 13.0276C10.9139 13.5133 10.5229 13.875 10.0442 13.875H4.62111C4.1431 13.875 3.75138 13.5126 3.70541 13.0276L2.78826 3.375ZM6.03636 5.24194C5.89008 5.24427 5.75069 5.30567 5.64881 5.41265C5.54692 5.51963 5.49087 5.66344 5.49297 5.8125V11.4375C5.49194 11.512 5.50545 11.586 5.53273 11.6552C5.56001 11.7244 5.6005 11.7873 5.65186 11.8404C5.70323 11.8935 5.76443 11.9357 5.83191 11.9644C5.8994 11.9932 5.97183 12.008 6.04498 12.008C6.11814 12.008 6.19056 11.9932 6.25805 11.9644C6.32554 11.9357 6.38674 11.8935 6.4381 11.8404C6.48946 11.7873 6.52996 11.7244 6.55724 11.6552C6.58451 11.586 6.59803 11.512 6.59699 11.4375V5.8125C6.59805 5.73721 6.58427 5.66247 6.55646 5.59272C6.52865 5.52296 6.48739 5.4596 6.4351 5.40639C6.38282 5.35318 6.32059 5.31121 6.2521 5.28296C6.1836 5.25472 6.11024 5.24077 6.03636 5.24194ZM8.61241 5.24194C8.46613 5.24427 8.32674 5.30567 8.22486 5.41265C8.12297 5.51963 8.06693 5.66344 8.06902 5.8125V11.4375C8.06799 11.512 8.0815 11.586 8.10878 11.6552C8.13606 11.7244 8.17655 11.7873 8.22791 11.8404C8.27928 11.8935 8.34048 11.9357 8.40797 11.9644C8.47545 11.9932 8.54788 12.008 8.62103 12.008C8.69419 12.008 8.76662 11.9932 8.8341 11.9644C8.90159 11.9357 8.96279 11.8935 9.01415 11.8404C9.06552 11.7873 9.10601 11.7244 9.13329 11.6552C9.16057 11.586 9.17408 11.512 9.17305 11.4375V5.8125C9.1741 5.73721 9.16032 5.66247 9.13251 5.59272C9.1047 5.52296 9.06344 5.4596 9.01116 5.40639C8.95887 5.35318 8.89664 5.31121 8.82815 5.28296C8.75965 5.25472 8.68629 5.24077 8.61241 5.24194Z"
                    fill="white"
                  />
                </svg>
              </Button>
              <div className="min-w-8 text-center">{quantity}</div>
              <Button
                color="primary"
                className="font-volkhov rounded-sm min-w-8"
                onClick={() => handleOnSelect(QuantityActionsEnum.ADD)}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
