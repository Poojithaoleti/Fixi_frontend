import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Wrench, Search } from 'lucide-react';

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Become a Pro', to: '/become-pro' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'white',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(62,42,86,0.12)' : '0 1px 0 #EDE6F8',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 70, gap: 24 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            borderRadius: 10, padding: '6px 14px',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Wrench size={16} color="white" />
            <span style={{ color: 'white', fontWeight: 800, fontSize: 18, fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}>
              FIXI
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 1, justifyContent: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.label} to={link.to} style={{
              color: location.pathname === link.to ? '#3E2A56' : '#4A4A6A',
              fontWeight: location.pathname === link.to ? 700 : 500,
              fontSize: 15, transition: 'color 0.2s',
              borderBottom: location.pathname === link.to ? '2px solid #3E2A56' : '2px solid transparent',
              paddingBottom: 2,
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#3E2A56'}
              onMouseLeave={e => e.currentTarget.style.color = location.pathname === link.to ? '#3E2A56' : '#4A4A6A'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }} className="desktop-nav">
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              border: '1.5px solid #EDE6F8', borderRadius: 50,
              padding: '6px 14px', gap: 6, background: '#F8F5FF',
            }}>
              <Search size={14} color="#6B4A8F" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search services..."
                style={{
                  border: 'none', outline: 'none', fontSize: 13, background: 'transparent',
                  width: 130, fontFamily: 'var(--font-sans)', color: '#1A1A2E',
                }}
              />
            </div>
          </form>
          <button style={{
            border: '2px solid #3E2A56', color: '#3E2A56', borderRadius: 50,
            padding: '8px 18px', fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
            background: 'transparent',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3E2A56'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3E2A56'; }}
          >
            Login
          </button>
          <button style={{
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            color: 'white', borderRadius: 50, padding: '10px 20px',
            fontWeight: 600, fontSize: 13, transition: 'all 0.3s',
          }}
            onClick={() => navigate('/signup')}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(62,42,86,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            Sign Up Free
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} className="mobile-menu-btn"
          style={{ marginLeft: 'auto', color: '#3E2A56', display: 'none' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'white', borderTop: '1px solid #EDE6F8', overflow: 'hidden' }}
          >
            <div style={{ padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Mobile search */}
              <form onSubmit={handleSearch} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #EDE6F8', borderRadius: 10, padding: '8px 12px', gap: 8, background: '#F8F5FF' }}>
                  <Search size={14} color="#6B4A8F" />
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search services..."
                    style={{ border: 'none', outline: 'none', fontSize: 14, background: 'transparent', width: '100%', fontFamily: 'var(--font-sans)' }} />
                </div>
              </form>
              {navLinks.map(link => (
                <Link key={link.label} to={link.to}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: '11px 12px', borderRadius: 8, color: '#3E2A56',
                    fontWeight: 500, fontSize: 15, transition: 'background 0.2s',
                  }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingTop: 12, borderTop: '1px solid #EDE6F8' }}>
                <button style={{ flex: 1, border: '2px solid #3E2A56', color: '#3E2A56', borderRadius: 50, padding: '10px', fontWeight: 600, fontSize: 14 }}>Login</button>
                <button style={{ flex: 1, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)', color: 'white', borderRadius: 50, padding: '10px', fontWeight: 600, fontSize: 14 }}>Sign Up</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
