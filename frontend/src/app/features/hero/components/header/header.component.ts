import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [NgFor, NgIf, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @HostBinding('class') host = 'block sticky top-0 z-50';
  @Input() logoSrc = '';
  @Input() logoAlt = 'Logo';
  @Input() navLinks: NavLink[] = [];
  @Input() ctaLabel = '';
  @Input() ctaHref = '';
  @Output() navClicked = new EventEmitter<string>();
  @Output() ctaClicked = new EventEmitter<void>();

  mobileOpen = false;
  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }
}
