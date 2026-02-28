import { useState } from 'react';
import { Plus, Edit, MapPin, Phone, Search } from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardContent, Table, Modal, Input, Select, FormField } from '@/components/ui';

const HOSPITALS = [
  { id: 'HSP-001', name: 'City General Hospital', type: 'Government', city: 'Mumbai', doctors: 24, orders: 142, contact: '+91 22 2345 6789', status: 'Active', zohoId: 'ZACC-1001' },
  { id: 'HSP-002', name: 'Apollo Clinic', type: 'Private', city: 'Delhi', doctors: 8, orders: 67, contact: '+91 11 4567 8901', status: 'Active', zohoId: 'ZACC-1002' },
  { id: 'HSP-003', name: 'Max Healthcare', type: 'Corporate', city: 'Bangalore', doctors: 45, orders: 289, contact: '+91 80 3456 7890', status: 'Active', zohoId: 'ZACC-1003' },
  { id: 'HSP-004', name: 'Fortis Hospital', type: 'Corporate', city: 'Chennai', doctors: 31, orders: 178, contact: '+91 44 2345 6789', status: 'Active', zohoId: 'ZACC-1004' },
  { id: 'HSP-005', name: 'AIIMS Delhi', type: 'Government', city: 'Delhi', doctors: 120, orders: 512, contact: '+91 11 2658 8500', status: 'Active', zohoId: 'ZACC-1005' },
  { id: 'HSP-006', name: 'Rural Health Centre', type: 'NGO', city: 'Pune', doctors: 3, orders: 12, contact: '+91 20 2345 6789', status: 'Inactive', zohoId: 'ZACC-1006' },
];

const typeColor = { Government: 'default', Private: 'indigo', Corporate: 'success', NGO: 'warning' };

export default function Hospitals() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const filtered = HOSPITALS.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-page" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>Hospital Master Data</h1>
          <p style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 3 }}>{HOSPITALS.length} hospitals registered</p>
        </div>
        <Button onClick={() => setModal(true)}><Plus size={14} />Add Hospital</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {['Government', 'Private', 'Corporate', 'NGO'].map(t => (
          <div key={t} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text)' }}>{HOSPITALS.filter(h => h.type === t).length}</div>
            <Badge variant={typeColor[t]} style={{ marginTop: 6 }}>{t}</Badge>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
            <Input style={{ paddingLeft: 30 }} placeholder="Search hospitals by name or city..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <Table
            headers={['ID', 'Hospital', 'Type', 'City', 'Doctors', 'Orders', 'Contact', 'Zoho', 'Status']}
            rows={filtered.map(h => ({
              ...h,
              cells: [
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{h.id}</span>,
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{h.name}</span>,
                <Badge variant={typeColor[h.type]}>{h.type}</Badge>,
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}><MapPin size={11} style={{ color: 'var(--text-3)' }} />{h.city}</div>,
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)' }}>{h.doctors}</span>,
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)' }}>{h.orders}</span>,
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}><Phone size={10} style={{ color: 'var(--text-3)' }} />{h.contact}</div>,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{h.zohoId}</span>,
                <Badge variant={h.status === 'Active' ? 'success' : 'gray'}>{h.status}</Badge>
              ]
            }))}
            actions={row => [
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Edit size={13} /></button>,
            ]}
          />
        </CardContent>
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Hospital" size="lg">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ gridColumn: '1 / -1' }}><FormField label="Hospital Name"><Input placeholder="Full hospital name" /></FormField></div>
          <FormField label="Type"><Select><option>Government</option><option>Private</option><option>Corporate</option><option>NGO</option></Select></FormField>
          <FormField label="City"><Input placeholder="City" /></FormField>
          <FormField label="Phone"><Input placeholder="+91..." /></FormField>
          <FormField label="Email"><Input type="email" placeholder="procurement@hospital.in" /></FormField>
          <FormField label="GSTIN"><Input placeholder="GSTIN number" /></FormField>
          <FormField label="License No."><Input placeholder="Hospital license" /></FormField>
          <div style={{ gridColumn: '1 / -1' }}><FormField label="Address"><textarea style={{ width: '100%', padding: '8px 12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--text)', resize: 'none', outline: 'none', fontFamily: 'var(--font-body)' }} rows={2} /></FormField></div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
          <Button onClick={() => setModal(false)}>Add Hospital</Button>
        </div>
      </Modal>
    </div>
  );
}
