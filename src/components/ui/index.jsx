import { cn } from '@/lib/utils';

export function Button({ children, variant = 'default', size = 'md', className, ...props }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none';
  const variants = {
    default: 'bg-[var(--accent)] text-[var(--bg)] hover:brightness-110 shadow-[0_0_20px_var(--accent-glow)]',
    outline: 'border border-[var(--border-2)] text-[var(--text-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-dim)] bg-transparent',
    ghost: 'text-[var(--text-2)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]',
    destructive: 'bg-[var(--red-dim)] text-[var(--red)] border border-[var(--red)] border-opacity-30 hover:bg-[var(--red)] hover:text-white',
    success: 'bg-[var(--green-dim)] text-[var(--green)] border border-[var(--green)] border-opacity-30 hover:bg-[var(--green)] hover:text-white',
    indigo: 'bg-[var(--indigo-dim)] text-[var(--indigo)] hover:bg-[var(--indigo)] hover:text-white',
  };
  const sizes = { sm: 'px-3 py-1.5 text-xs gap-1.5', md: 'px-4 py-2 text-sm gap-2', lg: 'px-5 py-2.5 text-sm gap-2' };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props}>{children}</button>;
}

export function Badge({ children, variant = 'default', className }) {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium tracking-wide';
  const variants = {
    default: 'bg-[var(--indigo-dim)] text-[var(--indigo)]',
    success: 'bg-[var(--green-dim)] text-[var(--green)]',
    warning: 'bg-[var(--amber-dim)] text-[var(--amber)]',
    danger: 'bg-[var(--red-dim)] text-[var(--red)]',
    purple: 'bg-[var(--purple-dim)] text-[var(--purple)]',
    gray: 'bg-[var(--surface-2)] text-[var(--text-2)]',
    accent: 'bg-[var(--accent-dim)] text-[var(--accent)]',
  };
  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}

export function Card({ children, className, glow, ...props }) {
  return (
    <div
      className={cn('rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-200', glow && 'hover:border-[var(--border-2)] hover:shadow-[0_0_30px_rgba(20,241,217,0.05)]', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={cn('px-5 py-4 border-b border-[var(--border)]', className)}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={cn('px-5 py-4', className)}>{children}</div>;
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cn('w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] placeholder-[var(--text-3)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors', className)}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn('w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] appearance-none cursor-pointer', className)}
      {...props}
    >
      {children}
    </select>
  );
}

export function Table({ headers, rows, actions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="border-b border-[var(--border)]">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-3)] uppercase tracking-widest whitespace-nowrap">{h}</th>
            ))}
            {actions && <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-3)] uppercase tracking-widest">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors group">
              {row.cells.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[var(--text-2)]">{cell}</td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">{actions(row)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatCard({ title, value, change, icon: Icon, color = 'accent' }) {
  const colors = {
    accent: { bg: 'var(--accent-dim)', icon: 'var(--accent)', border: 'rgba(20,241,217,0.15)' },
    green: { bg: 'var(--green-dim)', icon: 'var(--green)', border: 'rgba(34,197,94,0.15)' },
    indigo: { bg: 'var(--indigo-dim)', icon: 'var(--indigo)', border: 'rgba(99,102,241,0.15)' },
    amber: { bg: 'var(--amber-dim)', icon: 'var(--amber)', border: 'rgba(245,158,11,0.15)' },
    purple: { bg: 'var(--purple-dim)', icon: 'var(--purple)', border: 'rgba(168,85,247,0.15)' },
    red: { bg: 'var(--red-dim)', icon: 'var(--red)', border: 'rgba(239,68,68,0.15)' },
  };
  const c = colors[color];
  return (
    <div className="rounded-xl border bg-[var(--surface)] p-5 hover:bg-[var(--surface-2)] transition-all duration-200 cursor-default group"
      style={{ borderColor: c.border }}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg" style={{ background: c.bg }}>
          <Icon size={18} style={{ color: c.icon }} />
        </div>
        {change !== undefined && (
          <span className="text-xs font-semibold" style={{ color: change > 0 ? 'var(--green)' : 'var(--red)' }}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-[var(--text)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>{value}</div>
      <div className="text-xs text-[var(--text-3)] font-medium uppercase tracking-wider">{title}</div>
    </div>
  );
}

export function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative rounded-2xl border border-[var(--border-2)] bg-[var(--surface)] shadow-[0_25px_80px_rgba(0,0,0,0.6)] w-full', sizes[size])}
        style={{ animation: 'slide-up 0.2s ease forwards' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <h3 className="text-base font-semibold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors text-lg">✕</button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function FormField({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
