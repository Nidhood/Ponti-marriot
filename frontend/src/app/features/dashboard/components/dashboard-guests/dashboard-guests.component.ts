// src/app/features/dashboard/components/dashboard-guests/dashboard-guests.component.ts

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import {
  Guest,
  GuestStats,
  GuestStatus,
  LoyaltyTier,
  GuestFilters,
  PaginationData,
} from '../../models/guest.model';
import { GuestsService } from '../../services/guests.service';

interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard-guests',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-guests.component.html',
})
export class DashboardGuestsComponent implements OnInit {
  // Stats
  stats = signal<GuestStats>({
    totalGuests: 0,
    activeGuests: 0,
    vipGuests: 0,
    newToday: 0,
  });

  // Table Data
  guests = signal<Guest[]>([]);
  loading = signal(false);

  // Filters
  searchTerm = signal('');
  selectedStatus = signal<string>('all');
  selectedRoomType = signal<string>('all');

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  // Dropdown Options
  statusOptions: DropdownOption[] = [
    { label: 'All Status', value: 'all' },
    { label: 'VIP Active', value: GuestStatus.VIP_ACTIVE },
    { label: 'Active', value: GuestStatus.ACTIVE },
    { label: 'New', value: GuestStatus.NEW },
    { label: 'Checked Out', value: GuestStatus.CHECKED_OUT },
    { label: 'Cancelled', value: GuestStatus.CANCELLED },
  ];

  roomTypeOptions: DropdownOption[] = [
    { label: 'All Room Types', value: 'all' },
    { label: 'Single Room', value: 'Single Room' },
    { label: 'Double Room', value: 'Double Room' },
    { label: 'Suite', value: 'Suite' },
    { label: 'Family Room', value: 'Family Room' },
    { label: 'Deluxe Room', value: 'Deluxe Room' },
  ];

  // Dialog
  selectedGuest = signal<Guest | null>(null);
  showDetailDialog = signal(false);

  constructor(
    private guestsService: GuestsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadGuests();
  }

  private loadStats(): void {
    this.guestsService.getStats().subscribe((stats) => {
      this.stats.set(stats);
    });
  }

  loadGuests(): void {
    this.loading.set(true);

    const filters: GuestFilters = {
      status:
        this.selectedStatus() !== 'all'
          ? (this.selectedStatus() as GuestStatus)
          : undefined,
      roomType:
        this.selectedRoomType() !== 'all' ? this.selectedRoomType() : undefined,
      searchTerm: this.searchTerm() || undefined,
    };

    const pagination: PaginationData = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      totalItems: 0,
      totalPages: 0,
    };

    this.guestsService.getGuests(filters, pagination).subscribe((result) => {
      this.guests.set(result.data);
      this.totalItems.set(result.pagination.totalItems);
      this.loading.set(false);
    });
  }

  onFilterChange(): void {
    this.currentPage.set(1);
    this.loadGuests();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadGuests();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedStatus.set('all');
    this.selectedRoomType.set('all');
    this.currentPage.set(1);
    this.loadGuests();
  }

  applyFilters(): void {
    this.onFilterChange();
  }

  viewDetails(guest: Guest): void {
    this.selectedGuest.set(guest);
    this.showDetailDialog.set(true);
  }

  editGuest(guest: Guest): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Edit Guest',
      detail: `Editing guest ${guest.name}`,
      life: 3000,
    });
  }

  deleteGuest(guest: Guest): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete guest ${guest.name}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.guestsService.deleteGuest(guest.id).subscribe((success) => {
          if (success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Guest deleted successfully',
              life: 3000,
            });
            this.loadGuests();
          }
        });
      },
    });
  }

  getStatusSeverity(
    status: GuestStatus
  ): 'success' | 'info' | 'warning' | 'danger' {
    const severityMap: Record<
      GuestStatus,
      'success' | 'info' | 'warning' | 'danger'
    > = {
      [GuestStatus.VIP_ACTIVE]: 'success',
      [GuestStatus.ACTIVE]: 'info',
      [GuestStatus.NEW]: 'warning',
      [GuestStatus.CHECKED_OUT]: 'warning',
      [GuestStatus.CANCELLED]: 'danger',
      [GuestStatus.BLACKLISTED]: 'danger',
    };
    return severityMap[status];
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }
}
