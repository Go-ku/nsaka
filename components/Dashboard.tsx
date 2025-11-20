'use client';

import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Banknote, BellRing, Building2, FileText, Hammer, ListChecks, UserRound } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { StatusBadge } from './StatusBadge';
import { StatCard } from './StatCard';
import { formatCurrency } from '@/lib/utils';
import { Invoice, Lease, MaintenanceRequest, Payment, Tenant } from '@/lib/types';

interface DashboardProps {
  initialLeases: Lease[];
  initialPayments: Payment[];
  initialInvoices: Invoice[];
  initialMaintenance: MaintenanceRequest[];
  tenants: Tenant[];
}

export function Dashboard({ initialLeases, initialPayments, initialInvoices, initialMaintenance, tenants }: DashboardProps) {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [maintenance, setMaintenance] = useState<MaintenanceRequest[]>(initialMaintenance);

  const stats = useMemo(() => {
    const monthlyRent = initialLeases.reduce((sum, lease) => sum + lease.rent, 0);
    const overdue = invoices.filter(inv => inv.status !== 'Paid').length;
    const openMaintenance = maintenance.filter(req => req.status !== 'Completed').length;
    const receipts = payments.filter(pay => pay.receiptIssued).length;
    return { monthlyRent, overdue, openMaintenance, receipts };
  }, [initialLeases, invoices, maintenance, payments]);

  const leaseColumns: ColumnDef<Lease>[] = [
    { header: 'Tenant', accessorKey: 'tenantId', cell: ({ getValue }) => tenants.find(t => t.id === getValue())?.name },
    { header: 'Unit', accessorKey: 'tenantId', cell: ({ getValue }) => tenants.find(t => t.id === getValue())?.unit },
    { header: 'Rent (ZMW)', accessorKey: 'rent', cell: ({ getValue }) => formatCurrency(getValue() as number) },
    { header: 'End', accessorKey: 'endDate', cell: ({ getValue }) => format(getValue() as string, 'dd MMM yyyy') },
    { header: 'Increase', accessorKey: 'increaseDate', cell: ({ getValue }) => format(getValue() as string, 'dd MMM yyyy') },
    { header: 'Status', accessorKey: 'status', cell: ({ getValue }) => <StatusBadge status={getValue() as string} /> },
  ];

  const paymentColumns: ColumnDef<Payment>[] = [
    { header: 'Tenant', accessorKey: 'tenantId', cell: ({ getValue }) => tenants.find(t => t.id === getValue())?.name },
    { header: 'Amount', accessorKey: 'amount', cell: ({ row }) => formatCurrency(row.original.amount, row.original.currency) },
    { header: 'Method', accessorKey: 'method' },
    { header: 'Date', accessorKey: 'date', cell: ({ getValue }) => format(getValue() as string, 'dd MMM yyyy') },
    { header: 'Receipt', accessorKey: 'receiptIssued', cell: ({ getValue }) => <StatusBadge status={getValue() ? 'Issued' : 'Pending'} /> },
  ];

  const maintenanceColumns: ColumnDef<MaintenanceRequest>[] = [
    { header: 'Issue', accessorKey: 'issue' },
    { header: 'Tenant', accessorKey: 'tenantId', cell: ({ getValue }) => tenants.find(t => t.id === getValue())?.name },
    { header: 'Priority', accessorKey: 'priority', cell: ({ getValue }) => <StatusBadge status={getValue() as string} /> },
    { header: 'Status', accessorKey: 'status', cell: ({ getValue }) => <StatusBadge status={getValue() as string} /> },
    { header: 'Reported', accessorKey: 'reportedAt', cell: ({ getValue }) => format(getValue() as string, 'dd MMM') },
  ];

  const handlePaymentSubmit = (formData: FormData) => {
    const tenantId = formData.get('tenant')?.toString() ?? '';
    const amount = Number(formData.get('amount'));
    const method = formData.get('method')?.toString() as Payment['method'];
    const reference = formData.get('reference')?.toString() ?? 'MANUAL';

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      tenantId,
      propertyId: 'p1',
      amount,
      currency: 'ZMW',
      method,
      date: new Date().toISOString().slice(0, 10),
      reference,
      receiptIssued: true,
    };
    setPayments(prev => [newPayment, ...prev]);
  };

  const handleInvoiceSubmit = (formData: FormData) => {
    const tenantId = formData.get('tenant')?.toString() ?? '';
    const amount = Number(formData.get('amount'));
    const dueDate = formData.get('due')?.toString() ?? '';
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      tenantId,
      amount,
      currency: 'ZMW',
      dueDate,
      status: 'Sent',
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  const handleMaintenanceSubmit = (formData: FormData) => {
    const tenantId = formData.get('tenant')?.toString() ?? '';
    const issue = formData.get('issue')?.toString() ?? '';
    const priority = formData.get('priority')?.toString() as MaintenanceRequest['priority'];
    const newRequest: MaintenanceRequest = {
      id: `m-${Date.now()}`,
      tenantId,
      propertyId: 'p1',
      issue,
      priority,
      status: 'Open',
      reportedAt: new Date().toISOString().slice(0, 10),
    };
    setMaintenance(prev => [newRequest, ...prev]);
  };

  const nextIncrease = useMemo(() => initialLeases.map(lease => ({
    lease,
    days:
      (new Date(lease.increaseDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  })).sort((a, b) => a.days - b.days)[0], [initialLeases]);

  const latestReceipt = payments[0];
  const latestInvoice = invoices[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-400">Nsaka Control Room · Zambia</p>
          <h1 className="text-2xl font-semibold text-white">Real estate operations hub</h1>
        </div>
        <div className="flex gap-2 flex-wrap text-xs text-slate-200">
          {['System Admin', 'Manager', 'Landlord', 'Property Manager', 'Maintenance', 'Tenant'].map(role => (
            <span key={role} className="badge border border-slate-700 bg-slate-900/80">{role}</span>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Monthly rent" value={formatCurrency(stats.monthlyRent)} icon={<Banknote size={16} />} tone="accent" />
        <StatCard label="Receipts issued" value={`${stats.receipts}`} hint="Payment confirmations" icon={<FileText size={16} />} />
        <StatCard label="Open maintenance" value={`${stats.openMaintenance}`} hint="Prioritise today" icon={<Hammer size={16} />} />
        <StatCard label="Unpaid invoices" value={`${stats.overdue}`} hint="Send reminders" icon={<BellRing size={16} />} />
      </section>

      <section className="grid md:grid-cols-[1.4fr_1fr] gap-4">
        <div className="card p-4 space-y-3">
          <div className="section-title"><Building2 size={18} />Leases & rental increases</div>
          <DataTable columns={leaseColumns} data={initialLeases} />
          {nextIncrease && (
            <div className="bg-slate-800/60 rounded-xl p-3 text-sm text-slate-200 flex items-center gap-2">
              <AlertTriangle className="text-amber-400" size={16} />
              Next rent review: {tenants.find(t => t.id === nextIncrease.lease.tenantId)?.name} on {format(nextIncrease.lease.increaseDate, 'dd MMM yyyy')}
            </div>
          )}
        </div>

        <div className="card p-4 space-y-4">
          <div className="section-title"><UserRound size={18} />Quick capture</div>
          <form className="space-y-2" action={handlePaymentSubmit}>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Log payment & receipt</span>
              <span className="text-xs">Manager / Admin</span>
            </div>
            <select name="tenant" className="input">
              {tenants.map(t => <option key={t.id} value={t.id}>{t.name} · {t.unit}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input className="input" name="amount" type="number" min="0" step="0.01" placeholder="Amount (ZMW)" required />
              <select name="method" className="input">
                <option>Mobile Money</option>
                <option>Bank Transfer</option>
                <option>Cash</option>
              </select>
            </div>
            <input className="input" name="reference" placeholder="Reference / proof" />
            <button className="btn-primary w-full" type="submit">Save payment & issue receipt</button>
          </form>

          <form className="space-y-2 pt-2 border-t border-slate-800" action={handleInvoiceSubmit}>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Invoice / reminder</span>
              <span className="text-xs">Manager / Landlord</span>
            </div>
            <select name="tenant" className="input">
              {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input className="input" name="amount" type="number" placeholder="Amount" required />
              <input className="input" name="due" type="date" required />
            </div>
            <button className="btn-secondary w-full" type="submit">Send invoice / reminder</button>
          </form>

          <form className="space-y-2 pt-2 border-t border-slate-800" action={handleMaintenanceSubmit}>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Maintenance request</span>
              <span className="text-xs">Tenant / Manager</span>
            </div>
            <select name="tenant" className="input">
              {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <input className="input" name="issue" placeholder="Issue details" required />
            <select name="priority" className="input">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button className="btn-secondary w-full" type="submit">Log & prioritise</button>
          </form>
        </div>
      </section>

      <section className="grid md:grid-cols-[1.1fr_0.9fr] gap-4">
        <div className="card p-4 space-y-3">
          <div className="section-title"><Banknote size={18} />Payments & receipts</div>
          <DataTable columns={paymentColumns} data={payments} />
          {latestReceipt && (
            <div className="bg-slate-800/70 rounded-xl p-3 text-sm text-slate-200 flex justify-between">
              <span>Latest receipt • {latestReceipt.reference}</span>
              <span>{formatCurrency(latestReceipt.amount)} · {format(latestReceipt.date, 'dd MMM')}</span>
            </div>
          )}
        </div>

        <div className="card p-4 space-y-3">
          <div className="section-title"><ListChecks size={18} />Maintenance queue</div>
          <DataTable columns={maintenanceColumns} data={maintenance} />
          {maintenance.length === 0 && <p className="text-sm text-slate-400">No open tickets.</p>}
        </div>
      </section>

      <section className="card p-4 space-y-3">
        <div className="section-title"><BellRing size={18} />Invoices & reminders</div>
        <div className="grid md:grid-cols-3 gap-3">
          {invoices.map(inv => {
            const tenant = tenants.find(t => t.id === inv.tenantId);
            return (
              <div key={inv.id} className="p-3 rounded-xl border border-slate-800 bg-slate-900/50 space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{tenant?.name}</span>
                  <StatusBadge status={inv.status} />
                </div>
                <div className="text-lg font-semibold text-slate-50">{formatCurrency(inv.amount)}</div>
                <div className="text-xs text-slate-400">Due {format(inv.dueDate, 'dd MMM yyyy')}</div>
                <button className="btn-secondary w-full text-xs">Send WhatsApp reminder</button>
              </div>
            );
          })}
        </div>
        {latestInvoice && (
          <div className="text-xs text-slate-500">Latest invoice {latestInvoice.id} queued for {tenants.find(t => t.id === latestInvoice.tenantId)?.name}</div>
        )}
      </section>
    </div>
  );
}
