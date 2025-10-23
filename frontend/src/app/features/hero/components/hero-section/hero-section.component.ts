import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

export interface HeroAction {
  label: string;
  href: string;
  ariaLabel?: string;
}

@Component({
  standalone: true,
  selector: 'app-hero-section',
  imports: [NgIf, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  @HostBinding('class') host = 'block';
  @Input() backgroundUrl = '/images/luxury-hotel-hero.jpeg';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() action?: HeroAction;
  @Input() minHeightClass = 'min-h-[80vh] md:min-h-[88vh]';
  @Output() actionClick = new EventEmitter<void>();
}
