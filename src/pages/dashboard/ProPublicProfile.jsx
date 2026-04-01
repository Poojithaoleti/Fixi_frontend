import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Shield, CheckCircle, MapPin, Clock, Wrench, ArrowLeft } from 'lucide-react';

const skills = ['AC Repair', 'AC Installation', 'HVAC Service', 'Duct Cleaning', 'Refrigerant Refill', 'Split AC Setup'];
const reviews = [
  { name: 'Arjun K.', rating: 5, date: 'Mar 15, 2026', comment: 'Ravi was punctual, professional, and explained everything clearly. AC is working perfectly!' },
  { name: 'Priya M.', rating: 5, date: 'Mar 2, 2026', comment: 'Excellent service. He spotted an electrical issue I wasn\'t even aware of. Very thorough!' },
  { name: 'Sneha R.', rating: 4, date: 'Feb 20, 2026', comment: 'Good service overall. Was slightly delayed but called ahead to inform. Work quality was great.' },
];
const certs = [
  { icon: '🪪', label: 'ID Verified', sub: 'Govt. ID checked' },
  { icon: '🚔', label: 'Police Verified', sub: 'Background clear' },
  { icon: '🏅', label: 'FIXI Certified', sub: 'Top-rated pro' },
];

export default function ProPublicProfile() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#F8F5FF', paddingBottom: 80 }}>

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #3E2A56, #2A1B3D)',
        paddingTop: 80, paddingBottom: 60, position: 'relative', overflow: 'hidden',
      }}>
        {/* Pattern overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(60deg, rgba(107,74,143,0.08) 0px, rgba(107,74,143,0.08) 1px, transparent 1px, transparent 30px)', backgroundSize: '40px 40px' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', position: 'relative', textAlign: 'center' }}>
          {/* Back */}
          <button onClick={() => navigate('/')}
            style={{ position: 'absolute', top: 0, left: 24, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back
          </button>

          {/* Avatar */}
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6B4A8F, #9B7EC8)',
            border: '4px solid white', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, color: 'white', fontSize: 36,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>R</div>

          <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: 6 }}>Ravi Kumar</h1>
          <div style={{ color: '#EDE6F8', fontSize: 14, marginBottom: 6 }}>AC & HVAC Specialist</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <MapPin size={13} /> Hyderabad, Telangana
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ maxWidth: 760, margin: '-28px auto 0', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
          {[
            { val: '4.8★', label: 'Rating', color: '#F59E0B' },
            { val: '320', label: 'Jobs Done', color: '#3E2A56' },
            { val: '3 Yrs', label: 'Experience', color: '#3E2A56' },
            { val: '~10 min', label: 'Response', color: '#3E2A56' },
          ].map(({ val, label, color }) => (
            <div key={label} style={{
              background: 'white', borderRadius: 12, padding: '14px 12px', textAlign: 'center',
              boxShadow: '0 4px 16px rgba(62,42,86,0.1)', border: '1px solid #F0ECFD',
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color, marginBottom: 2 }}>{val}</div>
              <div style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', marginBottom: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD' }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)', marginBottom: 14 }}>Skills & Expertise</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {skills.map(s => (
              <span key={s} style={{ background: '#EDE6F8', color: '#3E2A56', padding: '6px 14px', borderRadius: 50, fontSize: 13, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* About */}
        <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', marginBottom: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD' }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)', marginBottom: 12 }}>About Ravi</h3>
          <p style={{ fontSize: 14, color: '#4A4A6A', lineHeight: 1.7 }}>
            With 3+ years of experience as a certified HVAC technician, Ravi specialises in split AC systems, ducted units, and refrigerant management. Known for his punctuality, clean work, and clear communication, he's one of FIXI's top-rated professionals in Hyderabad.
          </p>
        </div>

        {/* Certifications */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
          {certs.map(({ icon, label, sub }) => (
            <div key={label} style={{
              background: 'white', borderRadius: 14, padding: '16px', textAlign: 'center',
              boxShadow: '0 2px 12px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 11, color: '#9B8AB0' }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', marginBottom: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD' }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)', marginBottom: 18 }}>Customer Reviews</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{ borderBottom: i < reviews.length - 1 ? '1px solid #F8F5FF' : 'none', paddingBottom: i < reviews.length - 1 ? 16 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{r.name}</div>
                    <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={12} style={{ fill: j < r.rating ? '#FBBF24' : '#EDE6F8', color: j < r.rating ? '#FBBF24' : '#EDE6F8' }} />)}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: '#B0A0C8' }}>{r.date}</div>
                </div>
                <p style={{ fontSize: 13, color: '#4A4A6A', lineHeight: 1.6 }}>{r.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: 'white', borderTop: '1px solid #EDE6F8', padding: '14px 24px',
        boxShadow: '0 -8px 24px rgba(62,42,86,0.12)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <motion.button
            onClick={() => navigate('/booking/flow')}
            whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(62,42,86,0.4)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', padding: '15px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
              color: 'white', fontWeight: 700, fontSize: 16,
              fontFamily: 'var(--font-sans)', cursor: 'pointer',
            }}>
            Book Ravi Kumar →
          </motion.button>
        </div>
      </div>
    </div>
  );
}
