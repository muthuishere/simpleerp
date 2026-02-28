import { useState } from 'react';
import { Plus, Download, Send, Eye, CheckCircle } from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardContent, Table, Modal, Input, Select, FormField } from '@/components/ui';

const INVOICES = [
  { id: 'INV-0893', hospital: 'City General Hospital', amount: '₹18,500', tax: '₹3,330', total: '₹21,830', status: 'Paid', dueDate: '2026-02-20', zohoId: 'ZINV-8821' },
  { id: 'INV-0892', hospital: 'Apollo Clinic', amount: '₹9,200', tax: '₹1,656', total: '₹10,856', status: 'Pending', dueDate: '2026-03-05', zohoId: 'ZINV-8820' },
  { id: 'INV-0891', hospital: 'Max Healthcare', amount: '₹42,000', tax: '₹7,560', total: '₹49,560', status: 'Overdue', dueDate: '2026-02-15', zohoId: 'ZINV-8819' },
  { id: 'INV-0890', hospital: 'Fortis Hospital', amount: '₹6,800', tax: '₹1,224', total: '₹8,024', status: 'Paid', dueDate: '2026-02-10', zohoId: 'ZINV-8818' },
  { id: 'INV-0889', hospital: 'AIIMS', amount: '₹78,500', tax: '₹14,130', total: '₹92,630', status: 'Draft', dueDate: '2026-03-15', zohoId: '—' },
];

const statusColor = { Paid: 'success', Pending: 'warning', Overdue: 'danger', Draft: 'gray' };

export default function Invoices() {
  const [modal, setModal] = useState(false);
  return (
    <div className="animate-page" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>Invoices</h1>
          <p style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 3 }}>GST-ready · Zoho Books integrated</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="outline" size="sm"><Download size={13} />Export</Button>
          <Button onClick={() => setModal(true)}><Plus size={14} />New Invoice</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[['₹1,82,900', 'Total Billed', 'var(--text)'], ['₹29,854', 'Collected', 'var(--green)'], ['₹10,856', 'Pending', 'var(--amber)'], ['₹49,560', 'Overdue', 'var(--red)']].map(([v, l, c]) => (
          <div key={l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>Invoice List</span>
            <Badge variant="accent">Zoho Books</Badge>
          </div>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <Table
            headers={['Invoice #', 'Hospital', 'Amount', 'GST 18%', 'Total', 'Due Date', 'Zoho ID', 'Status']}
            rows={INVOICES.map(i => ({
              ...i,
              cells: [
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)' }}>{i.id}</span>,
                <span style={{ color: 'var(--text)', fontSize: 13 }}>{i.hospital}</span>,
                i.amount, i.tax,
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)' }}>{i.total}</span>,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i.status === 'Overdue' ? 'var(--red)' : 'var(--text-3)' }}>{i.dueDate}</span>,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{i.zohoId}</span>,
                <Badge variant={statusColor[i.status]}>{i.status}</Badge>
              ]
            }))}
            actions={row => [
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Eye size={13} /></button>,
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--indigo)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Send size={13} /></button>,
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><CheckCircle size={13} /></button>,
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-2)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Download size={13} /></button>,
            ]}
          />
        </CardContent>
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title="Create Invoice" size="lg">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <FormField label="Hospital"><Select><option>Select Hospital</option><option>City General Hospital</option><option>Apollo Clinic</option></Select></FormField>
          <FormField label="Order Reference"><Select><option>Link to Order</option><option>ORD-1042</option><option>ORD-1041</option></Select></FormField>
          <FormField label="Invoice Date"><Input type="date" /></FormField>
          <FormField label="Due Date"><Input type="date" /></FormField>
          <FormField label="Amount (ex-tax)"><Input type="number" placeholder="0.00" /></FormField>
          <FormField label="GST"><Select><option>18%</option><option>12%</option><option>5%</option></Select></FormField>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-2)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />Push to Zoho Books
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
          <Button variant="ghost" onClick={() => setModal(false)}>Save Draft</Button>
          <Button onClick={() => setModal(false)}>Create & Send</Button>
        </div>
      </Modal>
    </div>
  );
}
