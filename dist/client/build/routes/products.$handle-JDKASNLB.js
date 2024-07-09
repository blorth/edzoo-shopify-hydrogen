import"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-2JDDJ33C.js";import{b as i,c as g,e as c,f as h}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-TFFD2SGX.js";import{n as u,q as l,t as p,z as C}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-3T2GPJBB.js";import{a as V,b as m}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-YHLO7HBR.js";import{d}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-2GVARK7B.js";var v=d(V());C();var t=d(m()),b=({data:e})=>[{title:`Hydrogen | ${e?.product.title??""}`}];function y(){let{product:e,variants:r}=p(),{selectedVariant:a}=e;return(0,t.jsxs)("div",{className:"product",children:[(0,t.jsx)(F,{image:a?.image}),(0,t.jsx)(O,{selectedVariant:a,product:e,variants:r})]})}function F({image:e}){return e?(0,t.jsx)("div",{className:"product-image",children:(0,t.jsx)(g,{alt:e.altText||"Product Image",aspectRatio:"1/1",data:e,sizes:"(min-width: 45em) 50vw, 100vw"},e.id)}):(0,t.jsx)("div",{className:"product-image"})}function O({selectedVariant:e,product:r,variants:a}){let{title:n,descriptionHtml:o}=r;return(0,t.jsxs)("div",{className:"product-main",children:[(0,t.jsx)("h1",{children:n}),(0,t.jsx)(S,{selectedVariant:e}),(0,t.jsx)("br",{}),(0,t.jsx)(v.Suspense,{fallback:(0,t.jsx)(f,{product:r,selectedVariant:e,variants:[]}),children:(0,t.jsx)(l,{errorElement:"There was a problem loading product variants",resolve:a,children:s=>(0,t.jsx)(f,{product:r,selectedVariant:e,variants:s.product?.variants.nodes||[]})})}),(0,t.jsx)("br",{}),(0,t.jsx)("br",{}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Description"})}),(0,t.jsx)("br",{}),(0,t.jsx)("div",{dangerouslySetInnerHTML:{__html:o}}),(0,t.jsx)("br",{})]})}function S({selectedVariant:e}){return(0,t.jsx)("div",{className:"product-price",children:e?.compareAtPrice?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("p",{children:"Sale"}),(0,t.jsx)("br",{}),(0,t.jsxs)("div",{className:"product-price-on-sale",children:[e?(0,t.jsx)(i,{data:e.price}):null,(0,t.jsx)("s",{children:(0,t.jsx)(i,{data:e.compareAtPrice})})]})]}):e?.price&&(0,t.jsx)(i,{data:e?.price})})}function f({product:e,selectedVariant:r,variants:a}){return(0,t.jsxs)("div",{className:"product-form",children:[(0,t.jsx)(h,{handle:e.handle,options:e.options,variants:a,children:({option:n})=>(0,t.jsx)(A,{option:n},n.name)}),(0,t.jsx)("br",{}),(0,t.jsx)(w,{disabled:!r||!r.availableForSale,onClick:()=>{window.location.href=window.location.href+"#cart-aside"},lines:r?[{merchandiseId:r.id,quantity:1}]:[],children:r?.availableForSale?"Add to cart":"Sold out"})]})}function A({option:e}){return(0,t.jsxs)("div",{className:"product-options",children:[(0,t.jsx)("h5",{children:e.name}),(0,t.jsx)("div",{className:"product-options-grid",children:e.values.map(({value:r,isAvailable:a,isActive:n,to:o})=>(0,t.jsx)(u,{className:"product-options-item",prefetch:"intent",preventScrollReset:!0,replace:!0,to:o,style:{border:n?"1px solid black":"1px solid transparent",opacity:a?1:.3},children:r},e.name+r))}),(0,t.jsx)("br",{})]},e.name)}function w({analytics:e,children:r,disabled:a,lines:n,onClick:o}){return(0,t.jsx)(c,{route:"/cart",inputs:{lines:n},action:c.ACTIONS.LinesAdd,children:s=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("input",{name:"analytics",type:"hidden",value:JSON.stringify(e)}),(0,t.jsx)("button",{type:"submit",onClick:o,disabled:a??s.state!=="idle",children:r})]})})}var P=`#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`,R=`#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${P}
`,I=`#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${R}
`,T=`#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${P}
`,k=`#graphql
  ${T}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;export{y as default,b as meta};

