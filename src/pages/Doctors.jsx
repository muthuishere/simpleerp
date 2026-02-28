import { useState } from 'react';
import { Plus, Edit, Phone, Search, Award } from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardContent, Table, Modal, Input, Select, FormField } from '@/components/ui';

const DOCTORS = [
  { id: 'DOC-001', name: 'Dr. Arjun Mehta', specialty: 'Cardiology', hospital: 'City General Hospital', reg: 'MCI-2018-45123', phone: '+91 98765 43210', orders: 42, status: 'Active', zohoId: 'ZCON-2001' },
  { id: 'DOC-002', name: 'Dr. Priya Sharma', specialty: 'Endocrinology', hospital: 'Apollo Clinic', reg: 'MCI-2015-32456', phone: '+91 87654 32109', orders: 28, status: 'Active', zohoId: 'ZCON-2002' },
  { id: 'DOC-003', name: 'Dr. Rohit Singh', specialty: 'Orthopedics', hospital: 'Max Healthcare', reg: 'MCI-2012-12345', phone: '+91 76543 21098', orders: 67, status: 'Active', zohoId: 'ZCON-2003' },
  { id: 'DOC-004', name: 'Dr. Neha Patel', specialty: 'Pediatrics', hospital: 'Fortis Hospital', reg: 'MCI-2019-56789', phone: '+91 65432 10987', orders: 15, status: 'Active', zohoId: 'ZCON-2004' },
  { id: 'DOC-005', name: 'Dr. Kavita Rao', specialty: 'Oncology', hospital: 'AIIMS Delhi', reg: 'MCI-2010-98765', phone: '+91 54321 09876', orders: 89, status: 'Active', zohoId: 'ZCON-2005' },
  { id: 'DOC-006', name: 'Dr. Sanjay Kumar', specialty: 'General Medicine', hospital: 'Rural Health Centre', reg: 'MCI-2020-11111', phone: '+91 43210 98765', orders: 8, status: 'Inactive', zohoId: 'ZCON-2006' },
];

const specColor = { Cardiology: 'danger', Endocrinology: 'purple', Orthopedics: 'default', Pediatrics: 'success', Oncology: 'warning', 'General Medicine': 'gray' };

export default function Doctors() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const filtered = DOCTORS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-page" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>Doctor Master Data</h1>
          <p style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 3 }}>{DOCTORS.length} doctors · {[...new Set(DOCTORS.map(d => d.hospital))].length} hospitals</p>
        </div>
        <Button onClick={() => setModal(true)}><Plus size={14} />Add Doctor</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8 }}>
        {[...new Set(DOCTORS.map(d => d.specialty))].map(s => (
          <div key={s} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>{DOCTORS.filter(d => d.specialty === s).length}</div>
            <Badge variant={specColor[s]} style={{ marginTop: 6 }}>{s.length > 10 ? s.split(' ')[0] : s}</Badge>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
            <Input style={{ paddingLeft: 30 }} placeholder="Search doctors..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <Table
            headers={['ID', 'Doctor', 'Specialty', 'Hospital', 'MCI Reg', 'Orders', 'Zoho', 'Status']}
            rows={filtered.map(d => ({
              ...d,
              cells: [
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{d.id}</span>,
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}><Award size={12} style={{ color: 'var(--amber)' }} />{d.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}><Phone size={10} />{d.phone}</div>
                </div>,
                <Badge variant={specColor[d.specialty]}>{d.specialty}</Badge>,
                <span style={{ fontSize: 12 }}>{d.hospital}</span>,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{d.reg}</span>,
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{d.orders}</span>,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{d.zohoId}</span>,
                <Badge variant={d.status === 'Active' ? 'success' : 'gray'}>{d.status}</Badge>
              ]
            }))}
            actions={row => [
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Edit size={13} /></button>,
            ]}
          />
        </CardContent>
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Doctor" size="lg">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ gridColumn: '1 / -1' }}><FormField label="Full Name"><Input placeholder="Dr. First Last" /></FormField></div>
          <FormField label="Specialty"><Select><option>Cardiology</option><option>Endocrinology</option><option>Orthopedics</option><option>Pediatrics</option><option>Oncology</option><option>General Medicine</option></Select></FormField>
          <FormField label="Hospital"><Select><option>City General Hospital</option><option>Apollo Clinic</option><option>Max Healthcare</option><option>AIIMS Delhi</option></Select></FormField>
          <FormField label="MCI Registration"><Input placeholder="MCI-YYYY-XXXXX" /></FormField>
          <FormField label="Phone"><Input placeholder="+91..." /></FormField>
          <div style={{ gridColumn: '1 / -1' }}><FormField label="Email"><Input type="email" placeholder="doctor@hospital.in" /></FormField></div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
          <Button onClick={() => setModal(false)}>Add Doctor</Button>
        </div>
      </Modal>
    </div>
  );
}
