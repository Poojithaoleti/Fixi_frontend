import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on service detail (has its own mobile CTA) or booking flows
  const hide = location.pathname.startsWith('/services/');

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (hide) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 999,
            display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end',
          }}>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/services')}
            style={{
              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
              color: 'white', borderRadius: 50,
              padding: '14px 24px', fontWeight: 700, fontSize: 15,
              boxShadow: '0 8px 30px rgba(62,42,86,0.45)',
              display: 'flex', alignItems: 'center', gap: 8,
              border: 'none', cursor: 'pointer',
            }}>
            Book a Service
          </motion.button>
          <motion.a
            href="tel:+911800FIXINOW"
            whileHover={{ scale: 1.1 }}
            style={{
              width: 48, height: 48, borderRadius: '50%',
              background: '#10B981', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
            }}>
            <Phone size={20} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
