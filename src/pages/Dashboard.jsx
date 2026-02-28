import { ShoppingCart, FileText, Package, Stethoscope, TrendingUp, DollarSign, AlertCircle, ArrowUpRight, RefreshCw } from 'lucide-react';
import { StatCard, Card, CardHeader, CardContent, Badge, Button } from '@/components/ui';

const recentActivity = [
  { type: 'order', label: 'ORDER', text: '#ORD-1042 from City Hospital — ₹18,500', time: '2m ago', variant: 'default' },
  { type: 'invoice', label: 'PAID', text: 'Invoice INV-0893 marked paid', time: '15m ago', variant: 'success' },
  { type: 'alert', label: 'ALERT', text: 'Paracetamol 500mg stock critical (8 units)', time: '1h ago', variant: 'warning' },
  { type: 'doctor', label: 'SYNC', text: 'Dr. Priya Sharma synced to Zoho Contacts', time: '2h ago', variant: 'accent' },
  { type: 'offer', label: 'OFFER', text: 'Summer Deal applied — 3 orders discounted', time: '3h ago', variant: 'purple' },
];

const zohoSync = [
  { module: 'Contacts', count: 248, status: 'Synced', variant: 'success' },
  { module: 'Invoices', count: 89, status: 'Synced', variant: 'success' },
  { module: 'Products', count: 12, status: 'Pending', variant: 'warning' },
  { module: 'Orders', count: 3, status: 'Error', variant: 'danger' },
];

const alerts = [
  { icon: AlertCircle, label: '5 Low Stock', sub: 'Items need reorder', color: 'var(--amber)', bg: 'var(--amber-dim)' },
  { icon: FileText, label: '12 Overdue', sub: '₹1.8L pending', color: 'var(--red)', bg: 'var(--red-dim)' },
  { icon: TrendingUp, label: 'Revenue +8%', sub: 'vs last month', color: 'var(--green)', bg: 'var(--green-dim)' },
];

export default function Dashboard() {
  return (
    <div className="animate-page" style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
            Good morning 👋
          </h1>
          <p style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>Here's your medical ERP snapshot for today, Feb 28</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw size={13} /> Sync Zoho
        </Button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <StatCard title="Total Orders" value="1,284" change={12} icon={ShoppingCart} color="accent" />
        <StatCard title="Monthly Revenue" value="₹4.2L" change={8} icon={DollarSign} color="green" />
        <StatCard title="Active Products" value="342" change={-2} icon={Package} color="indigo" />
        <StatCard title="Doctors Registered" value="189" change={5} icon={Stethoscope} color="purple" />
      </div>

      {/* Alert strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
        {alerts.map(({ icon: Icon, label, sub, color, bg }) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ width: 32, height: 32, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
        {/* Activity */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>Recent Activity</span>
              <button style={{ fontSize: 11, color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>View all <ArrowUpRight size={11} /></button>
            </div>
          </CardHeader>
          <CardContent style={{ padding: 0 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.15s', cursor: 'default'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Badge variant={a.variant}>{a.label}</Badge>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--text-2)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.text}</span>
                <span style={{ fontSize: 11, color: 'var(--text-3)', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>{a.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Zoho */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>Zoho Sync</span>
            </div>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {zohoSync.map((z) => (
              <div key={z.module} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 8, background: 'var(--surface-2)' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{z.module}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{z.count} records</div>
                </div>
                <Badge variant={z.variant}>{z.status}</Badge>
              </div>
            ))}
            <button style={{ marginTop: 4, width: '100%', padding: '8px', borderRadius: 8, background: 'var(--accent-dim)', color: 'var(--accent)', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,241,217,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-dim)'}
            >
              Sync All Modules →
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
