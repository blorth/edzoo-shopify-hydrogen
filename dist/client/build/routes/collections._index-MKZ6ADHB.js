import{c as l,d as c}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-TFFD2SGX.js";import{n as i,t as r,z as m}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-3T2GPJBB.js";import{b as s}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-YHLO7HBR.js";import{d as a}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-2GVARK7B.js";m();var t=a(s());function d(){let{collections:e}=r();return(0,t.jsxs)("div",{className:"collections",children:[(0,t.jsx)("h1",{children:"Collections"}),(0,t.jsx)(c,{connection:e,children:({nodes:o,isLoading:n,PreviousLink:g,NextLink:u})=>(0,t.jsxs)("div",{children:[(0,t.jsx)(g,{children:n?"Loading...":(0,t.jsx)("span",{children:"\u2191 Load previous"})}),(0,t.jsx)(f,{collections:o}),(0,t.jsx)(u,{children:n?"Loading...":(0,t.jsx)("span",{children:"Load more \u2193"})})]})})]})}function f({collections:e}){return(0,t.jsx)("div",{className:"collections-grid",children:e.map((o,n)=>(0,t.jsx)(p,{collection:o,index:n},o.id))})}function p({collection:e,index:o}){return(0,t.jsxs)(i,{className:"collection-item",to:`/collections/${e.handle}`,prefetch:"intent",children:[e?.image&&(0,t.jsx)(l,{alt:e.image.altText||e.title,aspectRatio:"1/1",data:e.image,loading:o<3?"eager":void 0}),(0,t.jsx)("h5",{children:e.title})]},e.id)}export{d as default};

