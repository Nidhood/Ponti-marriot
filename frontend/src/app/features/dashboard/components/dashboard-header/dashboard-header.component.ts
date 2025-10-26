import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  role: string;
  avatar: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard-header',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent {
  @Input() title = 'Dashboard';
  @Input() subtitle = 'Resume of the platform';
  @Input() currentUser: User = {
    name: 'Ramon Ridwan',
    role: 'Administrator',
    avatar: '',
  };
  @Output() menuToggle = new EventEmitter<void>();
}
