import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, ArrowRight, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { services } from '../data/services';
import Footer from '../components/Footer';

const categories = ['All', 'Appliances', 'Plumbing', 'Electrical', 'Cleaning', 'Home Repair', 'Home Improvement', 'Pest Control'];
const sortOptions = ['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ServicesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('Most Popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = services.filter(s => {
      const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || s.category === category;
      const matchPrice = s.price <= maxPrice;
      const matchRating = s.rating >= minRating;
      return matchSearch && matchCat && matchPrice && matchRating;
    });
    if (sort === 'Price: Low to High') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'Top Rated') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, category, maxPrice, minRating, sort]);

  const FilterPanel = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Search */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Search</div>
        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #EDE6F8', borderRadius: 10, padding: '10px 14px', gap: 8, background: '#F8F5FF' }}>
          <Search size={15} color="#6B4A8F" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a service..."
            style={{ border: 'none', outline: 'none', fontSize: 14, background: 'transparent', width: '100%', fontFamily: 'var(--font-sans)', color: '#1A1A2E' }} />
        </div>
      </div>

      {/* Categories */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Category</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {categories.map(cat => (
            <label key={cat} onClick={() => setCategory(cat)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                background: category === cat ? '#EDE6F8' : 'transparent',
                transition: 'background 0.2s',
              }}>
              <div style={{
                width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                background: category === cat ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : 'white',
                border: category === cat ? 'none' : '1.5px solid #C4AFDE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {category === cat && <div style={{ width: 8, height: 8, background: 'white', borderRadius: 2 }} />}
              </div>
              <span style={{ fontSize: 14, color: category === cat ? '#3E2A56' : '#6B6B8A', fontWeight: category === cat ? 600 : 400 }}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Max Price</div>
          <span style={{ fontWeight: 700, color: '#3E2A56', fontSize: 14 }}>₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input type="range" min={299} max={2000} step={100} value={maxPrice}
          onChange={e => setMaxPrice(+e.target.value)}
          style={{ width: '100%', accentColor: '#3E2A56', height: 4 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9B8AB0', marginTop: 4 }}>
          <span>₹299</span><span>₹2000</span>
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Min Rating</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[0, 4.5, 4.7, 4.9].map(r => (
            <button key={r} onClick={() => setMinRating(r)}
              style={{
                padding: '6px 14px', borderRadius: 50, fontSize: 13, fontWeight: 600,
                background: minRating === r ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#F8F5FF',
                color: minRating === r ? 'white' : '#6B6B8A',
                border: minRating === r ? 'none' : '1.5px solid #EDE6F8',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              {r === 0 ? 'Any' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button onClick={() => { setSearch(''); setCategory('All'); setMaxPrice(2000); setMinRating(0); }}
        style={{
          border: '1.5px solid #EDE6F8', color: '#9B8AB0', borderRadius: 10, padding: '10px',
          fontWeight: 600, fontSize: 14, width: '100%', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#3E2A56'; e.currentTarget.style.color = '#3E2A56'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#EDE6F8'; e.currentTarget.style.color = '#9B8AB0'; }}>
        Reset Filters
      </button>
    </div>
  );

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Page Hero */}
      <div style={{
        paddingTop: 100, paddingBottom: 48, background: 'linear-gradient(135deg, #3E2A56, #4A3268)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 14px)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="section-label" style={{ background: 'rgba(255,255,255,0.15)', color: '#EDE6F8' }}>✦ All Services</div>
            <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontFamily: 'var(--font-serif)', marginBottom: 12 }}>
              Find the Right Service
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16 }}>
              {services.length} professional home services · Verified · Insured · Guaranteed
            </p>
          </motion.div>
        </div>
      </div>

      <div style={{ background: '#F8F5FF', minHeight: '60vh' }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
          {/* Top bar: sort + mobile filter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ color: '#6B6B8A', fontSize: 15 }}>
              <span style={{ fontWeight: 700, color: '#1A1A2E' }}>{filtered.length}</span> services found
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {/* Sort */}
              <div style={{ position: 'relative' }}>
                <select value={sort} onChange={e => setSort(e.target.value)}
                  style={{
                    appearance: 'none', border: '1.5px solid #EDE6F8', borderRadius: 10,
                    padding: '9px 36px 9px 14px', fontSize: 14, background: 'white',
                    color: '#1A1A2E', fontFamily: 'var(--font-sans)', cursor: 'pointer', outline: 'none',
                  }}>
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B4A8F', pointerEvents: 'none' }} />
              </div>
              {/* Mobile filter button */}
              <button onClick={() => setShowMobileFilters(true)} className="mobile-filter-btn"
                style={{
                  display: 'none', alignItems: 'center', gap: 6,
                  border: '1.5px solid #3E2A56', color: '#3E2A56', borderRadius: 10,
                  padding: '9px 16px', fontWeight: 600, fontSize: 14, background: 'white',
                }}>
                <SlidersHorizontal size={15} /> Filters
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32, alignItems: 'start' }}>
            {/* Sidebar */}
            <div className="filter-sidebar" style={{
              background: 'white', borderRadius: 16, padding: 28,
              boxShadow: '0 4px 20px rgba(62,42,86,0.07)',
              border: '1px solid #F0EAF8',
              position: 'sticky', top: 90,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <Filter size={16} color="#3E2A56" />
                <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>Filters</span>
              </div>
              <FilterPanel />
            </div>

            {/* Services Grid */}
            <div>
              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div key="empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '80px 40px' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                    <h3 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 8 }}>No services found</h3>
                    <p style={{ color: '#9B8AB0', fontSize: 15, marginBottom: 24 }}>Try adjusting your filters or search query</p>
                    <button onClick={() => { setSearch(''); setCategory('All'); setMaxPrice(2000); setMinRating(0); }}
                      style={{
                        background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                        color: 'white', borderRadius: 50, padding: '12px 28px', fontWeight: 700, fontSize: 15,
                      }}>Clear Filters</button>
                  </motion.div>
                ) : (
                  <motion.div key="grid"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                      gap: 20,
                    }}>
                    {filtered.map((svc, i) => (
                      <motion.div key={svc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(62,42,86,0.15)' }}
                        onClick={() => navigate(`/services/${svc.id}`)}
                        style={{
                          background: 'white', borderRadius: 16,
                          boxShadow: '0 4px 16px rgba(62,42,86,0.07)',
                          overflow: 'hidden', cursor: 'pointer',
                          border: '1px solid #F0EAF8',
                        }}>
                        {/* Top accent */}
                        <div style={{ height: 4, background: 'linear-gradient(90deg, #3E2A56, #6B4A8F)' }} />
                        {/* Image */}
                        <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                          <img src={svc.img} alt={svc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                            onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                            onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                          <div style={{ position: 'absolute', top: 10, left: 10, background: '#EDE6F8', borderRadius: 8, padding: '5px 9px', fontSize: 20 }}>{svc.icon}</div>
                          {svc.badge && (
                            <div style={{ position: 'absolute', top: 10, right: 10, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)', color: 'white', borderRadius: 50, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>{svc.badge}</div>
                          )}
                        </div>
                        {/* Content */}
                        <div style={{ padding: '16px 18px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', fontFamily: 'var(--font-sans)' }}>{svc.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#FBBF24', fontSize: 13, fontWeight: 700 }}>
                              <Star size={13} style={{ fill: '#FBBF24' }} /> {svc.rating}
                            </div>
                          </div>
                          <p style={{ color: '#7A7A9A', fontSize: 13, marginBottom: 14 }}>{svc.desc}</p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6B4A8F', fontWeight: 700, fontSize: 15 }}>{svc.priceLabel}</span>
                            <button style={{
                              display: 'flex', alignItems: 'center', gap: 5,
                              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                              color: 'white', borderRadius: 50, padding: '7px 14px', fontSize: 12, fontWeight: 600,
                            }}>
                              Book <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100 }} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0, width: 300,
                background: 'white', zIndex: 1101, padding: 24, overflowY: 'auto',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 18 }}>Filters</span>
                <button onClick={() => setShowMobileFilters(false)}><X size={22} color="#6B6B8A" /></button>
              </div>
              <FilterPanel />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
}
