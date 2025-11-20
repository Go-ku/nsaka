export type Role = 'System Admin' | 'Manager' | 'Landlord' | 'Property Manager' | 'Maintenance' | 'Tenant';

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  unit: string;
  status: 'Active' | 'Pending' | 'Overdue';
}

export interface Property {
  id: string;
  name: string;
  location: string;
  landlord: string;
  occupancy: number;
  units: number;
}

export interface Lease {
  id: string;
  tenantId: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  rent: number;
  currency: string;
  increaseDate: string;
  status: 'Active' | 'Ending Soon' | 'Expired';
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  currency: string;
  method: 'Mobile Money' | 'Bank Transfer' | 'Cash';
  date: string;
  reference: string;
  receiptIssued: boolean;
}

export interface Invoice {
  id: string;
  tenantId: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: 'Pending' | 'Sent' | 'Paid';
}

export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  issue: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Scheduled' | 'Completed';
  reportedAt: string;
  assignedTo?: string;
}
