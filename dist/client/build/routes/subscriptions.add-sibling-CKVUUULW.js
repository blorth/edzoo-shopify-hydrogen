import{a as l}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-DN5WXLYV.js";import"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-L3PTOVU6.js";import{a as b}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-XOUVVZHR.js";import"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-P5AUVLLC.js";import"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-LZ6EIKHZ.js";import"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-TFFD2SGX.js";import{f as g,k as y,t as S,z as E}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-3T2GPJBB.js";import{a as F,b as f}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-YHLO7HBR.js";import{d}from"https://cdn.shopify.com/oxygen-v2/31356/19637/40579/683287/build/_shared/chunk-2GVARK7B.js";var s=d(F());E();var e=d(f());var I=({})=>{let{collections:n,cart:q}=S(),[c,x]=y(),M=g(),[C,_]=(0,s.useState)([]),[i,v]=(0,s.useState)(),[O,Q]=(0,s.useState)([]);console.log({collections:n}),(0,s.useEffect)(()=>{let t=c.get("cohort");if(t&&typeof t=="string"&&n){let a=n[t].products.edges.find(m=>m.node.id.includes(c.get("id")));v(a.node);let p=[];for(let[m,P]of Object.entries(n)){let h=P.products.edges.find(r=>{console.log({product:r});let T=r.node.metaFieldCohort.value,A=a.node.metaFieldCohort.value,N=r.node.metaFieldPurchaseTypeTag.value===a.node.metaFieldPurchaseTypeTag.value;return T!==A&&N});h&&p.push(h)}_(p)}},[n]);let u=(t,o)=>{o==="ADD"||"MINUS"};return(0,e.jsxs)("div",{className:"SubscriptionsCohortWithSelectedId bg-browns-tan-light p-9",children:[(0,e.jsxs)("div",{className:"heading-group",children:[(0,e.jsx)("h2",{className:"mb-2",children:"Want to Add a Sibling?"}),(0,e.jsx)("p",{children:"Add another subscription box or one-time accessories."})]}),(0,e.jsxs)("div",{className:"mt-4",children:[(0,e.jsx)("h4",{children:"Subscriptions"}),(0,e.jsxs)("div",{className:"flex gap-2 flex-wrap",children:[i&&(0,e.jsx)(l,{product:i,isSelected:i.id.includes(c.get("id")),cardMode:"QUANTITY",onSelect:u},i.id),C.map(t=>{let{node:o}=t;return(0,e.jsx)(l,{product:o,isSelected:o.id===c.get("id"),cardMode:"QUANTITY",onSelect:u},o.id)})]})]})]})},L=I,H=`#graphql
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
  ${b}
`;export{L as default};

