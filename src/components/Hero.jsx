import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Zap } from 'lucide-react';

const stats = [
  { label: 'Jobs Done', value: '10,000+' },
  { label: 'Verified Pros', value: '500+' },
  { label: 'Avg Rating', value: '4.8★' },
  { label: 'Same-Day Service', value: '100%' },
];

const popularSearches = ['AC Repair', 'Plumbing', 'Electrical', 'Deep Cleaning', 'Carpentry'];

export default function Hero() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('loc', location);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="hero-section" style={{
      background: 'linear-gradient(135deg, #3E2A56 0%, #4A3268 50%, #2A1B3D 100%)',
      minHeight: '100vh', paddingTop: 70, position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
    }}>
      {/* Geometric Decorations */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.06 + i * 0.02, scale: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
            style={{
              position: 'absolute',
              width: [400, 300, 250, 200, 350, 180][i],
              height: [400, 300, 250, 200, 350, 180][i],
              borderRadius: '50%',
              border: '1px solid #6B4A8F',
              left: ['10%', '70%', '-5%', '80%', '30%', '60%'][i],
              top: ['10%', '5%', '60%', '60%', '80%', '40%'][i],
            }} />
        ))}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', right: '-100px', top: '10%',
            width: 500, height: 500, opacity: 0.04,
            background: 'radial-gradient(circle, #6B4A8F, transparent)',
          }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(107,74,143,0.3)', color: '#EDE6F8',
              padding: '8px 20px', borderRadius: 50, fontSize: 13, fontWeight: 600,
              border: '1px solid rgba(237,230,248,0.2)', marginBottom: 24,
            }}>
            <Zap size={14} style={{ fill: '#EDE6F8' }} />
            Trusted by 50,000+ homeowners in India
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              color: 'white', fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
              fontFamily: 'var(--font-serif)', lineHeight: 1.1, marginBottom: 20,
            }}>
            Your Home,{' '}
            <span style={{ fontStyle: 'italic', color: '#EDE6F8' }}>Fixed Fast</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: '0 auto 40px',
            }}>
            Book verified home service professionals in minutes. AC repair, plumbing, electrical, and more — all at your doorstep.
          </motion.p>

          {/* Search Card */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-search-card"
            style={{
              background: 'white', borderRadius: 16, padding: '16px 20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
            }}>
            <div style={{ flex: 1, minWidth: 180, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Search size={18} color="#6B4A8F" style={{ flexShrink: 0 }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="What service do you need?"
                style={{
                  border: 'none', outline: 'none', fontSize: 15, width: '100%',
                  color: '#1A1A2E', fontFamily: 'var(--font-sans)',
                }} />
            </div>
            <div className="hero-search-divider" style={{ width: 1, height: 36, background: '#EDE6F8', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 160, display: 'flex', alignItems: 'center', gap: 10 }}>
              <MapPin size={18} color="#6B4A8F" style={{ flexShrink: 0 }} />
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Your location"
                style={{
                  border: 'none', outline: 'none', fontSize: 15, width: '100%',
                  color: '#1A1A2E', fontFamily: 'var(--font-sans)',
                }} />
            </div>
            <button type="submit" className="hero-search-btn" style={{
              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
              color: 'white', borderRadius: 10, padding: '14px 28px',
              fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.3s', flexShrink: 0,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(62,42,86,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <Search size={16} />
              Search
            </button>
          </motion.form>

          {/* Popular Searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Popular:</span>
            {popularSearches.map(s => (
              <button key={s}
                onClick={() => navigate(`/search?q=${encodeURIComponent(s)}`)}
                style={{
                  background: 'rgba(255,255,255,0.1)', color: '#EDE6F8',
                  border: '1px solid rgba(237,230,248,0.2)', borderRadius: 50,
                  padding: '5px 14px', fontSize: 13, fontWeight: 500,
                  transition: 'all 0.2s', cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              >{s}</button>
            ))}
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="hero-stats"
            style={{
              marginTop: 56,
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
              background: 'rgba(255,255,255,0.08)', borderRadius: 16,
              overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)',
            }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                padding: '24px 16px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div style={{ color: 'white', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, fontFamily: 'var(--font-sans)', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, marginTop: 6, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 33.3C1200 26.7 1320 13.3 1380 6.7L1440 0V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
