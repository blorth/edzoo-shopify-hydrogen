export const COLLECTION_FRAGMENT = `#graphql
  fragment Subscriptions on Collection {
    id
    handle
    products(first: 10) {
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
          requiresSellingPlan
          variants(first: 10) {
            edges {
              node {
                id
                compareAtPrice {
                  amount
                  currencyCode
                }
                currentlyNotInStock
                price {
                  amount
                }
              }
            }
          }
          images(first: 10) {
            nodes {
              src
              height
              id
              url
              width
            }
          }
          metaFieldProductType: metafield(key: "product_type", namespace: "filter") {
            id
            value
        	}
          metaFieldCohort: metafield(key: "cohort", namespace: "custom") {
            id
            value
        	}
          metaFieldPurchaseTypeTag: metafield(key: "purchase_type_tag", namespace: "custom") {
            id
            value
        	}
        }
      }
    }
  }
`;
