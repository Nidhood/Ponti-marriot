import { Component } from '@angular/core';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';

import {
  FOOTER_GROUPS,
  HERO_BG,
  HERO_CTA,
  HERO_SUBTITLE,
  HERO_TITLE,
  NAV_LINKS,
} from './models/hero.data';
import { HomeBrandsComponent } from './components/home-brands/home-brands.component';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeaderComponent,
    HomeHeaderComponent,
    HomeHeroComponent,
    HomeFooterComponent,
  ],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  navLinks = NAV_LINKS;
  heroBg = HERO_BG;
  heroTitle = HERO_TITLE;
  heroSubtitle = HERO_SUBTITLE;
  heroCta = HERO_CTA;
  footerGroups = FOOTER_GROUPS;

  brandsTitle = 'Trusted by leading hotels worldwide';

  brands = [
    { name: 'Marriott', logo: '/images/brands/marriott.png' },
    { name: 'Hilton', logo: '/images/brands/hilton.png' },
    { name: 'Hyatt', logo: '/images/brands/hyatt.png' },
    { name: 'Four Seasons', logo: '/images/brands/fourseasons.png' },
    { name: 'Ritz Carlton', logo: '/images/brands/ritzcarlton.png' },
    { name: 'Waldorf Astoria', logo: '/images/brands/waldorf.png' },
    { name: 'Fairmont', logo: '/images/brands/fairmont.png' },
    { name: 'Rosewood', logo: '/images/brands/rosewood.png' },
  ];
}
