import { Dashboard } from '@/components/Dashboard';
import { invoices, leases, maintenanceRequests, payments, tenants } from '@/data/mockData';

export default function Page() {
  return (
    <Dashboard
      initialLeases={leases}
      initialPayments={payments}
      initialInvoices={invoices}
      initialMaintenance={maintenanceRequests}
      tenants={tenants}
    />
  );
}
