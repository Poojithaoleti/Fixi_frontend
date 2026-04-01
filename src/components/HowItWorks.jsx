import { motion } from 'framer-motion';
import { Search, UserCheck, Wrench, Star } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <Search size={28} color="#3E2A56" />,
    title: 'Search a Service',
    desc: 'Browse from 50+ home services. Enter your location and pick what you need — AC repair, plumbing, cleaning, and more.',
  },
  {
    number: '02',
    icon: <UserCheck size={28} color="#3E2A56" />,
    title: 'Choose Your Pro',
    desc: 'Pick from verified, background-checked professionals in your area. View ratings, reviews, and pricing upfront.',
  },
  {
    number: '03',
    icon: <Wrench size={28} color="#3E2A56" />,
    title: 'Get It Fixed',
    desc: 'Your pro arrives on time and gets the job done right. We guarantee quality or your money back.',
  },
  {
    number: '04',
    icon: <Star size={28} color="#3E2A56" />,
    title: 'Rate & Review',
    desc: 'Share your experience to help the community. Your feedback keeps our pros at the top of their game.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: 'var(--section-py) 0', background: '#F8F5FF' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="section-label">
            ✦ Simple Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A2E', marginBottom: 16 }}>
            How FIXI Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: '#6B6B8A', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
            From search to service in four easy steps. No hassle, no surprises.
          </motion.p>
        </div>

        <div className="steps-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 0,
          position: 'relative',
        }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute', top: 52, left: '12.5%', right: '12.5%', height: 2,
            background: 'linear-gradient(90deg, #3E2A56, #6B4A8F)',
            opacity: 0.2, zIndex: 0,
          }} className="connector-line" />

          {steps.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}>
              {/* Badge circle */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  style={{
                    width: 96, height: 96,
                    background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0 8px 24px rgba(62,42,86,0.3)',
                  }}>
                  <div style={{
                    width: 80, height: 80,
                    background: '#EDE6F8',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: 2,
                  }}>
                    {step.icon}
                  </div>
                </motion.div>
                {/* Step number */}
                <div style={{
                  position: 'absolute', top: -6, right: -6,
                  width: 28, height: 28,
                  background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 11, fontWeight: 800,
                  border: '2px solid #F8F5FF',
                }}>
                  {i + 1}
                </div>
              </div>
              <h3 style={{
                fontSize: 19, fontWeight: 700, color: '#1A1A2E',
                marginBottom: 10, fontFamily: 'var(--font-sans)',
              }}>
                {step.title}
              </h3>
              <p style={{ color: '#6B6B8A', fontSize: 14, lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 56 }}>
          <button style={{
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            color: 'white', borderRadius: 50, padding: '14px 36px',
            fontWeight: 700, fontSize: 16, transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(62,42,86,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            Book Your First Service →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
