import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Wrench, ArrowRight, Phone } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState('phone');

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #F8F5FF 0%, #EDE6F8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', paddingTop: 90,
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,74,143,0.12), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(62,42,86,0.1), transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'white', borderRadius: 20, padding: '40px 40px',
          width: '100%', maxWidth: 440,
          boxShadow: '0 20px 60px rgba(62,42,86,0.12)',
          position: 'relative', zIndex: 1,
        }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)', borderRadius: 12, padding: '8px 18px', marginBottom: 20 }}>
            <Wrench size={16} color="white" />
            <span style={{ color: 'white', fontWeight: 800, fontSize: 20, fontFamily: 'var(--font-sans)' }}>FIXI</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', color: '#1A1A2E', marginBottom: 6 }}>Welcome Back!</h1>
          <p style={{ color: '#9B8AB0', fontSize: 14 }}>Sign in to manage your bookings</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#F8F5FF', borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {['phone', 'email'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '9px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13,
                background: tab === t ? 'white' : 'transparent',
                color: tab === t ? '#3E2A56' : '#9B8AB0',
                boxShadow: tab === t ? '0 2px 8px rgba(62,42,86,0.1)' : 'none',
                transition: 'all 0.2s',
              }}>
              {t === 'phone' ? '📱 Phone' : '📧 Email'}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 8 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', display: 'block', marginBottom: 6 }}>
              {tab === 'phone' ? 'Phone Number' : 'Email Address'}
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {tab === 'phone' && (
                <div style={{ padding: '12px 14px', background: '#F8F5FF', borderRadius: 10, border: '1.5px solid #EDE6F8', fontSize: 14, fontWeight: 600, color: '#3E2A56', whiteSpace: 'nowrap' }}>🇮🇳 +91</div>
              )}
              <input
                placeholder={tab === 'phone' ? '98765 43210' : 'you@email.com'}
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: 10,
                  border: '1.5px solid #EDE6F8', outline: 'none', fontSize: 14,
                  fontFamily: 'var(--font-sans)', color: '#1A1A2E',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#3E2A56'}
                onBlur={e => e.target.style.borderColor = '#EDE6F8'}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A' }}>Password</label>
              <button
                onClick={() => navigate('/forgot-password')}
                style={{ fontSize: 13, color: '#6B4A8F', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
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
        </div>

        {/* Login Button */}
        <motion.button
          onClick={() => navigate('/dashboard')}
          whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(62,42,86,0.4)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            color: 'white', fontWeight: 700, fontSize: 15,
            fontFamily: 'var(--font-sans)', cursor: 'pointer', marginTop: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
          Login <ArrowRight size={16} />
        </motion.button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#EDE6F8' }} />
          <span style={{ color: '#B0A0C8', fontSize: 13 }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: '#EDE6F8' }} />
        </div>

        {/* Social */}
        <div style={{ display: 'flex', gap: 10 }}>
          {['Google', 'Apple'].map(p => (
            <button key={p} style={{
              flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #EDE6F8',
              background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              fontFamily: 'var(--font-sans)', color: '#1A1A2E', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F8F5FF'; e.currentTarget.style.borderColor = '#3E2A56'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#EDE6F8'; }}>
              <span style={{ fontSize: 18 }}>{p === 'Google' ? 'G' : ''}</span>
              {p}
            </button>
          ))}
        </div>

        {/* Signup link */}
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#9B8AB0' }}>
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')}
            style={{ color: '#3E2A56', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
            Sign Up Free
          </button>
        </p>
      </motion.div>
    </div>
  );
}
