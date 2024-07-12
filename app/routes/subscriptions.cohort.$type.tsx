import {
  ActionFunctionArgs,
  defer,
  json,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from '@remix-run/react';
import React, {useEffect, useState} from 'react';
import BillingTermCard from '~/components/BillingTermCard';
import {
  getBillingTerm,
  getBillingTermPayPrice,
  getBillingTermSavedPrice,
  getCompareAtPrice,
  getMonthlyBoxFromCollection,
} from '~/utils/textUtils';
import ImageCarousel from '~/components/ImageCarousel';
import {RadioGroup} from '@nextui-org/react';
import {SUBSCRIPTION_COLLECTIONS} from '~/constants';
import {COLLECTION_FRAGMENT} from '~/lib/fragmentsSubscriptions';
import {CartForm, CartQueryDataReturn} from '@shopify/hydrogen';
import ServiceHighlights from '~/components/ServiceHighlights';

type SubscriptionsCohertProps = {};

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const formData = await request.formData();
  const productId = formData.get('id');

  let result: CartQueryDataReturn;
  result = await cart.addLines([{merchandiseId: productId, quantity: 1}]);

  /**
   * This is erroring out with the following error when adding a new item on the cart
   * "errors": [
        {
            "name": "GraphQLError",
            "message": "Development: [h2:error:storefront.mutation] invalid id - Request ID: 9585aa79-18b9-4296-a005-8cccf2a90c90-1720538859",
            "path": [
                "cartCreate"
            ],
            "locations": []
        }
    ]
  */
  const headers = cart.setCartId(result.cart.id);
  headers.append('Set-Cookie', await context.session.commit());

  return json(result, {status: 200, headers});
}

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const {type} = params as any;

  if (!type) return json({});

  const selectedCollectionHandle = SUBSCRIPTION_COLLECTIONS[type];

  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      collectionHandle: selectedCollectionHandle,
    },
  });

  return defer({
    collection,
  });
}

const SubscriptionsCohert: React.FC<SubscriptionsCohertProps> = (props) => {
  const {collection} = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const params = useParams();
  const submit = useSubmit();

  const {products} = collection;
  const [allProduct, setAllProduct] = useState<any[]>([]);
  console.log('allProduct::: ', allProduct);
  useEffect(() => {
    let products = collection.products?.edges;
    if (products?.length >= 2) {
      products[1].node.banner = 'most popular';
    }
    if (products?.length >= 4) {
      products[3].node.banner = 'best value';
    }
    setAllProduct(products);
  }, [collection]);

  const monthlyBox = getMonthlyBoxFromCollection(products);
  const [selected, setSelected] = React.useState('');

  const handleOnSelect = (productId: string) => {
    setSelected(productId);
    const productIdArray = productId.split('/');
    const productIdOnly = productIdArray[productIdArray.length - 1];

    const formData = new FormData();
    formData.append('id', productId);
    formData.append('quantity', '1');

    // Add to cart
    // submit(formData, {method: 'post'});

    // Redirect to add sibling page after adding to cart
    navigate(
      `/subscriptions/add-sibling?cohort=${params.type}&id=${productIdOnly}`,
    );
  };

  return (
    <div className="SubscriptionsCohort bg-browns-tan-light p-9">
      <div className="cohort-grid max-w-6xl mx-auto">
        <div className="heading-group">
          <h2 className="mb-2">Select Billing Term</h2>
          <p className="mob:mb-5">
            Receive a different species each month. Pay monthly or save up to
            35% with a prepaid plan.
          </p>
        </div>
        <div className="image-carousel self-center justify-self-center">
          <ImageCarousel images={monthlyBox.node.images.nodes} />
        </div>
        <div className="mob:mt-5">
          <RadioGroup
            className="billing-terms mt-7 "
            classNames={{
              wrapper: 'space-y-2',
            }}
            value={selected}
            onValueChange={handleOnSelect}
          >
            {allProduct?.map((product: any) => {
              const {node} = product;
              const term = getBillingTerm(node.title);
              const price = node.variants.edges[0].node.price.amount;
              const monthlyBoxPrice =
                monthlyBox.node.variants.edges[0].node.compareAtPrice.amount;

              return (
                <div key={node.id} className="billing-term">
                  <BillingTermCard
                    billingTerm={term}
                    price={price}
                    payDescription={getBillingTermPayPrice(price, term)}
                    compareAtPrice={monthlyBoxPrice}
                    productId={node.id}
                    banner={product?.node?.banner}
                  />
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>
      <ServiceHighlights />
    </div>
  );
};

export default SubscriptionsCohert;

export const COLLECTION_QUERY = `#graphql
  query CollectionQuery($collectionHandle: String!) {
    collection(handle: $collectionHandle) {
      ...Subscriptions
    }
  }
  ${COLLECTION_FRAGMENT}
`;
