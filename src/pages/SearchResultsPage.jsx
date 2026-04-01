import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, ArrowRight, SlidersHorizontal, Clock, Shield, ChevronDown } from 'lucide-react';
import { services } from '../data/services';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

const sortOptions = ['Most Relevant', 'Top Rated', 'Price: Low to High', 'Price: High to Low'];

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('loc') || 'Hyderabad';

  const [sort, setSort] = useState('Most Relevant');
  const [inputQ, setInputQ] = useState(query);
  const [inputLoc, setInputLoc] = useState(location);
  const [bookingService, setBookingService] = useState(null);

  const results = useMemo(() => {
    let r = services.filter(s => {
      if (!query) return true;
      return (
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.desc.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
      );
    });
    if (sort === 'Top Rated') r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === 'Price: Low to High') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [query, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: inputQ, loc: inputLoc });
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Search bar header */}
      <div style={{
        paddingTop: 80, background: 'white',
        borderBottom: '1px solid #EDE6F8',
      }}>
        <div className="container" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <form onSubmit={handleSearch} style={{
            display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 10, border: '1.5px solid #EDE6F8', borderRadius: 50, padding: '10px 20px', background: '#F8F5FF' }}>
              <Search size={17} color="#6B4A8F" style={{ flexShrink: 0 }} />
              <input value={inputQ} onChange={e => setInputQ(e.target.value)} placeholder="Search services..."
                style={{ border: 'none', outline: 'none', fontSize: 15, background: 'transparent', width: '100%', fontFamily: 'var(--font-sans)', color: '#1A1A2E' }} />
            </div>
            <div style={{ flex: 1, minWidth: 160, display: 'flex', alignItems: 'center', gap: 10, border: '1.5px solid #EDE6F8', borderRadius: 50, padding: '10px 20px', background: '#F8F5FF' }}>
              <MapPin size={17} color="#6B4A8F" style={{ flexShrink: 0 }} />
              <input value={inputLoc} onChange={e => setInputLoc(e.target.value)} placeholder="Location"
                style={{ border: 'none', outline: 'none', fontSize: 15, background: 'transparent', width: '100%', fontFamily: 'var(--font-sans)', color: '#1A1A2E' }} />
            </div>
            <button type="submit" style={{
              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
              color: 'white', borderRadius: 50, padding: '12px 28px',
              fontWeight: 700, fontSize: 15, flexShrink: 0,
            }}>Search</button>
          </form>
        </div>
      </div>

      <div style={{ background: '#F8F5FF', minHeight: '70vh' }}>
        <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
          {/* Results header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>
                <span style={{ color: '#3E2A56' }}>{results.length} results</span>
                {query && <> for <em>"{query}"</em></>}
                {location && <span style={{ color: '#9B8AB0', fontSize: '0.75em' }}> in {location}</span>}
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
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
            </div>
          </div>

          {results.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', padding: '80px 40px', background: 'white', borderRadius: 20 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
              <h2 style={{ fontSize: 24, color: '#1A1A2E', marginBottom: 8 }}>No results found</h2>
              <p style={{ color: '#9B8AB0', fontSize: 15, marginBottom: 28 }}>
                We couldn't find services matching "{query}". Try a different search or browse all services.
              </p>
              <button onClick={() => navigate('/services')} style={{
                background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                color: 'white', borderRadius: 50, padding: '13px 32px', fontWeight: 700, fontSize: 15,
              }}>Browse All Services</button>
            </motion.div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {results.map((svc, i) => (
                <motion.div key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(62,42,86,0.14)' }}
                  style={{
                    background: 'white', borderRadius: 16,
                    boxShadow: '0 4px 16px rgba(62,42,86,0.07)',
                    border: '1px solid #F0EAF8',
                    display: 'flex', overflow: 'hidden', cursor: 'pointer',
                    transition: 'box-shadow 0.3s',
                  }}
                  onClick={() => navigate(`/services/${svc.id}`)}>

                  {/* Image */}
                  <div style={{ width: 160, flexShrink: 0, overflow: 'hidden', position: 'relative' }} className="result-img">
                    <img src={svc.img} alt={svc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.1))',
                    }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                    {/* Left */}
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <div style={{ background: '#EDE6F8', borderRadius: 8, padding: '4px 8px', fontSize: 18 }}>{svc.icon}</div>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1A1A2E', fontFamily: 'var(--font-sans)' }}>{svc.name}</h3>
                        {svc.badge && (
                          <span style={{ background: '#10B981', color: 'white', borderRadius: 50, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>{svc.badge}</span>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: 4, marginBottom: 8, alignItems: 'center' }}>
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={13} style={{ fill: j < Math.floor(svc.rating) ? '#FBBF24' : '#EDE6F8', color: j < Math.floor(svc.rating) ? '#FBBF24' : '#EDE6F8' }} />
                        ))}
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#4A4A6A', marginLeft: 4 }}>{svc.rating}</span>
                        <span style={{ fontSize: 12, color: '#9B8AB0' }}>({svc.reviews.toLocaleString('en-IN')})</span>
                      </div>

                      <p style={{ color: '#7A7A9A', fontSize: 13, marginBottom: 10 }}>{svc.desc}</p>

                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9B8AB0', fontSize: 12 }}>
                          <Clock size={12} /> {svc.duration}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9B8AB0', fontSize: 12 }}>
                          <MapPin size={12} /> {location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#10B981', fontSize: 12, fontWeight: 600 }}>
                          <Shield size={12} /> Insured
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, flexShrink: 0 }}>
                      <div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#3E2A56', textAlign: 'right' }}>{svc.priceLabel}</div>
                        <div style={{ fontSize: 12, color: '#9B8AB0', textAlign: 'right' }}>per visit</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={e => { e.stopPropagation(); setBookingService(svc); }}
                        style={{
                          background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                          color: 'white', borderRadius: 50, padding: '11px 22px',
                          fontWeight: 700, fontSize: 14,
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                        Book Now <ArrowRight size={14} />
                      </motion.button>
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/services/${svc.id}`); }}
                        style={{ color: '#6B4A8F', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                        View Details →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No results suggestion */}
          {results.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ marginTop: 40, background: '#EDE6F8', borderRadius: 16, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16, marginBottom: 4 }}>Can't find what you need?</div>
                <div style={{ color: '#6B6B8A', fontSize: 14 }}>Browse our full service catalogue or call us directly.</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => navigate('/services')} style={{
                  border: '2px solid #3E2A56', color: '#3E2A56', borderRadius: 50,
                  padding: '10px 22px', fontWeight: 600, fontSize: 14, background: 'white',
                }}>All Services</button>
                <a href="tel:+911800FIXINOW" style={{
                  background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                  color: 'white', borderRadius: 50, padding: '10px 22px', fontWeight: 600, fontSize: 14,
                }}>Call Us</a>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {bookingService && (
        <BookingModal service={bookingService} plan={bookingService.pricing[1]} onClose={() => setBookingService(null)} />
      )}

      <Footer />
    </motion.div>
  );
}
