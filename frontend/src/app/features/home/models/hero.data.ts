import { NavLink } from '../components/home-header/home-header.component';
import { HeroAction } from '../components/home-hero/home-hero.component';
import { FooterGroup } from '../components/home-footer/home-footer.component';

// Header navigation links:
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/', active: true },
  { label: 'Hotels', href: '/hotels' },
  { label: 'About', href: '/about' },
];

export const HERO_BG = '/images/luxury-hotel-hero.jpeg';
export const HERO_TITLE = 'Wander Unwind Your Journey Begins Here';
export const HERO_SUBTITLE =
  'Whether you seek the thrill of uncharted paths or the tranquility of breathtaking landscapes, our traveling community is your passport to a world of endless possibilities.';
export const HERO_CTA: HeroAction = { label: 'Sign up', href: 'auth/signin' };

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];
