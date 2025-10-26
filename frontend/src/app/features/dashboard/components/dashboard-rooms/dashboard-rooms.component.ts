// src/app/features/dashboard/components/dashboard-rooms/dashboard-rooms.component.ts

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
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import {
  Room,
  RoomStats,
  RoomStatus,
  RoomTypeStats,
  RoomReservation,
  RoomFilters,
  PaginationData,
  Hotel,
} from '../../models/rooms.model';
import { RoomsService } from '../../services/rooms.service';

interface DropdownOption {
  label: string;
  value: string | number;
}

@Component({
  standalone: true,
  selector: 'app-dashboard-rooms',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    TooltipModule,
    DialogModule,
    ToastModule,
    CardModule,
  ],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-rooms.component.html',
})
export class DashboardRoomsComponent implements OnInit {
  // Stats
  stats = signal<RoomStats>({
    totalRooms: 0,
    available: 0,
    occupied: 0,
    avgRatePerNight: 0,
  });

  roomTypeStats = signal<RoomTypeStats[]>([]);
  recentReservations = signal<RoomReservation[]>([]);
  hotels = signal<Hotel[]>([]);

  // Table Data
  rooms = signal<Room[]>([]);
  loading = signal(false);

  // Filters
  selectedHotel = signal<string>('all');
  selectedStatus = signal<string>('all');
  selectedRoomType = signal<string>('all');
  selectedFloor = signal<number | string>('all');

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  // Dropdown Options
  hotelOptions = signal<DropdownOption[]>([
    { label: 'All Hotels', value: 'all' },
  ]);

  statusOptions: DropdownOption[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Available', value: RoomStatus.AVAILABLE },
    { label: 'Occupied', value: RoomStatus.OCCUPIED },
    { label: 'Reserved', value: RoomStatus.RESERVED },
    { label: 'Maintenance', value: RoomStatus.MAINTENANCE },
    { label: 'Cleaning', value: RoomStatus.CLEANING },
    { label: 'Out of Service', value: RoomStatus.OUT_OF_SERVICE },
  ];

  roomTypeOptions: DropdownOption[] = [
    { label: 'All Room Types', value: 'all' },
    { label: 'Single Room', value: 'Single Room' },
    { label: 'Double Room', value: 'Double Room' },
    { label: 'Family Suit', value: 'Family Suit' },
  ];

  floorOptions: DropdownOption[] = [
    { label: 'All Floors', value: 'all' },
    ...Array.from({ length: 15 }, (_, i) => ({
      label: `Floor ${i + 1}`,
      value: i + 1,
    })),
  ];

  // Dialog
  selectedRoom = signal<Room | null>(null);
  showDetailDialog = signal(false);

  constructor(
    private roomsService: RoomsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRoomTypeStats();
    this.loadRecentReservations();
    this.loadHotels();
    this.loadRooms();
  }

  private loadStats(): void {
    this.roomsService.getStats().subscribe((stats) => {
      this.stats.set(stats);
    });
  }

  private loadRoomTypeStats(): void {
    this.roomsService.getRoomTypeStats().subscribe((stats) => {
      this.roomTypeStats.set(stats);
    });
  }

  private loadRecentReservations(): void {
    this.roomsService.getRecentReservations().subscribe((reservations) => {
      this.recentReservations.set(reservations);
    });
  }

  private loadHotels(): void {
    this.roomsService.getHotels().subscribe((hotels) => {
      this.hotels.set(hotels);
      const options = [
        { label: 'All Hotels', value: 'all' },
        ...hotels.map((h) => ({ label: `${h.name} - ${h.city}`, value: h.id })),
      ];
      this.hotelOptions.set(options);
    });
  }

  loadRooms(): void {
    this.loading.set(true);

    const filters: RoomFilters = {
      hotel: this.selectedHotel() !== 'all' ? this.selectedHotel() : undefined,
      status:
        this.selectedStatus() !== 'all'
          ? (this.selectedStatus() as RoomStatus)
          : undefined,
      roomType:
        this.selectedRoomType() !== 'all' ? this.selectedRoomType() : undefined,
      floor:
        this.selectedFloor() !== 'all'
          ? (this.selectedFloor() as number)
          : undefined,
    };

    const pagination: PaginationData = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      totalItems: 0,
      totalPages: 0,
    };

    this.roomsService.getRooms(filters, pagination).subscribe((result) => {
      this.rooms.set(result.data);
      this.totalItems.set(result.pagination.totalItems);
      this.loading.set(false);
    });
  }

  onFilterChange(): void {
    this.currentPage.set(1);
    this.loadRooms();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadRooms();
  }

  viewRoomDetails(roomType: RoomTypeStats): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Room Details',
      detail: `Viewing ${roomType.type} details`,
      life: 3000,
    });
  }

  editRoom(roomType: RoomTypeStats): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Edit Room',
      detail: `Editing ${roomType.type}`,
      life: 3000,
    });
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' {
    const severityMap: Record<
      string,
      'success' | 'info' | 'warning' | 'danger'
    > = {
      Available: 'success',
      Occupied: 'info',
      Reserved: 'warning',
      Maintenance: 'danger',
      Cleaning: 'warning',
      'Out of Service': 'danger',
      Confirmed: 'success',
      Processing: 'info',
      Canceled: 'danger',
    };
    return severityMap[status] || 'info';
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
}
