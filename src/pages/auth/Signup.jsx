import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Wrench, ArrowRight, CheckCircle } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const Field = ({ label, placeholder, type = 'text', icon }) => (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', display: 'block', marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: 10,
          border: '1.5px solid #EDE6F8', outline: 'none', fontSize: 14,
          fontFamily: 'var(--font-sans)', color: '#1A1A2E', boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#3E2A56'}
        onBlur={e => e.target.style.borderColor = '#EDE6F8'}
      />
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #F8F5FF 0%, #EDE6F8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', paddingTop: 90,
    }}>
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,74,143,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(62,42,86,0.08), transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'white', borderRadius: 20, padding: '36px 40px',
          width: '100%', maxWidth: 460,
          boxShadow: '0 20px 60px rgba(62,42,86,0.12)',
          position: 'relative', zIndex: 1,
        }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)', borderRadius: 12, padding: '8px 18px', marginBottom: 20 }}>
            <Wrench size={16} color="white" />
            <span style={{ color: 'white', fontWeight: 800, fontSize: 20, fontFamily: 'var(--font-sans)' }}>FIXI</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', color: '#1A1A2E', marginBottom: 6 }}>Create Your Account</h1>
          <p style={{ color: '#9B8AB0', fontSize: 14 }}>Join 50,000+ happy homeowners</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="Full Name" placeholder="Arjun Sharma" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Phone" placeholder="+91 98765 43210" />
            <Field label="Email" placeholder="you@email.com" type="email" />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', display: 'block', marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'}
                placeholder="Create a strong password"
                style={{
                  width: '100%', padding: '12px 44px 12px 16px', borderRadius: 10,
                  border: '1.5px solid #EDE6F8', outline: 'none', fontSize: 14,
                  fontFamily: 'var(--font-sans)', color: '#1A1A2E', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#3E2A56'}
                onBlur={e => e.target.style.borderColor = '#EDE6F8'}
              />
              <button onClick={() => setShow(!show)} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#9B8AB0',
              }}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Password strength */}
          <div style={{ display: 'flex', gap: 6 }}>
            {['Weak', 'Fair', 'Strong'].map((s, i) => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i === 0 ? '#EF4444' : '#EDE6F8' }} />
            ))}
          </div>

          {/* Terms */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }} onClick={() => setAgreed(!agreed)}>
            <div style={{
              width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
              border: agreed ? 'none' : '2px solid #EDE6F8',
              background: agreed ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}>
              {agreed && <CheckCircle size={12} color="white" />}
            </div>
            <span style={{ fontSize: 13, color: '#9B8AB0', lineHeight: 1.5 }}>
              I agree to FIXI's{' '}
              <span style={{ color: '#6B4A8F', fontWeight: 600 }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: '#6B4A8F', fontWeight: 600 }}>Privacy Policy</span>
            </span>
          </div>
        </div>

        <motion.button
          onClick={() => navigate('/otp')}
          whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(62,42,86,0.4)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            color: 'white', fontWeight: 700, fontSize: 15,
            fontFamily: 'var(--font-sans)', cursor: 'pointer', marginTop: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
          Create Account <ArrowRight size={16} />
        </motion.button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#EDE6F8' }} />
          <span style={{ color: '#B0A0C8', fontSize: 13 }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#EDE6F8' }} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {['Google', 'Apple'].map(p => (
            <button key={p} style={{
              flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #EDE6F8',
              background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              fontFamily: 'var(--font-sans)', color: '#1A1A2E', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F8F5FF'; e.currentTarget.style.borderColor = '#3E2A56'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#EDE6F8'; }}>
              {p}
            </button>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#9B8AB0' }}>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')}
            style={{ color: '#3E2A56', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
            Log In
          </button>
        </p>
      </motion.div>
    </div>
  );
}
