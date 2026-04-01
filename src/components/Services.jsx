import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  return (
    <section id="services" style={{ padding: 'var(--section-py) 0', background: 'white' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="section-label">
            ✦ Our Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A2E', marginBottom: 16 }}>
            Everything Your Home Needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: '#6B6B8A', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Professional services at transparent prices, delivered by verified experts.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div ref={ref}
          variants={containerVariants}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}>
          {services.map((svc) => (
            <motion.div key={svc.id} variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(62,42,86,0.18)' }}
              onClick={() => navigate(`/services/${svc.id}`)}
              style={{
                background: 'white', borderRadius: 16,
                boxShadow: '0 4px 20px rgba(62,42,86,0.08)',
                overflow: 'hidden', cursor: 'pointer',
                border: '1px solid #F0EAF8',
              }}>
              {/* Top accent */}
              <div style={{ height: 5, background: 'linear-gradient(90deg, #3E2A56, #6B4A8F)' }} />
              {/* Image */}
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <img src={svc.img} alt={svc.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: '#EDE6F8', borderRadius: 8,
                  padding: '6px 10px', fontSize: 22,
                }}>{svc.icon}</div>
                {svc.badge && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                    color: 'white', borderRadius: 50, padding: '3px 10px',
                    fontSize: 11, fontWeight: 700,
                  }}>{svc.badge}</div>
                )}
              </div>
              {/* Content */}
              <div style={{ padding: '20px 20px 24px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 6, fontFamily: 'var(--font-sans)' }}>
                  {svc.name}
                </h3>
                <p style={{ color: '#7A7A9A', fontSize: 14, marginBottom: 16 }}>{svc.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B4A8F', fontWeight: 700, fontSize: 16 }}>{svc.priceLabel}</span>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    border: '1.5px solid #3E2A56', color: '#3E2A56',
                    borderRadius: 50, padding: '8px 16px', fontSize: 13, fontWeight: 600,
                    transition: 'all 0.25s', background: 'transparent',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #3E2A56, #6B4A8F)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.border = '1.5px solid transparent';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#3E2A56';
                      e.currentTarget.style.border = '1.5px solid #3E2A56';
                    }}
                  >
                    Book Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: 48 }}>
          <button onClick={() => navigate('/services')} style={{
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            color: 'white', borderRadius: 50, padding: '14px 36px',
            fontWeight: 700, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(62,42,86,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            Explore All Services <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
