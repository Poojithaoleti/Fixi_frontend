import { motion } from 'framer-motion';
import { Star, TrendingUp, Lightbulb } from 'lucide-react';
import ProSidebar from '../../components/ProSidebar';

const kpis = [
  { label: 'Jobs Completed', value: '94', sub: 'This month', color: '#3E2A56' },
  { label: 'Avg Rating', value: '4.9★', sub: '320 total reviews', color: '#D97706' },
  { label: 'Cancellation Rate', value: '3.1%', sub: '↓ 0.4% vs last month', color: '#059669' },
  { label: 'On-Time Rate', value: '96%', sub: 'Industry avg: 88%', color: '#3E2A56' },
];

const ratingDist = [
  { stars: 5, count: 271, pct: 85 },
  { stars: 4, count: 35, pct: 11 },
  { stars: 3, count: 10, pct: 3 },
  { stars: 2, count: 3, pct: 1 },
  { stars: 1, count: 1, pct: 0 },
];

const monthlyEarnings = [
  { m: 'Oct', v: 9800 }, { m: 'Nov', v: 11200 }, { m: 'Dec', v: 13500 },
  { m: 'Jan', v: 12100 }, { m: 'Feb', v: 15300 }, { m: 'Mar', v: 18450 },
];

const recentReviews = [
  { name: 'Arjun K.', rating: 5, date: 'Mar 28', comment: 'Ravi was punctual and professional. Fixed the AC perfectly!' },
  { name: 'Priya M.', rating: 5, date: 'Mar 25', comment: 'Excellent work. Very thorough and explained everything clearly.' },
  { name: 'Sneha R.', rating: 4, date: 'Mar 22', comment: 'Good service overall. Was slightly delayed but work quality was great.' },
];

const tips = [
  { icon: '⚡', tip: 'Accepting jobs within 2 minutes increases your lead score by 40%.' },
  { icon: '📅', tip: 'Pros who work weekends earn 35% more than weekday-only pros.' },
  { icon: '⭐', tip: 'Reply to all reviews — pros who respond get 28% more repeat bookings.' },
];

const maxEarnings = Math.max(...monthlyEarnings.map(m => m.v));

const pv = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ProAnalytics() {
  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', gap: 28, maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px', alignItems: 'flex-start' }}>
        <ProSidebar currentPage="pro-analytics" />

        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>My Performance</h1>
            <div style={{ display: 'flex', gap: 6 }}>
              {['This Month', 'Last 3 Months', 'All Time'].map((t, i) => (
                <button key={t} style={{ padding: '7px 14px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: i === 0 ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', color: i === 0 ? 'white' : '#9B8AB0', border: i === 0 ? 'none' : '1.5px solid #EDE6F8' }}>{t}</button>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 24 }}>
            {kpis.map((k, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{ background: 'white', borderRadius: 14, padding: '18px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', borderTop: `4px solid ${k.color}` }}>
                <div style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>{k.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: k.color, fontFamily: 'var(--font-sans)', lineHeight: 1, marginBottom: 5 }}>{k.value}</div>
                <div style={{ fontSize: 12, color: '#9B8AB0' }}>{k.sub}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            {/* Rating breakdown */}
            <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
              <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 16 }}>Rating Breakdown</div>
              {ratingDist.map(({ stars, count, pct }) => (
                <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, width: 36, flexShrink: 0 }}>
                    <Star size={13} style={{ fill: '#FBBF24', color: '#FBBF24' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>{stars}</span>
                  </div>
                  <div style={{ flex: 1, height: 8, background: '#F0EAF8', borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                      style={{ height: '100%', background: 'linear-gradient(90deg,#3E2A56,#6B4A8F)', borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 12, color: '#9B8AB0', width: 28, textAlign: 'right', flexShrink: 0 }}>{count}</span>
                </div>
              ))}
            </div>

            {/* Earnings chart */}
            <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
              <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 16 }}>Monthly Earnings</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120, paddingBottom: 4 }}>
                {monthlyEarnings.map(({ m, v }, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(v / maxEarnings) * 100}px` }} transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
                      style={{ width: '100%', background: i === 5 ? 'linear-gradient(0deg,#3E2A56,#6B4A8F)' : '#EDE6F8', borderRadius: '4px 4px 0 0', minHeight: 4 }} />
                    <span style={{ fontSize: 11, color: i === 5 ? '#3E2A56' : '#9B8AB0', fontWeight: i === 5 ? 700 : 400 }}>{m}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, color: '#10B981', fontSize: 13, fontWeight: 600 }}>
                <TrendingUp size={14} /> Best month yet — ₹18,450
              </div>
            </div>
          </div>

          {/* Recent reviews */}
          <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 16 }}>Recent Reviews</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recentReviews.map((r, i) => (
                <div key={i} style={{ padding: '14px 16px', background: '#F8F5FF', borderRadius: 12, display: 'flex', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{r.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14 }}>{r.name}</span>
                      <span style={{ color: '#9B8AB0', fontSize: 12 }}>{r.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
                      {[...Array(r.rating)].map((_, j) => <Star key={j} size={13} style={{ fill: '#FBBF24', color: '#FBBF24' }} />)}
                    </div>
                    <p style={{ color: '#6B6B8A', fontSize: 13, lineHeight: 1.6 }}>{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement tips */}
          <div style={{ background: 'linear-gradient(135deg,#F8F5FF,#EDE6F8)', borderRadius: 16, padding: '20px 22px', border: '1px solid #C4AFDE' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Lightbulb size={18} color="#6B4A8F" />
              <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>Tips to Grow Faster</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tips.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: 'white', borderRadius: 10 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
                  <p style={{ color: '#4A4A6A', fontSize: 13, lineHeight: 1.6 }}>{t.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
