import {Button} from '@nextui-org/button';
import {Await, NavLink, redirect, useNavigate} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {useRootLoaderData} from '~/root';
import {Suspense} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';

import logo from '../assets/logo.svg';
import AnnouncementBar from './AnnouncementBar';
// import Button from './Button';
import IconAccount from './icons/IconAccount';
import IconBag from './icons/IconBag';
import IconMenu from './icons/IconMenu';
import type {LayoutProps} from './Layout';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

type Viewport = 'desktop' | 'mobile';

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
  viewport: Viewport;
}) {
  const {publicStoreDomain} = useRootLoaderData();

  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className="hidden md:flex gap-7 flex-1" role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item text-neutrals-gray-dark font-op"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  const navigate = useNavigate();
  return (
    <nav
      className="flex items-center gap-7 ml-auto justify-end flex-1"
      role="navigation"
    >
      <NavLink
        prefetch="intent"
        to="/recharge"
        style={activeLinkStyle}
        className="items-center gap-1 hidden md:flex"
      >
        <IconAccount />
        <div className="hidden lg:block">
          <Suspense fallback="Account">
            <Await resolve={isLoggedIn} errorElement="Account">
              {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Account')}
            </Await>
          </Suspense>
        </div>
      </NavLink>
      {/* <SearchToggle /> */}
      <CartToggle cart={cart} />
      <Button
        color="secondary"
        className="font-volkhov hidden md:block rounded-sm font-semibold tracking-wide uppercase"
        onClick={() => navigate('/subscriptions')}
      >
        Get Started
      </Button>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="md:hidden flex-1" href="#mobile-menu-aside">
      <IconMenu />
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Search</a>;
}

function CartBadge({count}: {count: number}) {
  return (
    <a
      href="#cart-aside"
      className="flex items-center gap-1 text-neutrals-gray-dark"
    >
      <IconBag />
      <span className="hidden lg:block">Cart ({count})</span>
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
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
    color: isPending ? 'grey' : '#363636',
  };
}

export function Header({header, isLoggedIn, cart}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header>
      <AnnouncementBar>
        <div className="mob:px-3 mob:text-sm">
          50% of proceeds are donated to wildlife conservation
        </div>
      </AnnouncementBar>
      <div className="flex bg-white items-center sticky h-[100px] px-4 lg:px-10 2xl:px-20 justify-between mx-auto max-w-[1536px]">
        <HeaderMenuMobileToggle />
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
        />
        <div className="w-[133px] ml-auto gap-">
          <a href="/">
            <Image src={logo} alt="Edzoocation" />
          </a>
        </div>
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}
