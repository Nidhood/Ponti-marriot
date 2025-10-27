// src/app/features/dashboard/components/dashboard-reservations/dashboard-reservations.component.ts

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
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import {
  Reservation,
  ReservationStats,
  ReservationStatus,
  RoomType,
  ReservationFilters,
  PaginationData,
} from '../../models/reservation.model';
import { ReservationsService } from '../../services/reservations.service';

interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard-reservations',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-reservations.component.html',
})
export class DashboardReservationsComponent implements OnInit {
  // Stats
  stats = signal<ReservationStats>({
    totalReservations: 0,
    checkInsToday: 0,
    checkOutsToday: 0,
    revenueToday: 0,
    totalChange: '',
    checkInPending: 0,
    checkOutOverdue: 0,
    revenueChange: '',
  });

  // Table Data
  reservations = signal<Reservation[]>([]);
  loading = signal(false);

  // Filters
  searchTerm = signal('');
  selectedStatus = signal<string>('all');
  selectedRoomType = signal<string>('all');
  dateRange = signal<Date[] | null>(null);

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  // Dropdown Options
  statusOptions: DropdownOption[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Confirmed', value: ReservationStatus.CONFIRMED },
    { label: 'Check-in', value: ReservationStatus.CHECK_IN },
    { label: 'Check-out', value: ReservationStatus.CHECK_OUT },
    { label: 'Pending', value: ReservationStatus.PENDING },
    { label: 'Completed', value: ReservationStatus.COMPLETED },
    { label: 'Cancelled', value: ReservationStatus.CANCELLED },
    { label: 'No Show', value: ReservationStatus.NO_SHOW },
  ];

  roomTypeOptions: DropdownOption[] = [
    { label: 'All Room Types', value: 'all' },
    { label: 'Single Room', value: RoomType.SINGLE },
    { label: 'Double Room', value: RoomType.DOUBLE },
    { label: 'Suite', value: RoomType.SUITE },
    { label: 'Family Room', value: RoomType.FAMILY },
    { label: 'Deluxe Room', value: RoomType.DELUXE },
    { label: 'Presidential Suite', value: RoomType.PRESIDENTIAL },
  ];

  // Dialog
  selectedReservation = signal<Reservation | null>(null);
  showDetailDialog = signal(false);

  constructor(
    private reservationsService: ReservationsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadReservations();
  }

  private loadStats(): void {
    this.reservationsService.getStats().subscribe((stats) => {
      this.stats.set(stats);
    });
  }

  loadReservations(): void {
    this.loading.set(true);

    const filters: ReservationFilters = {
      status:
        this.selectedStatus() !== 'all'
          ? (this.selectedStatus() as ReservationStatus)
          : undefined,
      roomType:
        this.selectedRoomType() !== 'all'
          ? (this.selectedRoomType() as RoomType)
          : undefined,
      searchTerm: this.searchTerm() || undefined,
      dateRange: this.dateRange()
        ? {
            start: this.dateRange()![0],
            end: this.dateRange()![1] || this.dateRange()![0],
          }
        : undefined,
    };

    const pagination: PaginationData = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      totalItems: 0,
      totalPages: 0,
    };

    this.reservationsService
      .getReservations(filters, pagination)
      .subscribe((result) => {
        this.reservations.set(result.data);
        this.totalItems.set(result.pagination.totalItems);
        this.loading.set(false);
      });
  }

  onFilterChange(): void {
    this.currentPage.set(1);
    this.loadReservations();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadReservations();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedStatus.set('all');
    this.selectedRoomType.set('all');
    this.dateRange.set(null);
    this.currentPage.set(1);
    this.loadReservations();
  }

  viewDetails(reservation: Reservation): void {
    this.selectedReservation.set(reservation);
    this.showDetailDialog.set(true);
  }

  editReservation(reservation: Reservation): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Edit Reservation',
      detail: `Editing reservation ${reservation.reservationNumber}`,
      life: 3000,
    });
    // Implement edit logic
  }

  deleteReservation(reservation: Reservation): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete reservation ${reservation.reservationNumber}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.reservationsService
          .deleteReservation(reservation.id)
          .subscribe((success) => {
            if (success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Deleted',
                detail: 'Reservation deleted successfully',
                life: 3000,
              });
              this.loadReservations();
            }
          });
      },
    });
  }

  changeStatus(reservation: Reservation, newStatus: ReservationStatus): void {
    this.reservationsService
      .updateReservationStatus(reservation.id, newStatus)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Status Updated',
          detail: `Reservation status changed to ${newStatus}`,
          life: 3000,
        });
        this.loadReservations();
      });
  }

  exportData(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Export',
      detail: 'Exporting reservations data...',
      life: 3000,
    });
    // Implement export logic
  }

  printTable(): void {
    window.print();
  }

  getStatusSeverity(
    status: ReservationStatus
  ): 'success' | 'info' | 'warning' | 'danger' {
    const severityMap: Record<
      ReservationStatus,
      'success' | 'info' | 'warning' | 'danger'
    > = {
      [ReservationStatus.CONFIRMED]: 'success',
      [ReservationStatus.CHECK_IN]: 'info',
      [ReservationStatus.CHECK_OUT]: 'warning',
      [ReservationStatus.PENDING]: 'warning',
      [ReservationStatus.COMPLETED]: 'success',
      [ReservationStatus.CANCELLED]: 'danger',
      [ReservationStatus.NO_SHOW]: 'danger',
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

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'checked_in':
      case 'Check-in':
        return 'bg-green-100 text-green-700';
      case 'upcoming':
      case 'Pending':
        return 'bg-blue-100 text-blue-700';
      case 'checked_out':
      case 'Completed':
        return 'bg-gray-100 text-gray-700';
      case 'canceled':
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  }
}
