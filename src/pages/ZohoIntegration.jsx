import { useState } from 'react';
import { Zap, RefreshCw, CheckCircle, XCircle, Clock, Key, ArrowLeftRight, Activity } from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardContent, Input, FormField } from '@/components/ui';

const MODULES = [
  { name: 'Contacts', sub: 'Hospitals & Doctors', zoho: 'Zoho CRM', records: 254, ago: '2m ago', status: 'synced', dir: '↔' },
  { name: 'Products', sub: 'Inventory items', zoho: 'Zoho Inventory', records: 342, ago: '15m ago', status: 'synced', dir: '→' },
  { name: 'Sales Orders', sub: 'Purchase orders', zoho: 'Zoho CRM', records: 1284, ago: '1h ago', status: 'pending', dir: '→' },
  { name: 'Invoices', sub: 'GST invoices', zoho: 'Zoho Books', records: 89, ago: '30m ago', status: 'synced', dir: '↔' },
  { name: 'Price Books', sub: 'Offers & discounts', zoho: 'Zoho CRM', records: 5, ago: '2h ago', status: 'error', dir: '→' },
];

const LOGS = [
  { module: 'Contacts', text: 'Pushed 3 new hospital records', time: '10:18 AM', ok: true },
  { module: 'Invoices', text: 'INV-0893 marked paid via Zoho Books webhook', time: '10:02 AM', ok: true },
  { module: 'Price Books', text: 'Sync failed — OAuth token expired', time: '09:45 AM', ok: false },
  { module: 'Products', text: '12 product updates pushed to Zoho Inventory', time: '09:30 AM', ok: true },
  { module: 'Sales Orders', text: 'ORD-1042 created in Zoho CRM', time: '09:15 AM', ok: true },
];

const statusVariant = { synced: 'success', pending: 'warning', error: 'danger' };
const statusIcon = { synced: CheckCircle, pending: Clock, error: XCircle };

export default function ZohoIntegration() {
  const [connected, setConnected] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2500);
  };

  return (
    <div className="animate-page" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>Zoho Integration</h1>
          <p style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 3 }}>CRM · Books · Inventory · OAuth 2.0</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="outline" size="sm" onClick={handleSync} disabled={syncing}>
            <RefreshCw size={13} style={{ animation: syncing ? 'spin 0.8s linear infinite' : 'none' }} />
            {syncing ? 'Syncing...' : 'Sync All'}
          </Button>
          <Button variant={connected ? 'success' : 'default'} size="sm" onClick={() => setConnected(!connected)}>
            <Zap size={13} />{connected ? '● Connected' : 'Connect Zoho'}
          </Button>
        </div>
      </div>

      {/* Connection Banner */}
      <div style={{
        padding: '14px 18px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12,
        background: connected ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
        border: `1px solid ${connected ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
      }}>
        {connected
          ? <CheckCircle size={18} style={{ color: 'var(--green)', flexShrink: 0 }} />
          : <XCircle size={18} style={{ color: 'var(--red)', flexShrink: 0 }} />}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{connected ? 'OAuth 2.0 Connected — Zoho India DC' : 'Not Connected'}</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{connected ? 'Access token valid · Org: ERPSimple Medical Pvt Ltd · Auto-refresh enabled' : 'Configure credentials to connect'}</div>
        </div>
        {connected && <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', flexShrink: 0 }}>LIVE</div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* OAuth Config */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>
              <Key size={15} style={{ color: 'var(--accent)' }} />OAuth 2.0 Configuration
            </div>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FormField label="Client ID"><Input defaultValue="1000.XXXXXXXXXXXXXXX" /></FormField>
            <FormField label="Client Secret"><Input type="password" defaultValue="secret" /></FormField>
            <FormField label="Redirect URI"><Input defaultValue="https://erpsimple.app/zoho/callback" readOnly style={{ background: 'var(--bg)', color: 'var(--text-3)', cursor: 'default' }} /></FormField>
            <FormField label="Data Center">
              <select style={{ width: '100%', padding: '8px 12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--text)', outline: 'none' }}>
                <option>zoho.in — India</option>
                <option>zoho.com — United States</option>
                <option>zoho.eu — Europe</option>
              </select>
            </FormField>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <Button style={{ flex: 1 }}>Save Config</Button>
              <Button variant="outline" style={{ flex: 1 }}>Test Connection</Button>
            </div>
          </CardContent>
        </Card>

        {/* Sync Logs */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>
              <Activity size={15} style={{ color: 'var(--accent)' }} />Sync Activity
            </div>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {LOGS.map((log, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: i < LOGS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                {log.ok
                  ? <CheckCircle size={13} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                  : <XCircle size={13} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{log.text}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>{log.module} · {log.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Module Mapping */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>
            <ArrowLeftRight size={15} style={{ color: 'var(--accent)' }} />Module Sync Mapping
          </div>
        </CardHeader>
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {MODULES.map((m, i) => {
            const StatusIcon = statusIcon[m.status];
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderRadius: 8, background: 'var(--surface-2)', transition: 'background 0.15s', cursor: 'default'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-2)'}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{m.sub}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', background: 'var(--surface)', padding: '3px 8px', borderRadius: 4, border: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{m.zoho}</span>
                  <span style={{ fontSize: 14, color: 'var(--text-3)' }}>{m.dir}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textAlign: 'right', width: 80 }}>
                  <div>{m.records} rec</div>
                  <div style={{ fontSize: 10, marginTop: 1 }}>{m.ago}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <StatusIcon size={13} style={{ color: m.status === 'synced' ? 'var(--green)' : m.status === 'pending' ? 'var(--amber)' : 'var(--red)' }} />
                  <Badge variant={statusVariant[m.status]}>{m.status}</Badge>
                </div>
                <button style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', cursor: 'pointer', background: 'none', border: 'none', padding: '4px 8px', borderRadius: 4, transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-dim)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >Sync →</button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
