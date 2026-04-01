import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Meera Iyer', city: 'Bangalore', service: 'AC Service',
    rating: 5, initials: 'MI', color: '#3E2A56',
    review: 'My AC was making terrible noise and FIXI had a pro here within 90 minutes. Fixed it completely, didn\'t overcharge, and left the place clean. Exactly what I hoped for.',
  },
  {
    name: 'Vikram Nair', city: 'Hyderabad', service: 'Plumbing',
    rating: 5, initials: 'VN', color: '#6B4A8F',
    review: 'I had a serious pipe leak on a Sunday afternoon. No plumber would come. FIXI found me someone within 30 minutes. The pricing was fair and the work was solid.',
  },
  {
    name: 'Sunita Kapoor', city: 'Mumbai', service: 'Deep Cleaning',
    rating: 5, initials: 'SK', color: '#4D3569',
    review: 'Absolutely thorough deep clean before Diwali. Two professionals arrived on time, were super professional, and my flat looks brand new. Will definitely book again.',
  },
  {
    name: 'Rohit Sharma', city: 'Delhi', service: 'Electrical',
    rating: 5, initials: 'RS', color: '#9B7EC8',
    review: 'Quick, professional, and very knowledgeable. Sorted out a confusing switchboard issue that two other electricians couldn\'t figure out. 10/10.',
  },
  {
    name: 'Ananya Das', city: 'Pune', service: 'Carpentry',
    rating: 5, initials: 'AD', color: '#3E2A56',
    review: 'Got my kitchen cabinets fixed and a new TV unit assembled. The carpenter was skilled, punctual, and very careful with the walls. Couldn\'t be happier.',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive(a => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive(a => (a + 1) % reviews.length);

  const r = reviews[active];

  return (
    <section style={{ padding: 'var(--section-py) 0', background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="section-label">
            ✦ Customer Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A2E', marginBottom: 12 }}>
            What Customers Say
          </motion.h2>
        </div>

        {/* Main Review Card */}
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(135deg, #3E2A56, #4D3569)',
                borderRadius: 24, padding: '48px 48px 40px',
                textAlign: 'center', position: 'relative', overflow: 'hidden',
              }}>
              {/* Decorative quote */}
              <div style={{ position: 'absolute', top: 24, left: 32, opacity: 0.1 }}>
                <Quote size={80} color="white" />
              </div>

              <div style={{
                width: 72, height: 72,
                background: `linear-gradient(135deg, ${r.color}, #9B7EC8)`,
                borderRadius: '50%', margin: '0 auto 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 24, fontWeight: 700,
                border: '3px solid rgba(255,255,255,0.2)',
              }}>
                {r.initials}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: 20 }}>
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={18} style={{ fill: '#FBBF24', color: '#FBBF24' }} />
                ))}
              </div>

              <p style={{
                color: 'rgba(255,255,255,0.9)', fontSize: 17, lineHeight: 1.8,
                fontStyle: 'italic', marginBottom: 24, position: 'relative', zIndex: 1,
              }}>
                "{r.review}"
              </p>

              <div style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>{r.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, marginTop: 4 }}>
                {r.service} · {r.city}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 28 }}>
            <button onClick={prev} style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1.5px solid #EDE6F8', background: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#3E2A56', transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3E2A56'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#3E2A56'; }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8 }}>
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: i === active ? 24 : 8, height: 8,
                  borderRadius: 50,
                  background: i === active
                    ? 'linear-gradient(90deg, #3E2A56, #6B4A8F)'
                    : '#EDE6F8',
                  transition: 'all 0.3s', cursor: 'pointer', border: 'none',
                }} />
              ))}
            </div>

            <button onClick={next} style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1.5px solid #EDE6F8', background: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#3E2A56', transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3E2A56'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#3E2A56'; }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="testimonials-stats" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24, marginTop: 56, maxWidth: 640, margin: '56px auto 0',
          }}>
          {[
            { val: '4.9★', label: 'App Store Rating' },
            { val: '98%', label: 'Would Recommend' },
            { val: '50K+', label: 'Happy Customers' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '24px', background: '#F8F5FF', borderRadius: 14 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#3E2A56', fontFamily: 'var(--font-sans)' }}>{s.val}</div>
              <div style={{ fontSize: 13, color: '#9B8AB0', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
