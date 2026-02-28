import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardContent, Table, Modal, Input, Select, FormField } from '@/components/ui';

const OFFERS = [
  { id: 'OFF-001', name: 'Summer Pharma Deal', discount: '15%', type: 'Percentage', hospitals: 'All', validTill: '2026-03-31', status: 'Active', zohoId: 'ZHO-4421' },
  { id: 'OFF-002', name: 'Bulk Order Bonus', discount: '₹5,000', type: 'Flat', hospitals: 'Premium', validTill: '2026-04-15', status: 'Active', zohoId: 'ZHO-4422' },
  { id: 'OFF-003', name: 'New Hospital Welcome', discount: '20%', type: 'Percentage', hospitals: 'New Clients', validTill: '2026-02-28', status: 'Expiring', zohoId: 'ZHO-4423' },
  { id: 'OFF-004', name: 'Doctor Referral', discount: '10%', type: 'Percentage', hospitals: 'Referred', validTill: '2026-05-01', status: 'Draft', zohoId: '—' },
  { id: 'OFF-005', name: 'Year End Clearance', discount: '25%', type: 'Percentage', hospitals: 'All', validTill: '2025-12-31', status: 'Expired', zohoId: 'ZHO-4020' },
];

const statusColor = { Active: 'success', Expiring: 'warning', Draft: 'gray', Expired: 'danger' };

export default function Offers() {
  const [modal, setModal] = useState(false);
  return (
    <div className="animate-page" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>Offers & Discounts</h1>
          <p style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 3 }}>Promotional pricing synced with Zoho CRM Price Books</p>
        </div>
        <Button onClick={() => setModal(true)}><Plus size={14} />New Offer</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[['2', 'Active Offers', 'var(--green)', 'var(--green-dim)'], ['1', 'Expiring Soon', 'var(--amber)', 'var(--amber-dim)'], ['1', 'Drafts', 'var(--text-2)', 'var(--surface-2)'], ['₹2.4L', 'Savings Given', 'var(--accent)', 'var(--accent-dim)']].map(([v, l, c, bg]) => (
          <div key={l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: c }}>{v}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>All Offers</span>
            <Badge variant="accent">Zoho Synced</Badge>
          </div>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <Table
            headers={['ID', 'Offer Name', 'Discount', 'Type', 'Applicable', 'Valid Till', 'Zoho ID', 'Status']}
            rows={OFFERS.map(o => ({
              ...o,
              cells: [
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{o.id}</span>,
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{o.name}</span>,
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--green)', fontSize: 14 }}>{o.discount}</span>,
                o.type, o.hospitals,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{o.validTill}</span>,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{o.zohoId}</span>,
                <Badge variant={statusColor[o.status]}>{o.status}</Badge>
              ]
            }))}
            actions={row => [
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Edit size={13} /></button>,
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Trash2 size={13} /></button>,
            ]}
          />
        </CardContent>
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title="Create New Offer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FormField label="Offer Name"><Input placeholder="e.g. Summer Pharma Deal" /></FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <FormField label="Discount Type"><Select><option>Percentage</option><option>Flat Amount</option></Select></FormField>
            <FormField label="Value"><Input placeholder="e.g. 15 or 5000" /></FormField>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <FormField label="Valid From"><Input type="date" /></FormField>
            <FormField label="Valid Till"><Input type="date" /></FormField>
          </div>
          <FormField label="Applicable To"><Select><option>All Hospitals</option><option>Premium</option><option>New Clients</option></Select></FormField>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-2)' }}>
            <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />
            Push to Zoho CRM Price Book
          </label>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
          <Button onClick={() => setModal(false)}>Create Offer</Button>
        </div>
      </Modal>
    </div>
  );
}
