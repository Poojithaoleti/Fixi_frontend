import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Wallet, ArrowRight } from 'lucide-react';

export default function BecomePro() {
  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const avgRatePerHour = 350;
  const estimated = Math.round(hoursPerDay * daysPerWeek * 4.3 * avgRatePerHour);

  return (
    <section id="become-pro" style={{ padding: 'var(--section-py) 0', background: 'white' }}>
      <div className="container">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, #3E2A56 0%, #4A3268 60%, #2A1B3D 100%)',
            borderRadius: 24, padding: '64px 48px',
            position: 'relative', overflow: 'hidden', marginBottom: 80,
          }}>
          {/* Pattern */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: [200, 150, 100, 180, 120, 90, 160, 130][i],
                height: [200, 150, 100, 180, 120, 90, 160, 130][i],
                borderRadius: '50%',
                border: '1px solid rgba(107,74,143,0.3)',
                left: `${[10, 70, 85, 30, 55, 75, 5, 45][i]}%`,
                top: `${[-20, -30, 30, 70, -10, 60, 50, 80][i]}%`,
              }} />
            ))}
          </div>

          <div className="become-pro-hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.15)', color: '#EDE6F8',
                padding: '6px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600,
                marginBottom: 20,
              }}>
                ✦ Join 500+ Pros
              </div>
              <h2 style={{
                color: 'white', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontFamily: 'var(--font-serif)', lineHeight: 1.15, marginBottom: 16,
              }}>
                Earn on Your<br /><em>Own Terms</em>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
                Join FIXI's growing network of skilled professionals and start earning more with complete flexibility.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button style={{
                  background: 'white', color: '#3E2A56', borderRadius: 50,
                  padding: '14px 28px', fontWeight: 700, fontSize: 15,
                  display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                >
                  Register as Pro <ArrowRight size={16} />
                </button>
                <button style={{
                  border: '2px solid rgba(255,255,255,0.5)', color: 'white', borderRadius: 50,
                  padding: '12px 28px', fontWeight: 600, fontSize: 15, background: 'transparent',
                  transition: 'all 0.3s',
                }}>
                  Learn More
                </button>
              </div>
            </div>

            {/* Earnings Calculator */}
            <div style={{
              background: 'white', borderRadius: 16, padding: 32,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 24, fontFamily: 'var(--font-sans)' }}>
                💰 Earnings Calculator
              </h3>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label style={{ fontSize: 14, color: '#6B6B8A', fontWeight: 500 }}>Hours per day</label>
                  <span style={{ fontWeight: 700, color: '#3E2A56', fontSize: 15 }}>{hoursPerDay}h</span>
                </div>
                <input type="range" min={2} max={12} value={hoursPerDay}
                  onChange={e => setHoursPerDay(+e.target.value)}
                  style={{ width: '100%', accentColor: '#3E2A56' }} />
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label style={{ fontSize: 14, color: '#6B6B8A', fontWeight: 500 }}>Days per week</label>
                  <span style={{ fontWeight: 700, color: '#3E2A56', fontSize: 15 }}>{daysPerWeek} days</span>
                </div>
                <input type="range" min={1} max={7} value={daysPerWeek}
                  onChange={e => setDaysPerWeek(+e.target.value)}
                  style={{ width: '100%', accentColor: '#3E2A56' }} />
              </div>

              <div style={{
                background: '#EDE6F8', borderRadius: 12, padding: '20px 24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 13, color: '#6B4A8F', fontWeight: 600, marginBottom: 4 }}>ESTIMATED MONTHLY</div>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800,
                  color: '#3E2A56', fontFamily: 'var(--font-sans)', lineHeight: 1,
                }}>
                  ₹{estimated.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: 13, color: '#9B8AB0', marginTop: 6 }}>Based on ₹350/hr avg rate</div>
              </div>
            </div>
          </div>
        </motion.div>

    </section>
  );
}
