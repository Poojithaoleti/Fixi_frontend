import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, ChevronDown, ChevronUp, ArrowLeft, Clock, Shield, Phone } from 'lucide-react';
import { getServiceById, services } from '../data/services';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

const reviews = [
  { name: 'Rajesh K.', rating: 5, date: 'Mar 15, 2026', comment: 'Technician was on time, explained everything, and the work is top-notch. Highly recommended!' },
  { name: 'Priya M.', rating: 5, date: 'Mar 12, 2026', comment: 'Professional and thorough. Spotted an issue I didn\'t even know about. Worth every rupee.' },
  { name: 'Arun S.', rating: 4, date: 'Mar 10, 2026', comment: 'Quick booking, fair pricing. Very satisfied overall with the service quality.' },
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id);

  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [showBooking, setShowBooking] = useState(false);

  const faqs = [
    { q: `How long does ${service?.name || 'the service'} take?`, a: `Duration is approximately ${service?.duration || '1-2 hours'} depending on the scope of work.` },
    { q: 'Do I need to be home during the service?', a: 'Yes, the technician needs access. Please ensure someone is present at the scheduled time.' },
    { q: 'What if the technician can\'t fix the problem?', a: 'We\'ll provide a clear diagnosis and quote before any additional work. No surprise charges.' },
    { q: 'Is the service covered under warranty?', a: 'Yes! All FIXI services come with a minimum 15-day service warranty. If the issue recurs, we fix it free.' },
  ];

  if (!service) {
    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
        style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, paddingTop: 80 }}>
        <div style={{ fontSize: 56 }}>🔍</div>
        <h2 style={{ fontSize: 28, color: '#1A1A2E' }}>Service not found</h2>
        <p style={{ color: '#9B8AB0' }}>The service you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/services')} style={{
          background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
          color: 'white', borderRadius: 50, padding: '12px 28px', fontWeight: 700, fontSize: 15,
        }}>Browse All Services</button>
      </motion.div>
    );
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ minHeight: '100vh', background: '#F8F5FF', paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 24, paddingBottom: 64 }}>
          {/* Breadcrumb */}
          <div style={{ color: '#9B8AB0', fontSize: 13, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link to="/" style={{ color: '#9B8AB0' }}>Home</Link>
            <span>›</span>
            <Link to="/services" style={{ color: '#9B8AB0' }}>Services</Link>
            <span>›</span>
            <span style={{ color: '#3E2A56', fontWeight: 600 }}>{service.name}</span>
          </div>

          {/* Back */}
          <button onClick={() => navigate('/services')} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: '#6B4A8F', fontWeight: 600, fontSize: 14, marginBottom: 28,
            background: 'none', border: 'none', cursor: 'pointer',
          }}>
            <ArrowLeft size={16} /> Back to Services
          </button>

          {/* Hero */}
          <div className="service-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', marginBottom: 48 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <span style={{
                background: '#EDE6F8', color: '#6B4A8F', padding: '4px 14px',
                borderRadius: 50, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 16,
              }}>{service.icon} {service.name}</span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1A1A2E', marginBottom: 12 }}>
                {service.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ fill: '#FBBF24', color: '#FBBF24' }} />)}
                </div>
                <span style={{ color: '#4A4A6A', fontSize: 14, fontWeight: 600 }}>{service.rating}</span>
                <span style={{ color: '#9B8AB0', fontSize: 13 }}>({service.reviews.toLocaleString('en-IN')} reviews)</span>
              </div>

              {/* Meta chips */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EDE6F8', borderRadius: 50, padding: '5px 12px', fontSize: 13, color: '#6B4A8F', fontWeight: 600 }}>
                  <Clock size={13} /> {service.duration}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EDE6F8', borderRadius: 50, padding: '5px 12px', fontSize: 13, color: '#6B4A8F', fontWeight: 600 }}>
                  <Shield size={13} /> Insured
                </div>
              </div>

              <div style={{ fontSize: 28, fontWeight: 800, color: '#3E2A56', marginBottom: 20, fontFamily: 'var(--font-sans)' }}>
                {service.priceLabel}
              </div>
              <p style={{ color: '#6B6B8A', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                {service.fullDesc}
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(62,42,86,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBooking(true)}
                  style={{
                    background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                    color: 'white', borderRadius: 50, padding: '14px 32px',
                    fontWeight: 700, fontSize: 16,
                  }}>
                  Book Now →
                </motion.button>
                <a href="tel:+911800FIXINOW" style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  border: '2px solid #3E2A56', color: '#3E2A56', borderRadius: 50,
                  padding: '12px 24px', fontWeight: 600, fontSize: 15,
                }}>
                  <Phone size={16} /> Call Us
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <div style={{ background: '#EDE6F8', borderRadius: 20, overflow: 'hidden', height: 340, boxShadow: '0 12px 40px rgba(62,42,86,0.15)' }}>
                <img src={service.img} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
          </div>

          {/* What's Included */}
          <div style={{ background: 'white', borderRadius: 20, padding: '40px', marginBottom: 32, boxShadow: '0 4px 20px rgba(62,42,86,0.07)' }}>
            <h2 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle size={22} color="#10B981" /> What's Included
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {service.included.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F8F5FF', borderRadius: 10, padding: '12px 16px' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                  <span style={{ color: '#4A4A6A', fontSize: 14 }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 24 }}>Choose Your Plan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="pricing-grid">
              {service.pricing.map((plan, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedPlan(i)}
                  style={{
                    borderRadius: 16, padding: '28px 24px', cursor: 'pointer',
                    background: plan.featured ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : 'white',
                    border: !plan.featured ? `2px solid ${selectedPlan === i ? '#3E2A56' : '#EDE6F8'}` : 'none',
                    boxShadow: plan.featured ? '0 8px 30px rgba(62,42,86,0.3)' : '0 4px 16px rgba(62,42,86,0.08)',
                    transform: plan.featured ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.3s', position: 'relative', textAlign: 'center',
                  }}>
                  {plan.featured && (
                    <div style={{
                      position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                      background: '#FBBF24', color: '#1A1A2E', padding: '3px 14px',
                      borderRadius: 50, fontSize: 11, fontWeight: 800,
                    }}>MOST POPULAR</div>
                  )}
                  <div style={{ fontSize: 18, fontWeight: 700, color: plan.featured ? 'white' : '#1A1A2E', marginBottom: 4 }}>{plan.name}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: plan.featured ? 'white' : '#3E2A56', marginBottom: 16 }}>{plan.price}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        <CheckCircle size={14} style={{ color: plan.featured ? '#EDE6F8' : '#10B981', flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: plan.featured ? 'rgba(255,255,255,0.85)' : '#6B6B8A' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setSelectedPlan(i); setShowBooking(true); }} style={{
                    width: '100%', padding: '11px',
                    background: plan.featured ? 'white' : 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                    color: plan.featured ? '#3E2A56' : 'white',
                    borderRadius: 50, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
                  }}>Select Plan</button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ background: 'white', borderRadius: 20, padding: '40px', marginBottom: 32, boxShadow: '0 4px 20px rgba(62,42,86,0.07)' }}>
            <h2 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 24 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{
                  border: openFaq === i ? '1.5px solid #3E2A56' : '1.5px solid #EDE6F8',
                  borderLeft: openFaq === i ? '4px solid #3E2A56' : '4px solid transparent',
                  borderRadius: 12, overflow: 'hidden', transition: 'all 0.25s',
                  background: openFaq === i ? '#FAFAFA' : 'white',
                }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', padding: '16px 20px',
                      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}>
                    <span style={{ fontWeight: 600, color: '#1A1A2E', fontSize: 15 }}>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={18} color="#3E2A56" /> : <ChevronDown size={18} color="#9B8AB0" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        style={{ padding: '0 20px 16px', color: '#6B6B8A', fontSize: 14, lineHeight: 1.7 }}>
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 24 }}>Customer Reviews</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {reviews.map((rev, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ background: 'white', borderRadius: 14, padding: '20px 24px', boxShadow: '0 2px 12px rgba(62,42,86,0.07)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>{rev.name}</div>
                    <span style={{ color: '#9B8AB0', fontSize: 12 }}>{rev.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                    {[...Array(rev.rating)].map((_, j) => <Star key={j} size={14} style={{ fill: '#FBBF24', color: '#FBBF24' }} />)}
                  </div>
                  <p style={{ color: '#6B6B8A', fontSize: 14, lineHeight: 1.7 }}>{rev.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Related Services */}
          <div>
            <h2 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 24 }}>You May Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {services.filter(s => s.id !== service.id).slice(0, 4).map(s => (
                <motion.div key={s.id} whileHover={{ y: -4 }}
                  onClick={() => navigate(`/services/${s.id}`)}
                  style={{ background: 'white', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 16px rgba(62,42,86,0.07)' }}>
                  <div style={{ height: 110, overflow: 'hidden' }}>
                    <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>{s.icon} {s.name}</div>
                    <div style={{ fontSize: 13, color: '#6B4A8F', fontWeight: 700 }}>{s.priceLabel}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500,
        background: 'white', borderTop: '1px solid #EDE6F8',
        padding: '12px 20px', display: 'flex', gap: 12,
      }} className="mobile-sticky-cta">
        <a href="tel:+911800FIXINOW" style={{
          flex: 1, border: '2px solid #3E2A56', color: '#3E2A56', borderRadius: 50,
          padding: '12px', fontWeight: 700, fontSize: 15, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Phone size={16} /> Call
        </a>
        <button onClick={() => setShowBooking(true)} style={{
          flex: 2, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
          color: 'white', borderRadius: 50, padding: '12px',
          fontWeight: 700, fontSize: 15,
        }}>Book Now</button>
      </div>

      {showBooking && <BookingModal service={service} plan={service.pricing[selectedPlan]} onClose={() => setShowBooking(false)} />}

      <Footer />
    </motion.div>
  );
}
