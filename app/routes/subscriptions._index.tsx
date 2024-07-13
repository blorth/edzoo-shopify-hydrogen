import {useLoaderData, useNavigate} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import ProductCard from '~/components/ProductCard';
import PageContainer from '~/components/PageContainer';
import ServiceHighlights from '~/components/ServiceHighlights';
import {Product} from '@shopify/hydrogen/storefront-api-types';

export async function loader({context, request}: LoaderFunctionArgs) {
  const {products} = await context.storefront.query(MONTHLY_BOXES_QUERY);

  return json({products});
}

export default function Subscriptions() {
  const {products} = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleOnSelect = (product: Product) => {
    const type = product.title.toLowerCase().split(' ');
    navigate(`/subscriptions/cohort/${type[0]}`);
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-7">
        <div className="md:text-center">
          <h1 className="mb-2 font-volkhov volkhov-regular mob:text-[25px]">
            Select Child's Age
          </h1>
          <p>
            Select the age that best fits your child. You'll have the option to
            add siblings later on.
          </p>
        </div>
        <div className="product-list gap-4 flex flex-col md:flex-row justify-center">
          {products?.edges?.map((product) => {
            const {node} = product;
            const title = node.title
              .replace('edZOOcation™', '')
              .replace('- Monthly Box', '')
              .replace('Box', '')
              .trim();

            const modifiedProduct = {
              ...node,
              title,
            };
            return (
              <ProductCard
                key={node.id}
                product={modifiedProduct}
                onSelect={handleOnSelect}
              />
            );
          })}
        </div>
      </div>
      <ServiceHighlights />
    </PageContainer>
  );
}

const MONTHLY_BOXES_QUERY = `#graphql
  query GetMonthlyBoxes {
    products(
      first: 20
      query: "(id:7623752188076) OR (id:7658802774188) OR (id:7605196030124)"
    ) {
      edges {
        node {
          availableForSale
          id
          description
          handle
          productType
          title
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              currencyCode
              amount
            }
          }
          featuredImage {
            id
            url
            altText
            width
            height
          }
          images(first: 10) {
            nodes {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
` as const;
