import { motion } from 'framer-motion';


const timeline = [
  { year: '2020', event: 'FIXI founded in Hyderabad with 12 service professionals.' },
  { year: '2021', event: 'Expanded to 5 cities. Crossed 1,000 verified pros on platform.' },
  { year: '2022', event: 'Launched Pro Training Academy. 4.8★ average rating achieved.' },
  { year: '2023', event: 'Reached 50,000+ customers. Entered Tier-2 markets nationwide.' },
  { year: '2024', event: '10,000+ jobs completed monthly. Raised Series A funding.' },
];

export default function About() {
  return (
    <section id="about" style={{ padding: 'var(--section-py) 0', background: 'white' }}>
      <div className="container">

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            borderRadius: 24, padding: '72px 48px', textAlign: 'center',
            marginBottom: 80, position: 'relative', overflow: 'hidden',
          }}>
          {/* diagonal stripe texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="section-label" style={{ background: 'rgba(255,255,255,0.15)', color: '#EDE6F8' }}>
              ✦ Our Story
            </motion.div>
            <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'var(--font-serif)', marginBottom: 16 }}>
              We're FIXI — Built on Trust
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
              Born from a simple frustration: finding a reliable home service professional shouldn't be hard. So we built the platform we always wished existed.
            </p>
          </div>
        </motion.div>

        {/* Mission + Image */}
        <div className="about-mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <div className="section-label">✦ Our Mission</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#1A1A2E', marginBottom: 20 }}>
              Making Home Services Simple, Safe & Affordable
            </h2>
            <p style={{ color: '#6B6B8A', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              We believe every homeowner deserves access to skilled, honest professionals — and every skilled professional deserves fair pay and dignity.
            </p>
            <p style={{ color: '#6B6B8A', fontSize: 16, lineHeight: 1.8 }}>
              FIXI bridges that gap with technology, trust, and training. We're not just a marketplace — we're a community that raises the bar for home services across India.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{
              background: '#EDE6F8', borderRadius: 20, overflow: 'hidden',
              height: 340, position: 'relative',
            }}>
              <img src="/about-1.jpg" alt="FIXI team"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div style={{ background: '#F8F5FF', borderRadius: 20, padding: '56px 48px', marginBottom: 80 }}>
          <h3 style={{ textAlign: 'center', fontSize: 26, color: '#1A1A2E', marginBottom: 48, fontFamily: 'var(--font-serif)' }}>
            Our Journey
          </h3>
          <div style={{ position: 'relative' }}>
            {/* Line */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: 2, background: 'linear-gradient(to bottom, #3E2A56, #6B4A8F)',
              transform: 'translateX(-50%)', opacity: 0.2,
            }} className="timeline-line" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {timeline.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                    position: 'relative',
                  }}>
                  {/* Center dot */}
                  <div style={{
                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    width: 16, height: 16,
                    background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                    borderRadius: '50%', border: '3px solid #F8F5FF',
                    zIndex: 1, flexShrink: 0,
                  }} />
                  <div style={{
                    background: 'white', borderRadius: 14, padding: '20px 24px',
                    boxShadow: '0 4px 16px rgba(62,42,86,0.1)',
                    maxWidth: '45%', width: '45%',
                    marginLeft: i % 2 === 0 ? 0 : 'auto',
                    marginRight: i % 2 === 0 ? 'auto' : 0,
                  }}>
                    <div style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                      color: 'white', padding: '3px 12px', borderRadius: 50,
                      fontSize: 12, fontWeight: 700, marginBottom: 8,
                    }}>{item.year}</div>
                    <p style={{ color: '#4A4A6A', fontSize: 14, lineHeight: 1.6 }}>{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
