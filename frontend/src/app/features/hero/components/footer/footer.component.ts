import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @Input() groups: FooterGroup[] = [];
  @Input() copyrightHolder = '';
  year = new Date().getFullYear();
}
