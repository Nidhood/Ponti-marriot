import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-auth-visual',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth-visual.component.html',
})
export class AuthVisualComponent {
  @Input() imageSrc = '';
  @Input() imageAlt = '3D Illustration';
}
