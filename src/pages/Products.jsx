import { useState } from 'react';
import { Plus, Edit, Trash2, AlertTriangle, Search } from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardContent, Table, Modal, Input, Select, FormField } from '@/components/ui';

const PRODUCTS = [
  { id: 'PRD-001', name: 'Paracetamol 500mg', category: 'Analgesic', unit: 'Strip/10', stock: 8, price: '₹45', mrp: '₹60', hsn: '30049099', zohoId: 'ZPRD-1001' },
  { id: 'PRD-002', name: 'Amoxicillin 250mg', category: 'Antibiotic', unit: 'Strip/10', stock: 145, price: '₹120', mrp: '₹160', hsn: '30041010', zohoId: 'ZPRD-1002' },
  { id: 'PRD-003', name: 'Metformin 500mg', category: 'Antidiabetic', unit: 'Strip/15', stock: 3, price: '₹35', mrp: '₹48', hsn: '29336100', zohoId: 'ZPRD-1003' },
  { id: 'PRD-004', name: 'Atorvastatin 10mg', category: 'Cardiac', unit: 'Strip/15', stock: 78, price: '₹85', mrp: '₹110', hsn: '29335990', zohoId: 'ZPRD-1004' },
  { id: 'PRD-005', name: 'Surgical Gloves L', category: 'Consumable', unit: 'Box/50', stock: 5, price: '₹280', mrp: '₹350', hsn: '40151100', zohoId: 'ZPRD-1005' },
  { id: 'PRD-006', name: 'Insulin Syringe 1ml', category: 'Device', unit: 'Pack/10', stock: 210, price: '₹55', mrp: '₹75', hsn: '90183100', zohoId: 'ZPRD-1006' },
];

const catColor = { Analgesic: 'default', Antibiotic: 'warning', Antidiabetic: 'purple', Cardiac: 'danger', Consumable: 'gray', Device: 'success' };
const lowStock = PRODUCTS.filter(p => p.stock < 10);

export default function Products() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-page" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>Product Management</h1>
          <p style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 3 }}>{PRODUCTS.length} products · {lowStock.length} low stock alerts</p>
        </div>
        <Button onClick={() => setModal(true)}><Plus size={14} />Add Product</Button>
      </div>

      {/* Low stock alerts */}
      {lowStock.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {lowStock.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8 }}>
              <AlertTriangle size={14} style={{ color: 'var(--amber)', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
                <strong style={{ color: 'var(--text)' }}>{p.name}</strong> — only <strong style={{ color: 'var(--amber)' }}>{p.stock} units</strong> remaining. Reorder recommended.
              </span>
              <button style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--amber)', cursor: 'pointer', fontWeight: 600, flexShrink: 0, background: 'none', border: 'none' }}>Reorder →</button>
            </div>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
              <Input style={{ paddingLeft: 30 }} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select style={{ width: 160 }}><option>All Categories</option><option>Analgesic</option><option>Antibiotic</option><option>Cardiac</option><option>Device</option></Select>
          </div>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <Table
            headers={['ID', 'Product Name', 'Category', 'Unit', 'Stock', 'Price', 'MRP', 'HSN', 'Zoho']}
            rows={filtered.map(p => ({
              ...p,
              cells: [
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{p.id}</span>,
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{p.name}</span>,
                <Badge variant={catColor[p.category]}>{p.category}</Badge>,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{p.unit}</span>,
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: p.stock < 10 ? 'var(--red)' : 'var(--text)' }}>{p.stock}</span>,
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)' }}>{p.price}</span>,
                p.mrp,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{p.hsn}</span>,
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{p.zohoId}</span>
              ]
            }))}
            actions={row => [
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Edit size={13} /></button>,
              <button style={{ padding: 5, color: 'var(--text-3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}><Trash2 size={13} /></button>,
            ]}
          />
        </CardContent>
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title="Add New Product" size="lg">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ gridColumn: '1 / -1' }}><FormField label="Product Name"><Input placeholder="e.g. Paracetamol 500mg" /></FormField></div>
          <FormField label="Category"><Select><option>Analgesic</option><option>Antibiotic</option><option>Antidiabetic</option><option>Cardiac</option><option>Consumable</option><option>Device</option></Select></FormField>
          <FormField label="Unit"><Input placeholder="e.g. Strip/10" /></FormField>
          <FormField label="Price (ex-tax)"><Input type="number" placeholder="0.00" /></FormField>
          <FormField label="MRP"><Input type="number" placeholder="0.00" /></FormField>
          <FormField label="Initial Stock"><Input type="number" placeholder="0" /></FormField>
          <FormField label="HSN Code"><Input placeholder="e.g. 30049099" /></FormField>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-2)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />Sync to Zoho Inventory
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
          <Button onClick={() => setModal(false)}>Add Product</Button>
        </div>
      </Modal>
    </div>
  );
}
