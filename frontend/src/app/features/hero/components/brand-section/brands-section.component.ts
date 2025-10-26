import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface Brand {
  name: string;
  logo: string;
}

@Component({
  standalone: true,
  selector: 'app-brands-section',
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brands-section.component.html',
})
export class BrandsSectionComponent {
  @Input() title = 'Trusted by enterprises for mission-critical use cases';
  @Input() subtitle =
    'Payments systems, IAM, logistics, user accounts, and more';
  @Input() brands: Brand[] = [];
}
