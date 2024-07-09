import {Button, Input} from '@nextui-org/react';
import {NavLink} from '@remix-run/react';
import {useRootLoaderData} from '~/root';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

import IconAmex from './icons/IconAmex';
import IconApplePay from './icons/IconApplePay';
import IconDinersClub from './icons/IconDinersClub';
import IconDiscoverCard from './icons/IconDiscoverCard';
import IconFacebook from './icons/IconFacebook';
import IconGooglePay from './icons/IconGooglePay';
import IconInstagram from './icons/IconInstagram';
import IconJcb from './icons/IconJcb';
import IconMastercard from './icons/IconMastercard';
import IconPinterest from './icons/IconPinterest';
import IconShopifyPay from './icons/IconShopifyPay';
import IconTiktok from './icons/IconTiktok';
import IconVisa from './icons/IconVisa';
import IconYoutube from './icons/IconYoutube';

const paymentIconMap = {
  AMERICAN_EXPRESS: IconAmex,
  DISCOVER: IconDiscoverCard,
  MASTERCARD: IconMastercard,
  VISA: IconVisa,
  DINERS_CLUB: IconDinersClub,
  JCB: IconJcb,
  APPLE_PAY: IconApplePay,
  GOOGLE_PAY: IconGooglePay,
  SHOPIFY_PAY: IconShopifyPay,
};

export function Footer({
  menu,
  shop,
}: FooterQuery & {shop: HeaderQuery['shop']}) {
  return (
    <footer className="footer py-10">
      {menu && shop?.primaryDomain?.url && (
        <FooterMenu
          menu={menu}
          primaryDomainUrl={shop.primaryDomain.url}
          paymentSettings={shop.paymentSettings}
        />
      )}
    </footer>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  paymentSettings,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
  paymentSettings: HeaderQuery['shop']['paymentSettings'];
}) {
  const {publicStoreDomain} = useRootLoaderData();

  return (
    <div
      className="grid gap-14 md:gap-12 max-w-[1536px] mx-auto px-4 md:px-10 grid-cols-1 xl:justify-between xl:grid-cols-[minmax(100px,_273px)_minmax(100px,_240px)_minmax(100px,_160px)_200px] md:grid-cols-2 2xl:px-20"
      role="navigation"
    >
      <div className="first-col">
        <h6 className="mb-4">Shipping Information</h6>
        <div className="flex flex-col gap-5">
          <p>
            Free Standard Shipping included for All edZOOcation subscription
            boxes!
          </p>

          <p>
            Excludes free first box promo orders, flat rate shipping & handling
            rate applies to promo orders.
          </p>

          <p>Standard shipping anywhere in the USA via Economy Shipping.</p>

          <p>
            Please allow 5 to 7 business days for processing and handling from
            order processing.
          </p>

          <p>International shipping is not available at this time.</p>

          <p>See our Return Policy</p>
        </div>
      </div>
      <div className="second-col flex flex-col md:min-h-[440px]">
        <h6 className="mb-4">Wild Deals</h6>
        <p>Get wildlife facts and awesome deals in your inbox.</p>
        <div className="flex flex-col gap-4 mt-4">
          <Input radius="none" variant="bordered" placeholder="First Name" />
          <Input radius="none" variant="bordered" placeholder="Last Name" />
          <Input radius="none" variant="bordered" placeholder="Email" />
          <Button
            radius="none"
            color="primary"
            className="font-volkhov md:block rounded-sm font-semibold tracking-wide uppercase self-start"
          >
            Subscribe
          </Button>
        </div>
        <div className="mt-4 md:mt-auto">
          <h6 className="mb-4">Follow us</h6>
          <div className="flex gap-2 items-center">
            <IconFacebook />
            <IconInstagram />
            <IconPinterest />
            <IconYoutube />
            <IconTiktok />
          </div>
        </div>
      </div>
      <div className="third-col">
        <h6 className="mb-4">Answers</h6>
        <div className="flex flex-col gap-4">
          {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
            if (!item.url) return null;
            // if the url is internal, we strip the domain
            const url =
              item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain) ||
              item.url.includes(primaryDomainUrl)
                ? new URL(item.url).pathname
                : item.url;
            const isExternal = !url.startsWith('/');
            return isExternal ? (
              <a
                href={url}
                key={item.id}
                rel="noopener noreferrer"
                target="_blank"
                className="underline color-browns-brown"
              >
                {item.title}
              </a>
            ) : (
              <NavLink
                className="underline color-browns-brown"
                end
                key={item.id}
                prefetch="intent"
                to={url}
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="fourth-col flex flex-col md:min-h-[440px] gap-5">
        <div>
          <h6 className="mb-4">Partner With Us</h6>
          <div className="flex flex-col flex-1 gap-4">
            <a className="underline color-browns-brown">
              Conservation Partners
            </a>
            <a className="underline color-browns-brown">Influencers</a>
            <a className="underline color-browns-brown">Affiliates</a>
            <a className="underline color-browns-brown">
              School Purchase Orders
            </a>
            <a className="underline color-browns-brown">
              Wholesale Stuffed Animals
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-auto">
          <h6>Secure Checkout</h6>
          <div className="flex flex-row flex-wrap gap-2">
            {paymentSettings.acceptedCardBrands.map((brand) => {
              const PaymentIcon = paymentIconMap[brand];
              return <PaymentIcon />;
            })}
            {paymentSettings.supportedDigitalWallets.map((brand) => {
              const PaymentIcon = paymentIconMap[brand];
              return <PaymentIcon />;
            })}
          </div>
        </div>

        <div className="mt-auto">2024 © Wildlife Tree LLC</div>
      </div>
    </div>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
