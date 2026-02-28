import { useState } from 'react';
import { Plus, Search, Eye, Edit, Truck, Filter } from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardContent, Table, Modal, Input, Select, FormField } from '@/components/ui';

const ORDERS = [
  { id: 'ORD-1042', hospital: 'City General Hospital', doctor: 'Dr. Arjun Mehta', items: 5, total: '₹18,500', status: 'Pending', date: '2026-02-28' },
  { id: 'ORD-1041', hospital: 'Apollo Clinic', doctor: 'Dr. Priya Sharma', items: 3, total: '₹9,200', status: 'Processing', date: '2026-02-27' },
  { id: 'ORD-1040', hospital: 'Max Healthcare', doctor: 'Dr. Rohit Singh', items: 8, total: '₹42,000', status: 'Shipped', date: '2026-02-26' },
  { id: 'ORD-1039', hospital: 'Fortis Hospital', doctor: 'Dr. Neha Patel', items: 2, total: '₹6,800', status: 'Delivered', date: '2026-02-25' },
  { id: 'ORD-1038', hospital: 'AIIMS', doctor: 'Dr. Kavita Rao', items: 12, total: '₹78,500', status: 'Delivered', date: '2026-02-24' },
  { id: 'ORD-1037', hospital: 'City General Hospital', doctor: 'Dr. Arjun Mehta', items: 4, total: '₹22,300', status: 'Cancelled', date: '2026-02-23' },
];

const statusColor = { Pending: 'warning', Processing: 'default', Shipped: 'purple', Delivered: 'success', Cancelled: 'danger' };

export default function Orders() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(false);
  const filtered = ORDERS.filter(o =>
    (filter === 'All' || o.status === filter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.hospital.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="animate-page" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>Order Manager</h1>
          <p style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 3, fontFamily: 'var(--font-mono)' }}>{ORDERS.length} TOTAL ORDERS</p>
        </div>
        <Button onClick={() => setModal(true)}><Plus size={14} />New Order</Button>
      </div>

      {/* Status pills */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
            background: filter === s ? 'var(--accent)' : 'var(--surface)',
            color: filter === s ? 'var(--bg)' : 'var(--text-2)',
            border: `1px solid ${filter === s ? 'var(--accent)' : 'var(--border)'}`,
          }}>
            {s}{s !== 'All' && ` (${ORDERS.filter(o => o.status === s).length})`}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
              <Input style={{ paddingLeft: 30 }} placeholder="Search by order ID or hospital..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Button variant="outline" size="sm"><Filter size={13} />Filter</Button>
          </div>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <Table
            headers={['Order ID', 'Hospital', 'Doctor', 'Items', 'Total', 'Status', 'Date']}
            rows={filtered.map(o => ({
              ...o,
              cells: [
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)' }}>{o.id}</span>,
                <span style={{ color: 'var(--text)', fontSize: 13 }}>{o.hospital}</span>,
                o.doctor,
                <span style={{ fontFamily: 'var(--font-mono)', textAlign: 'center', display: 'block' }}>{o.items}</span>,
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)' }}>{o.total}</span>,
                <Badge variant={statusColor[o.status]}>{o.status}</Badge>,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{o.date}</span>
              ]
            }))}
            actions={row => [
              <button style={{ padding: '5px', borderRadius: 6, color: 'var(--text-3)', cursor: 'pointer', transition: 'all 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Eye size={13} /></button>,
              <button style={{ padding: '5px', borderRadius: 6, color: 'var(--text-3)', cursor: 'pointer', transition: 'all 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--indigo)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Edit size={13} /></button>,
              <button style={{ padding: '5px', borderRadius: 6, color: 'var(--text-3)', cursor: 'pointer', transition: 'all 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--purple)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Truck size={13} /></button>,
            ]}
          />
        </CardContent>
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title="Create New Order" size="lg">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ gridColumn: '1 / -1' }}><FormField label="Hospital"><Select><option>Select Hospital</option><option>City General Hospital</option><option>Apollo Clinic</option><option>Max Healthcare</option></Select></FormField></div>
          <FormField label="Doctor"><Select><option>Select Doctor</option><option>Dr. Arjun Mehta</option><option>Dr. Priya Sharma</option></Select></FormField>
          <FormField label="Delivery Date"><Input type="date" /></FormField>
          <FormField label="Product"><Select><option>Select Product</option><option>Paracetamol 500mg</option><option>Amoxicillin 250mg</option></Select></FormField>
          <FormField label="Quantity"><Input type="number" placeholder="0" /></FormField>
          <div style={{ gridColumn: '1 / -1' }}><FormField label="Notes"><textarea style={{ width: '100%', padding: '8px 12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--text)', resize: 'none', outline: 'none', fontFamily: 'var(--font-body)' }} rows={3} placeholder="Special instructions..." /></FormField></div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
          <Button onClick={() => setModal(false)}>Create Order</Button>
        </div>
      </Modal>
    </div>
  );
}
