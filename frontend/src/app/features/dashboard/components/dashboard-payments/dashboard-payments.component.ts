import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dashboard-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './dashboard-payments.component.html',
})
export class DashboardPaymentsComponent {
  searchTerm = '';
  selectedStatus = 'All';

  statusOptions = [
    { label: 'All Status', value: 'All' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Failed', value: 'Failed' },
  ];

  payments = signal([
    {
      id: '#PAY-001',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      amount: 1250,
      method: 'Credit Card',
      status: 'Completed',
      date: '2024-01-15',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '#PAY-002',
      customer: 'Mike Wilson',
      email: 'mike@example.com',
      amount: 890.5,
      method: 'PayPal',
      status: 'Pending',
      date: '2024-01-14',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    {
      id: '#PAY-003',
      customer: 'Laura Gómez',
      email: 'laura@example.com',
      amount: 620.0,
      method: 'Bank Transfer',
      status: 'Failed',
      date: '2024-01-13',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    },
  ]);

  stats = computed(() => [
    {
      title: 'Total Payments',
      value: this.formatCurrency(127430),
      change: '+12.5% from last month',
      trend: 'up',
      icon: 'pi-dollar',
    },
    {
      title: 'Completed',
      value: 2847,
      change: '+8.2% from last month',
      trend: 'up',
      icon: 'pi-check-circle',
    },
    {
      title: 'Pending',
      value: 156,
      change: '+3 from yesterday',
      trend: 'up',
      icon: 'pi-clock',
    },
    {
      title: 'Failed',
      value: 23,
      change: '-2 from yesterday',
      trend: 'down',
      icon: 'pi-times-circle',
    },
  ]);

  filteredPayments = computed(() => {
    const term = this.searchTerm.toLowerCase();
    const status = this.selectedStatus;

    return this.payments().filter((p) => {
      const matchSearch =
        p.customer.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term);

      const matchStatus = status === 'All' ? true : p.status === status;

      return matchSearch && matchStatus;
    });
  });

  // === Helpers ===
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  onFilterChange() {
    // fuerza la reactividad
    this.searchTerm = this.searchTerm.trim();
  }

  viewPayment(payment: any) {
    console.log('Viewing payment:', payment);
  }

  refundPayment(payment: any) {
    console.log('Refunding payment:', payment);
  }

  cancelPayment(payment: any) {
    console.log('Cancelling payment:', payment);
  }
}
