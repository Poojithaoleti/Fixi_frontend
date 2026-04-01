import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, ArrowRight } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #F8F5FF 0%, #EDE6F8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', paddingTop: 90,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'white', borderRadius: 20, padding: '40px',
          width: '100%', maxWidth: 420,
          boxShadow: '0 20px 60px rgba(62,42,86,0.12)',
          textAlign: 'center',
        }}>

        <button onClick={() => navigate('/login')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B4A8F', fontWeight: 600, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 28 }}>
          <ArrowLeft size={16} /> Back to Login
        </button>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #EDE6F8, #D6C8F0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
          <Lock size={30} color="#3E2A56" />
        </motion.div>

        <h2 style={{ fontSize: '1.6rem', color: '#1A1A2E', marginBottom: 8 }}>Forgot Password?</h2>
        <p style={{ color: '#9B8AB0', fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
          No worries! Enter your phone or email and we'll send you a reset link.
        </p>

        <div style={{ textAlign: 'left', marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', display: 'block', marginBottom: 6 }}>Phone Number / Email</label>
          <input
            placeholder="Enter your registered phone or email"
            style={{
              width: '100%', padding: '13px 16px', borderRadius: 10,
              border: '1.5px solid #EDE6F8', outline: 'none', fontSize: 14,
              fontFamily: 'var(--font-sans)', color: '#1A1A2E', boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#3E2A56'}
            onBlur={e => e.target.style.borderColor = '#EDE6F8'}
          />
        </div>

        <motion.button
          onClick={() => navigate('/otp')}
          whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(62,42,86,0.4)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            color: 'white', fontWeight: 700, fontSize: 15,
            fontFamily: 'var(--font-sans)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
          Send Reset Link <ArrowRight size={16} />
        </motion.button>

        <p style={{ marginTop: 20, fontSize: 14, color: '#9B8AB0' }}>
          Remembered it?{' '}
          <button onClick={() => navigate('/login')}
            style={{ color: '#6B4A8F', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
            Log In
          </button>
        </p>
      </motion.div>
    </div>
  );
}
