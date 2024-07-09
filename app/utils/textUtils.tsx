import {Money} from '@shopify/hydrogen';

export enum BillingTermEnum {
  MONTHLY = 'Monthly',
  THREE_MONTHS = '3 Months',
  SIX_MONTHS = '6 Months',
  TWELVE_MONTHS = '12 Months',
}

export const getBillingTerm = (title: string): BillingTermEnum => {
  const splitTitle = title.split(' - ');
  if (splitTitle[1].includes('Monthly Box')) {
    return BillingTermEnum.MONTHLY;
  }

  if (splitTitle[1].includes('3 Months')) {
    return BillingTermEnum.THREE_MONTHS;
  }

  if (splitTitle[1].includes('6 Months')) {
    return BillingTermEnum.SIX_MONTHS;
  }

  if (splitTitle[1].includes('12 Months')) {
    return BillingTermEnum.TWELVE_MONTHS;
  }

  return BillingTermEnum.MONTHLY;
};

export const getBillingTermPayPrice = (
  price: number,
  term: BillingTermEnum,
) => {
  if (term === BillingTermEnum.MONTHLY) {
    return (
      <div>
        Pay monthly, <br />
        cancel anytime
      </div>
    );
  }
  return (
    <div>
      <div className="flex gap-1">
        Pay <Money data={{amount: price.toString(), currencyCode: 'USD'}} />
      </div>
      <div>every {term.toLowerCase()}</div>
    </div>
  );
};

export const getBillingTermSavedPrice = (
  price: number,
  comparePrice: number,
  term: BillingTermEnum,
) => {
  if (term === BillingTermEnum.MONTHLY) {
    const savedPrice = comparePrice - price;
    return savedPrice;
  }
  const termLength = parseInt(term.split(' ')[0]);
  const savedPrice = (comparePrice - price) * termLength;

  return savedPrice;
};

export const getMonthlyBoxFromCollection = (products: any) => {
  return products.edges.find((product: any) => {
    return product.node.title.includes('Monthly Box');
  });
};

export const getCompareAtPrice = (products: any) => {
  const monthlyBox = products.edges.find((product: any) => {
    return product.node.title.includes('Monthly Box');
  });

  return monthlyBox.node.variants.edges[0].node.compareAtPrice.amount;
};
