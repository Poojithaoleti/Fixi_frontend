import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, UserCheck, Calendar, Tag, Megaphone,
  Star, Ticket, Map, Bell, FileText, ChevronRight, Wrench, LogOut, Menu, X
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users,           label: 'User Management', path: '/admin/users' },
  { icon: UserCheck,       label: 'Provider Management', path: '/admin/providers' },
  { icon: Calendar,        label: 'All Bookings', path: '/admin/bookings' },
  { icon: Tag,             label: 'Services & Pricing', path: '/admin/pricing' },
  { icon: Megaphone,       label: 'Promotions', path: '/admin/promotions' },
  { icon: Star,            label: 'Reviews', path: '/admin/reviews' },
  { icon: Ticket,          label: 'Support Tickets', path: '/admin/tickets' },
  { icon: Map,             label: 'Zone Management', path: '/admin/zones' },
  { icon: Bell,            label: 'Notifications', path: '/admin/notifications' },
  { icon: FileText,        label: 'Audit Logs', path: '/admin/audit' },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="admin-sidebar"
      style={{
        background: '#1A1026', flexShrink: 0,
        borderRadius: 20, padding: '20px 0',
        display: 'flex', flexDirection: 'column',
        minHeight: 600, position: 'sticky', top: 20,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>

      {/* Header */}
      <div style={{ padding: '0 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ background: 'linear-gradient(135deg,#6B4A8F,#9B7EC8)', borderRadius: 8, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Wrench size={13} color="white" />
                <span style={{ color: 'white', fontWeight: 800, fontSize: 15, fontFamily: 'var(--font-sans)' }}>FIXI</span>
              </div>
              <span style={{ background: 'rgba(239,68,68,0.2)', color: '#FCA5A5', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 50 }}>ADMIN</span>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)}
            style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
            {collapsed ? <Menu size={14} /> : <X size={14} />}
          </button>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '4px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button key={path} onClick={() => navigate(path)} title={collapsed ? label : undefined}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: collapsed ? '10px 0' : '9px 12px', justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 8, border: 'none', cursor: 'pointer',
                background: active ? 'linear-gradient(90deg,rgba(107,74,143,0.4),rgba(107,74,143,0.15))' : 'transparent',
                borderLeft: active ? '3px solid #9B7EC8' : '3px solid transparent',
                transition: 'all 0.15s', fontFamily: 'var(--font-sans)',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
              <Icon size={16} color={active ? '#C4A8E8' : 'rgba(255,255,255,0.45)'} style={{ flexShrink: 0 }} />
              {!collapsed && <span style={{ color: active ? 'white' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: active ? 600 : 400, flex: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>{label}</span>}
              {!collapsed && active && <ChevronRight size={12} color="rgba(255,255,255,0.3)" />}
            </button>
          );
        })}
      </div>

      {/* Admin avatar */}
      <div style={{ padding: '12px 12px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 4px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#EF4444,#DC2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>A</div>
          {!collapsed && (
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>Admin</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>Super Admin</div>
            </div>
          )}
          {!collapsed && (
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)' }}>
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
