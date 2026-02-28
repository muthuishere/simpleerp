import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingCart, Tag, FileText, Package,
  Building2, Stethoscope, Zap, Menu, X, Bell, Search, ChevronRight, Settings, Activity
} from 'lucide-react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Orders = lazy(() => import('./pages/Orders'));
const Offers = lazy(() => import('./pages/Offers'));
const Invoices = lazy(() => import('./pages/Invoices'));
const Products = lazy(() => import('./pages/Products'));
const Hospitals = lazy(() => import('./pages/Hospitals'));
const Doctors = lazy(() => import('./pages/Doctors'));
const ZohoIntegration = lazy(() => import('./pages/ZohoIntegration'));

const nav = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/offers', label: 'Offers', icon: Tag },
  { path: '/invoices', label: 'Invoices', icon: FileText },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/hospitals', label: 'Hospitals', icon: Building2 },
  { path: '/doctors', label: 'Doctors', icon: Stethoscope },
  { path: '/zoho', label: 'Zoho Integration', icon: Zap },
];

function Loader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 32, height: 32, border: '2px solid var(--border-2)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <span style={{ color: 'var(--text-3)', fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>LOADING MODULE</span>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 20 }}
          className="lg:hidden"
        />
      )}
      <aside style={{
        position: 'fixed', top: 0, left: 0, height: '100%', width: 220,
        background: 'var(--bg-2)',
        borderRight: '1px solid var(--border)',
        zIndex: 30, display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : undefined,
        transition: 'transform 0.2s ease',
      }}
        className={`${open ? '' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8, background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Activity size={16} color="var(--bg)" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text)', lineHeight: 1.2 }}>ERPSimple</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>MEDICAL · ZOHO</div>
          </div>
          <button onClick={onClose} className="lg:hidden ml-auto" style={{ color: 'var(--text-3)', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', padding: '4px 10px 8px', marginTop: 4 }}>MAIN</div>
          {nav.slice(0, 4).map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none',
                transition: 'all 0.15s',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-2)',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              })}
            >
              <Icon size={15} />{label}
            </NavLink>
          ))}
          <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', padding: '12px 10px 8px' }}>MASTER DATA</div>
          {nav.slice(4, 7).map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path} onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none',
                transition: 'all 0.15s',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-2)',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              })}
            >
              <Icon size={15} />{label}
            </NavLink>
          ))}
          <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', padding: '12px 10px 8px' }}>INTEGRATIONS</div>
          {nav.slice(7).map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path} onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none',
                transition: 'all 0.15s',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-2)',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              })}
            >
              <Icon size={15} />{label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--indigo-dim)', border: '1px solid var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--indigo)', flexShrink: 0 }}>AD</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Admin User</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>admin@erp.com</div>
          </div>
          <Settings size={13} style={{ color: 'var(--text-3)', cursor: 'pointer', flexShrink: 0 }} />
        </div>
      </aside>
    </>
  );
}

function Header({ onMenu }) {
  const location = useLocation();
  const current = nav.find(n => n.path === location.pathname) || nav[0];
  const Icon = current.icon;
  return (
    <header style={{
      background: 'var(--bg-2)', borderBottom: '1px solid var(--border)',
      padding: '0 20px', height: 52, display: 'flex', alignItems: 'center', gap: 12,
      position: 'sticky', top: 0, zIndex: 10, flexShrink: 0,
    }}>
      <button onClick={onMenu} className="lg:hidden" style={{ color: 'var(--text-2)', cursor: 'pointer' }}>
        <Menu size={18} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
        <Icon size={15} style={{ color: 'var(--text-3)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{current.label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="hidden md:flex">
          <Search size={13} style={{ position: 'absolute', left: 10, color: 'var(--text-3)' }} />
          <input
            style={{ paddingLeft: 30, paddingRight: 12, paddingTop: 6, paddingBottom: 6, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, color: 'var(--text)', width: 200, outline: 'none', transition: 'border-color 0.15s' }}
            placeholder="Search anything..."
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <button style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-2)' }}>
            <Bell size={15} />
          </button>
          <div style={{ position: 'absolute', top: 7, right: 7, width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 6px var(--red)' }} />
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: 'var(--bg)' }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          className="main-content">
          <Header onMenu={() => setSidebarOpen(true)} />
          <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--bg)' }}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/products" element={<Products />} />
                <Route path="/hospitals" element={<Hospitals />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/zoho" element={<ZohoIntegration />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
