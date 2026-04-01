import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Wrench } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageVariants} initial="initial" animate="animate" exit="exit"
      style={{
        minHeight: '100vh', background: '#F8F5FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 70, flexDirection: 'column', textAlign: 'center', padding: '80px 24px',
      }}>

      {/* Animated illustration */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ marginBottom: 32 }}>
        <div style={{
          width: 120, height: 120, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto', boxShadow: '0 16px 48px rgba(62,42,86,0.3)',
        }}>
          <Wrench size={52} color="white" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{
          display: 'inline-block', background: '#EDE6F8', color: '#3E2A56',
          padding: '6px 18px', borderRadius: 50, fontSize: 13, fontWeight: 700,
          marginBottom: 16, letterSpacing: '0.05em',
        }}>404 — PAGE NOT FOUND</div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#1A1A2E',
          fontFamily: 'var(--font-serif)', marginBottom: 16, lineHeight: 1.2,
        }}>
          Oops! This page<br />went missing.
        </h1>

        <p style={{
          color: '#9B8AB0', fontSize: 17, lineHeight: 1.7,
          maxWidth: 420, margin: '0 auto 40px',
        }}>
          Looks like this page needs a repair. Our pros can fix almost anything — but this one's on us. Let's get you back on track.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(62,42,86,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
              color: 'white', borderRadius: 50, padding: '13px 28px',
              fontWeight: 700, fontSize: 15,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
            <Home size={16} /> Back to Home
          </motion.button>

          <button onClick={() => navigate('/services')} style={{
            border: '2px solid #3E2A56', color: '#3E2A56', borderRadius: 50,
            padding: '11px 28px', fontWeight: 600, fontSize: 15, background: 'white',
            display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3E2A56'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#3E2A56'; }}>
            <Search size={16} /> Browse Services
          </button>
        </div>
      </motion.div>

      {/* Decorative circles */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: [300, 200, 150, 250][i], height: [300, 200, 150, 250][i],
            borderRadius: '50%', border: '1px solid rgba(62,42,86,0.06)',
            left: ['5%', '75%', '60%', '20%'][i], top: ['10%', '5%', '65%', '70%'][i],
          }} />
        ))}
      </div>
    </motion.div>
  );
}
