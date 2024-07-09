import{a as m}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-2JDDJ33C.js";import{b as c,c as d,d as u}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-TFFD2SGX.js";import{n as i,t as s,z as f}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-3T2GPJBB.js";import{b as l}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-YHLO7HBR.js";import{d as r}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-2GVARK7B.js";f();var t=r(l()),y=({data:e})=>[{title:`Hydrogen | ${e?.collection.title??""} Collection`}];function g(){let{collection:e}=s();return(0,t.jsxs)("div",{className:"collection",children:[(0,t.jsx)("h1",{children:e.title}),(0,t.jsx)("p",{className:"collection-description",children:e.description}),(0,t.jsx)(u,{connection:e.products,children:({nodes:n,isLoading:o,PreviousLink:a,NextLink:p})=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a,{children:o?"Loading...":(0,t.jsx)("span",{children:"\u2191 Load previous"})}),(0,t.jsx)(P,{products:n}),(0,t.jsx)("br",{}),(0,t.jsx)(p,{children:o?"Loading...":(0,t.jsx)("span",{children:"Load more \u2193"})})]})})]})}function P({products:e}){return(0,t.jsx)("div",{className:"products-grid",children:e.map((n,o)=>(0,t.jsx)(h,{product:n,loading:o<8?"eager":void 0},n.id))})}function h({product:e,loading:n}){let o=e.variants.nodes[0],a=m(e.handle,o.selectedOptions);return(0,t.jsxs)(i,{className:"product-item",prefetch:"intent",to:a,children:[e.featuredImage&&(0,t.jsx)(d,{alt:e.featuredImage.altText||e.title,aspectRatio:"1/1",data:e.featuredImage,loading:n,sizes:"(min-width: 45em) 400px, 100vw"}),(0,t.jsx)("h4",{children:e.title}),(0,t.jsx)("small",{children:(0,t.jsx)(c,{data:e.priceRange.minVariantPrice})})]},e.id)}var I=`#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
`,x=`#graphql
  ${I}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;export{g as default,y as meta};

