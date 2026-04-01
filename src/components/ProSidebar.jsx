import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Briefcase, Calendar, TrendingUp, Wallet, MapPin, Bell, LogOut, Wrench, ChevronRight } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'pro-dashboard' },
  { icon: Briefcase, label: 'Job Leads', page: 'pro-job-leads', badge: 3 },
  { icon: Calendar, label: 'My Schedule', page: 'pro-schedule' },
  { icon: TrendingUp, label: 'Performance', page: 'pro-analytics' },
  { icon: Wallet, label: 'Earnings', page: 'pro-earnings' },
  { icon: MapPin, label: 'Service Area', page: 'pro-area' },
  { icon: Bell, label: 'Notifications', page: 'pro-notifications', badge: 5 },
];

export default function ProSidebar() {
  const navigate = useNavigate();
  return (
    <motion.aside
      className="sidebar-desktop"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      style={{
        width: 240, flexShrink: 0,
        background: 'linear-gradient(160deg, #3E2A56 0%, #2A1B3D 100%)',
        borderRadius: 20, padding: '24px 0',
        display: 'flex', flexDirection: 'column',
        minHeight: 600, position: 'sticky', top: 90,
        boxShadow: '0 8px 32px rgba(62,42,86,0.25)',
      }}>
      {/* Pro badge */}
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ background: 'linear-gradient(135deg,#6B4A8F,#9B7EC8)', borderRadius: 8, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Wrench size={14} color="white" />
            <span style={{ color: 'white', fontWeight: 800, fontSize: 16, fontFamily: 'var(--font-sans)' }}>FIXI</span>
          </div>
          <span style={{ background: 'rgba(251,191,36,0.2)', color: '#FBBF24', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 50 }}>PRO</span>
        </div>
        {/* Pro avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#6B4A8F,#9B7EC8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16, border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>R</div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Ravi Kumar</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>AC Specialist</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(({ icon: Icon, label, page, badge }) => {
          const active = currentPage === page;
          return (
            <button key={page} onClick={() => onNavigate(page)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                borderLeft: active ? '3px solid white' : '3px solid transparent',
                transition: 'all 0.2s', position: 'relative',
                fontFamily: 'var(--font-sans)',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
              <Icon size={17} color={active ? 'white' : 'rgba(255,255,255,0.55)'} />
              <span style={{ color: active ? 'white' : 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: active ? 600 : 400, flex: 1, textAlign: 'left' }}>{label}</span>
              {badge && <span style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 50, minWidth: 18, textAlign: 'center' }}>{badge}</span>}
              {active && <ChevronRight size={14} color="rgba(255,255,255,0.4)" />}
            </button>
          );
        })}
      </div>

      {/* Duty toggle */}
      <div style={{ margin: '0 12px 12px', background: 'rgba(16,185,129,0.15)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(16,185,129,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#10B981', fontSize: 12, fontWeight: 700 }}>DUTY: ON</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Receiving job leads</div>
          </div>
          <div style={{ width: 36, height: 20, background: '#10B981', borderRadius: 10, position: 'relative', cursor: 'pointer' }}>
            <div style={{ width: 16, height: 16, background: 'white', borderRadius: '50%', position: 'absolute', top: 2, right: 2 }} />
          </div>
        </div>
      </div>

      {/* Logout */}
      <div style={{ padding: '12px 12px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => navigate('/')}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', fontFamily: 'var(--font-sans)' }}>
          <LogOut size={16} color="rgba(255,255,255,0.35)" />
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Exit Pro Mode</span>
        </button>
      </div>
    </motion.aside>
  );
}
