import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Save, ToggleRight } from 'lucide-react';
import ProSidebar from '../../components/ProSidebar';

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function buildCalendar(year, month) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return cells;
}

const bookedDays = new Set([1, 4, 8, 11, 15, 18, 22, 25, 29]);
const offDays = new Set([6, 7, 13, 14, 20, 21, 27, 28]);

const weekJobs = [
  { day: 'Mon', date: 31, service: 'AC Service', customer: 'Arjun K.', time: '10:00 AM', status: 'Completed', statusColor: '#059669', statusBg: '#D1FAE5' },
  { day: 'Tue', date: 1, service: 'AC Installation', customer: 'Priya M.', time: '2:30 PM', status: 'Upcoming', statusColor: '#3E2A56', statusBg: '#EDE6F8' },
  { day: 'Thu', date: 3, service: 'AC Repair', customer: 'Sneha R.', time: '11:00 AM', status: 'Upcoming', statusColor: '#3E2A56', statusBg: '#EDE6F8' },
];

const pv = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ProSchedule() {
  const navigate = useNavigate();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(today.getDate());
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('20:00');
  const [saved, setSaved] = useState(false);

  const cells = buildCalendar(year, month);
  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', gap: 28, maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px', alignItems: 'flex-start' }}>
        <ProSidebar currentPage="pro-schedule" />

        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>My Schedule</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE6F8', borderRadius: 50, padding: '6px 14px' }}>
              <ToggleRight size={16} color="#3E2A56" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#3E2A56' }}>Duty: ON</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }} className="schedule-grid">
            {/* Left: calendar + week */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Calendar */}
              <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <button onClick={prevMonth} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #EDE6F8', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={16} color="#3E2A56" /></button>
                  <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16 }}>{MONTHS[month]} {year}</span>
                  <button onClick={nextMonth} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #EDE6F8', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={16} color="#3E2A56" /></button>
                </div>
                {/* Day headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 6 }}>
                  {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#9B8AB0', padding: '4px 0' }}>{d}</div>)}
                </div>
                {/* Cells */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
                  {cells.map((d, i) => {
                    if (!d) return <div key={i} />;
                    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    const isOff = offDays.has(d);
                    const hasJob = bookedDays.has(d);
                    const isSel = d === selected;
                    return (
                      <motion.button key={i} whileHover={{ scale: 1.1 }} onClick={() => setSelected(d)}
                        style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: isSel || isToday ? 700 : 400, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', fontFamily: 'var(--font-sans)', transition: 'all 0.15s',
                          background: isSel ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : isToday ? '#EDE6F8' : isOff ? '#FFF3F0' : 'transparent',
                          color: isSel ? 'white' : isOff ? '#9B8AB0' : '#1A1A2E',
                        }}>
                        {d}
                        {hasJob && !isSel && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#6B4A8F', position: 'absolute', bottom: 3 }} />}
                      </motion.button>
                    );
                  })}
                </div>
                {/* Legend */}
                <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 14, borderTop: '1px solid #F0EAF8', flexWrap: 'wrap' }}>
                  {[['#EDE6F8','Today'],['#6B4A8F','Has booking'],['#FFF3F0','Day off']].map(([bg, label]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: bg, border: '1px solid #EDE6F8' }} />
                      <span style={{ fontSize: 12, color: '#9B8AB0' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Week view */}
              <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 14 }}>This Week's Bookings</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {weekJobs.map((job, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: '#F8F5FF', borderRadius: 10, borderLeft: '4px solid #3E2A56', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 36 }}>
                        <div style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600 }}>{job.day}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#3E2A56' }}>{job.date}</div>
                      </div>
                      <div style={{ flex: 1, minWidth: 120 }}>
                        <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14 }}>{job.service}</div>
                        <div style={{ fontSize: 12, color: '#9B8AB0' }}>{job.customer} · {job.time}</div>
                      </div>
                      <span style={{ background: job.statusBg, color: job.statusColor, borderRadius: 50, fontSize: 11, fontWeight: 700, padding: '3px 10px', flexShrink: 0 }}>{job.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: settings panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 16 }}>Working Hours</div>
                {[['Start Time', startTime, setStartTime], ['End Time', endTime, setEndTime]].map(([label, val, setter]) => (
                  <div key={label} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#6B6B8A', marginBottom: 6 }}>{label}</div>
                    <input type="time" value={val} onChange={e => setter(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)', color: '#1A1A2E', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#3E2A56'}
                      onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#6B6B8A', marginBottom: 6 }}>Max Jobs Per Day</div>
                  <input type="range" min={1} max={8} defaultValue={4} style={{ width: '100%', accentColor: '#3E2A56' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9B8AB0', marginTop: 4 }}><span>1</span><span>8</span></div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#6B6B8A', marginBottom: 8 }}>Working Days</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {DAYS.map((d, i) => (
                      <button key={d} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.2s', borderColor: ![0,6].includes(i) ? '#3E2A56' : '#EDE6F8', background: ![0,6].includes(i) ? '#3E2A56' : 'white', color: ![0,6].includes(i) ? 'white' : '#9B8AB0' }}>{d[0]}</button>
                    ))}
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave}
                  style={{ width: '100%', background: saved ? '#10B981' : 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '13px', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, transition: 'background 0.3s', fontFamily: 'var(--font-sans)' }}>
                  {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Settings</>}
                </motion.button>
              </div>

              {/* Block dates */}
              <div style={{ background: 'white', borderRadius: 16, padding: '18px 22px', boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14, marginBottom: 10 }}>Block a Date</div>
                <input type="date" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)', color: '#1A1A2E', boxSizing: 'border-box', marginBottom: 10 }}
                  onFocus={e => e.target.style.borderColor = '#3E2A56'}
                  onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                <button style={{ width: '100%', border: '1.5px solid #3E2A56', color: '#3E2A56', borderRadius: 50, padding: '10px', fontWeight: 600, fontSize: 13, background: 'white', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                  Mark as Off Day
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}

