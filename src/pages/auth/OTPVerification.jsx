import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight, ArrowLeft, Phone } from 'lucide-react';

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const inputs = useRef([]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) inputs.current[idx - 1]?.focus();
  };

  const filled = otp.filter(Boolean).length;

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #F8F5FF 0%, #EDE6F8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', paddingTop: 90,
    }}>
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,74,143,0.12), transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'white', borderRadius: 20, padding: '40px',
          width: '100%', maxWidth: 420,
          boxShadow: '0 20px 60px rgba(62,42,86,0.12)',
          position: 'relative', zIndex: 1, textAlign: 'center',
        }}>

        {/* Back */}
        <button onClick={() => navigate('/login')}
          style={{ position: 'absolute', top: 20, left: 20, background: 'none', border: 'none', cursor: 'pointer', color: '#6B4A8F', display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back
        </button>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #EDE6F8, #D6C8F0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
          <Phone size={30} color="#3E2A56" />
        </motion.div>

        <h2 style={{ fontSize: '1.6rem', color: '#1A1A2E', marginBottom: 8 }}>Verify Your Number</h2>
        <p style={{ color: '#9B8AB0', fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
          We sent a 6-digit code to<br />
          <span style={{ color: '#3E2A56', fontWeight: 700 }}>+91 98765 ••••3</span>
        </p>

        {/* OTP Inputs */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={el => inputs.current[i] = el}
              value={digit}
              onChange={e => handleChange(e.target.value, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              maxLength={1}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                width: 48, height: 56, textAlign: 'center', fontSize: 22, fontWeight: 700,
                borderRadius: 12, border: digit ? '2px solid #3E2A56' : '2px solid #EDE6F8',
                outline: 'none', background: digit ? '#F8F5FF' : 'white',
                color: '#1A1A2E', fontFamily: 'var(--font-sans)',
                transition: 'all 0.2s', cursor: 'text',
              }}
              onFocus={e => { e.target.style.borderColor = '#3E2A56'; e.target.style.background = '#F8F5FF'; }}
              onBlur={e => { if (!digit) { e.target.style.borderColor = '#EDE6F8'; e.target.style.background = 'white'; } }}
            />
          ))}
        </div>

        {/* Progress indicator */}
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 24 }}>
          {otp.map((_, i) => (
            <div key={i} style={{ width: 8, height: 4, borderRadius: 2, background: i < filled ? '#3E2A56' : '#EDE6F8', transition: 'background 0.2s' }} />
          ))}
        </div>

        <motion.button
          onClick={() => navigate('/dashboard')}
          whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(62,42,86,0.4)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: filled === 6 ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#EDE6F8',
            color: filled === 6 ? 'white' : '#B0A0C8',
            fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-sans)',
            cursor: filled === 6 ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.3s',
          }}>
          Verify OTP <ArrowRight size={16} />
        </motion.button>

        {/* Resend */}
        <div style={{ marginTop: 20, fontSize: 14, color: '#9B8AB0' }}>
          {countdown > 0 ? (
            <span>Resend code in <span style={{ color: '#3E2A56', fontWeight: 700 }}>0:{countdown.toString().padStart(2, '0')}</span></span>
          ) : (
            <button onClick={() => setCountdown(45)}
              style={{ color: '#6B4A8F', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
              Resend OTP
            </button>
          )}
        </div>
        <button style={{ display: 'block', margin: '10px auto 0', color: '#B0A0C8', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
          Change phone number
        </button>
      </motion.div>
    </div>
  );
}
