import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Send, Bell } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const history = [
  { title: 'Summer Sale — 20% Off', audience: 'All Users', channel: 'Push + SMS', sent: '12,450', date: 'Mar 28, 2026', status: 'Sent' },
  { title: 'New Pro Feature: Instant Pay', audience: 'All Pros', channel: 'Push', sent: '542', date: 'Mar 25, 2026', status: 'Sent' },
  { title: 'App Update Available', audience: 'All Users', channel: 'Push', sent: 'Scheduled', date: 'Apr 1, 2026', status: 'Scheduled' },
  { title: 'AC Service Reminder', audience: 'Hyderabad Users', channel: 'Push + Email', sent: '3,240', date: 'Mar 20, 2026', status: 'Sent' },
];

const audiences = ['All Users', 'All Pros', 'Specific City', 'New Users (30d)'];
const channels = ['Push Notification', 'SMS', 'Email', 'In-App Banner'];
const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminNotifications() {
  const [showForm, setShowForm] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('All Users');
  const [selectedChannels, setSelectedChannels] = useState(['Push Notification']);
  const [scheduleNow, setScheduleNow] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const toggleChannel = c => setSelectedChannels(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Broadcast Notifications</h1>
            <button onClick={() => setShowForm(f => !f)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              <Plus size={14} /> Create Notification
            </button>
          </div>

          {/* Create form */}
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'white', borderRadius: 16, padding: '22px 26px', boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }} className="admin-two-col">
                {/* Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 4 }}>New Broadcast</div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Summer Sale is Live!"
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-sans)', color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#3E2A56'} onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Message Body</label>
                    <textarea rows={3} value={body} onChange={e => setBody(e.target.value)} placeholder="Write the notification message..."
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-sans)', color: '#1A1A2E', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#3E2A56'} onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Target Audience</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {audiences.map(a => (
                        <button key={a} onClick={() => setSelectedAudience(a)}
                          style={{ padding: '7px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: selectedAudience === a ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : '#F8F5FF', color: selectedAudience === a ? 'white' : '#6B6B8A', border: selectedAudience === a ? 'none' : '1.5px solid #EDE6F8' }}>{a}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Channels</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {channels.map(ch => {
                        const on = selectedChannels.includes(ch);
                        return (
                          <label key={ch} onClick={() => toggleChannel(ch)}
                            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 50, border: `1.5px solid ${on ? '#3E2A56' : '#EDE6F8'}`, background: on ? '#EDE6F8' : 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: on ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', border: on ? 'none' : '1.5px solid #C4AFDE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              {on && <div style={{ width: 6, height: 6, background: 'white', borderRadius: 2 }} />}
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 600, color: on ? '#3E2A56' : '#6B6B8A' }}>{ch}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Schedule</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Send Now', 'Schedule'].map(opt => (
                        <button key={opt} onClick={() => setScheduleNow(opt === 'Send Now')}
                          style={{ padding: '8px 18px', borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: (scheduleNow && opt === 'Send Now') || (!scheduleNow && opt === 'Schedule') ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', color: (scheduleNow && opt === 'Send Now') || (!scheduleNow && opt === 'Schedule') ? 'white' : '#9B8AB0', border: '1.5px solid #EDE6F8' }}>{opt}</button>
                      ))}
                    </div>
                    {!scheduleNow && (
                      <input type="datetime-local" style={{ marginTop: 10, padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-sans)', color: '#1A1A2E', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = '#3E2A56'} onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                    )}
                  </div>

                  <button style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '13px', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: 'var(--font-sans)' }}>
                    <Send size={14} /> {scheduleNow ? 'Send Now' : 'Schedule Notification'}
                  </button>
                </div>

                {/* Phone preview */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Preview</div>
                  {/* Phone mockup */}
                  <div style={{ width: 220, background: '#1A1026', borderRadius: 32, padding: '16px 12px', boxShadow: '0 16px 48px rgba(0,0,0,0.35)', border: '3px solid #2A1B3D' }}>
                    <div style={{ background: '#111', borderRadius: 16, overflow: 'hidden' }}>
                      {/* Status bar */}
                      <div style={{ background: '#1C1C2E', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'white', fontSize: 11, fontWeight: 600 }}>9:41</span>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {['▲','▲','▉'].map((s,i) => <span key={i} style={{ color: 'white', fontSize: 9 }}>{s}</span>)}
                        </div>
                      </div>
                      {/* Notification tile */}
                      <div style={{ background: 'rgba(255,255,255,0.12)', margin: '10px 8px', borderRadius: 12, padding: '10px 12px', backdropFilter: 'blur(8px)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                          <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#6B4A8F,#9B7EC8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={12} color="white" />
                          </div>
                          <span style={{ color: 'white', fontSize: 11, fontWeight: 600 }}>FIXI</span>
                          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginLeft: 'auto' }}>now</span>
                        </div>
                        <div style={{ color: 'white', fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{title || 'Notification Title'}</div>
                        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, lineHeight: 1.4 }}>{body || 'Your notification message will appear here...'}</div>
                      </div>
                      <div style={{ height: 120, background: '#1C1C2E' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: '#9B8AB0', marginTop: 10, textAlign: 'center' }}>Live preview of notification</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* History table */}
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0EAF8' }}>
              <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14 }}>Notification History</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#F8F5FF' }}>
                    {['Title', 'Audience', 'Channel', 'Sent To', 'Date', 'Status'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#3E2A56', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((n, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F8F5FF' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '11px 16px', fontWeight: 600, color: '#1A1A2E' }}>{n.title}</td>
                      <td style={{ padding: '11px 16px', color: '#4A4A6A' }}>{n.audience}</td>
                      <td style={{ padding: '11px 16px', color: '#9B8AB0' }}>{n.channel}</td>
                      <td style={{ padding: '11px 16px', color: '#6B4A8F', fontWeight: 700 }}>{n.sent}</td>
                      <td style={{ padding: '11px 16px', color: '#9B8AB0' }}>{n.date}</td>
                      <td style={{ padding: '11px 16px' }}>
                        <span style={{ background: n.status === 'Sent' ? '#D1FAE5' : '#FEF3C7', color: n.status === 'Sent' ? '#059669' : '#D97706', borderRadius: 50, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{n.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
