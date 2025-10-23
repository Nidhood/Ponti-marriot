import { Component } from '@angular/core';
import { HeaderComponent } from '../hero/components/header/header.component';
import { HeroSectionComponent } from '../hero/components/hero-section/hero-section.component';
import { FooterComponent } from '../hero/components/footer/footer.component';
import {
  FOOTER_GROUPS,
  HERO_BG,
  HERO_CTA,
  HERO_SUBTITLE,
  HERO_TITLE,
  NAV_LINKS,
} from '../hero/models/hero.data';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeroSectionComponent, FooterComponent],
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
}
