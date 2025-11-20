import { Invoice, Lease, MaintenanceRequest, Payment, Property, Tenant } from '@/lib/types';

export const tenants: Tenant[] = [
  { id: 't1', name: 'Chipo Mwansa', phone: '+260 97 123 4567', email: 'chipo@example.com', unit: 'A-3', status: 'Active' },
  { id: 't2', name: 'Mutale Banda', phone: '+260 96 555 0101', email: 'mutale@example.com', unit: 'B-2', status: 'Overdue' },
  { id: 't3', name: 'Luyando Phiri', phone: '+260 95 908 3344', email: 'luyando@example.com', unit: 'C-1', status: 'Pending' }
];

export const properties: Property[] = [
  { id: 'p1', name: 'Kabulonga Villas', location: 'Lusaka', landlord: 'Nawa Properties', occupancy: 18, units: 20 },
  { id: 'p2', name: 'Mukuba Heights', location: 'Kitwe', landlord: 'Copperbelt Estates', occupancy: 30, units: 35 }
];

export const leases: Lease[] = [
  { id: 'l1', tenantId: 't1', propertyId: 'p1', startDate: '2024-02-01', endDate: '2025-01-31', rent: 8500, currency: 'ZMW', increaseDate: '2025-02-01', status: 'Active' },
  { id: 'l2', tenantId: 't2', propertyId: 'p2', startDate: '2023-12-01', endDate: '2024-11-30', rent: 10200, currency: 'ZMW', increaseDate: '2024-12-01', status: 'Ending Soon' }
];

export const payments: Payment[] = [
  { id: 'pay1', tenantId: 't1', propertyId: 'p1', amount: 8500, currency: 'ZMW', method: 'Mobile Money', date: '2024-11-01', reference: 'MOMO-3221', receiptIssued: true },
  { id: 'pay2', tenantId: 't2', propertyId: 'p2', amount: 6000, currency: 'ZMW', method: 'Bank Transfer', date: '2024-10-28', reference: 'BT-4091', receiptIssued: false }
];

export const invoices: Invoice[] = [
  { id: 'inv1', tenantId: 't2', amount: 10200, currency: 'ZMW', dueDate: '2024-11-05', status: 'Sent' },
  { id: 'inv2', tenantId: 't3', amount: 6500, currency: 'ZMW', dueDate: '2024-11-10', status: 'Pending' }
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: 'm1', tenantId: 't1', propertyId: 'p1', issue: 'Leaking geyser in bathroom', priority: 'High', status: 'Scheduled', reportedAt: '2024-10-30', assignedTo: 'Brighton (Plumber)' },
  { id: 'm2', tenantId: 't3', propertyId: 'p1', issue: 'Gate remote not responding', priority: 'Medium', status: 'Open', reportedAt: '2024-11-02' }
];
