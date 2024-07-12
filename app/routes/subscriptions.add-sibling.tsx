import {
  defer,
  SerializeFrom,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import React, {useEffect, useState} from 'react';
import {
  useLoaderData,
  useMatches,
  useParams,
  useSearchParams,
} from '@remix-run/react';
import {COLLECTION_FRAGMENT} from '~/lib/fragmentsSubscriptions';
import ProductCard, {
  CardModeEnum,
  QuantityActionsEnum,
} from '~/components/ProductCard';
import {Button} from '@nextui-org/button';

type SubscriptionsCohertProps = {};

/**
 * Access the result of the root loader from a React component.
 */
export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.data as SerializeFrom<typeof loader>;
};

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const data = await context.storefront.query(COLLECTION_QUERY);
  const {cart} = context;
  const cartPromise = cart.get();

  return defer({
    cart: cartPromise,
    collections: {...data},
  });
}

const SubscriptionsCohert: React.FC<SubscriptionsCohertProps> = ({}) => {
  const {collections, cart} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [siblingSelections, setSiblingSelections] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>();
  const [selectedAccessories, setSelectedAccessories] = useState<any>([]);

  console.log({collections});

  useEffect(() => {
    /**
     * On load, get the three collections
     * Get the matching age group that matches the passed in ID and cohort.
     */
    const selectedCohort = searchParams.get('cohort');
    if (selectedCohort && typeof selectedCohort === 'string' && collections) {
      const selectedCollection = collections[selectedCohort];
      const matchingProduct = selectedCollection.products.edges.find(
        (product: any) => {
          return product.node.id.includes(searchParams.get('id'));
        },
      );
      setSelectedProduct(matchingProduct.node);

      // Find the matching purchase type in the other collections
      // Don't return the matching product that's on the same cohort
      const products = [];
      for (const [key, value] of Object.entries(collections)) {
        const matched = value.products.edges.find((product: any) => {
          console.log({product});
          const cohort = product.node.metaFieldCohort.value;
          const selectedCohort = matchingProduct.node.metaFieldCohort.value;

          const hasSamePurchaseTypeTag =
            product.node.metaFieldPurchaseTypeTag.value ===
            matchingProduct.node.metaFieldPurchaseTypeTag.value;

          return cohort !== selectedCohort && hasSamePurchaseTypeTag;
        });

        if (matched) products.push(matched);
      }

      console.log('products::: ', products);
      setSiblingSelections(products);

      // TODO: Need to find the matching accessories in the collections object.
      // We need to find the matching accessories that are in the same metaFieldPurchaseTypeTag as the selected product
      // ie if the selected product is a monthly subscription, find the monthly accessories collection.
    }
  }, [collections]);

  const handleOnSelect = (
    product: any,
    quantityAction?: QuantityActionsEnum,
  ) => {
    console.log('quantityAction::: ', quantityAction);
    console.log('product::: ', product);
    // Find the product in the cart and increment or decrement the size based on quantityAction
    // If the new quantity goes down to zero,

    if (quantityAction === QuantityActionsEnum.ADD) {
      // TODO: If ADD, add item to cart
    } else if (quantityAction === QuantityActionsEnum.MINUS) {
      // If MINUS, decrease quantity
    }
  };

  return (
    <div className="SubscriptionsCohortWithSelectedId bg-browns-tan-light p-9">
      <div className="cohort-grid max-w-6xl mx-auto">
        <div className="heading-group flex items-center justify-between">
          <div>
            <h2 className="mb-2">Want to Add a Sibling?</h2>
            <p>Add another subscription box or one-time accessories.</p>
          </div>
          <div className="mob:hidden">
            <div className="flex items-center gap-x-1 ">
              <Button
                className="text-black uppercase font-semibold"
                color="primary"
                variant="light"
                size="sm"
              >
                Skip
              </Button>
              <Button
                size="sm"
                color="primary"
                className="font-volkhov rounded-sm font-semibold tracking-wide uppercase"
              >
                Confirm and Checkout
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="mb-4">Subscriptions</h4>
          <div className="flex gap-2 flex-wrap">
            {selectedProduct && (
              <ProductCard
                product={selectedProduct}
                key={selectedProduct.id}
                isSelected={selectedProduct.id.includes(searchParams.get('id'))}
                cardMode={CardModeEnum.QUANTITY}
                quantity={1}
                onSelect={handleOnSelect}
              />
            )}

            {siblingSelections.map((product: any) => {
              const {node} = product;
              return (
                <ProductCard
                  product={node}
                  key={node.id}
                  isSelected={node.id === searchParams.get('id')}
                  cardMode={CardModeEnum.QUANTITY}
                  // quantity={productInCart?.quantity}
                  onSelect={handleOnSelect}
                />
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-end mt-3 gap-x-1 mob:bg-white mob:fixed mob:bottom-0 mob:w-full mob:left-0 mob:py-6 mob:pr-5 mob:z-50 ">
          <Button
            className="text-black uppercase font-semibold"
            color="primary"
            variant="light"
            size="sm"
          >
            Skip
          </Button>
          <Button
            size="sm"
            color="primary"
            className="font-volkhov rounded-sm font-semibold tracking-wide uppercase"
          >
            Confirm and Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsCohert;

export const COLLECTION_QUERY = `#graphql
  query {
    zoologist: collection(id: "gid://shopify/Collection/293547016364") {
      ...Subscriptions
    }
    zookeeper: collection(id: "gid://shopify/Collection/293479645356") {
      ...Subscriptions
    }
    conservationist: collection(id: "gid://shopify/Collection/293966839980") {
      ...Subscriptions
    }
    add_on_subscriptions_ages_3_5: collectionByHandle(handle: "add-on-subscriptions-ages-3-5") {
      ...Subscriptions
    }
    add_on_subscriptions_ages_6_8: collectionByHandle(handle: "add-on-subscriptions-ages-6-8") {
      ...Subscriptions
    }
    add_on_subscriptions_ages_9_12: collectionByHandle(handle: "add-on-subscriptions-ages-9-12") {
      ...Subscriptions
    }
  }
  ${COLLECTION_FRAGMENT}
` as const;
