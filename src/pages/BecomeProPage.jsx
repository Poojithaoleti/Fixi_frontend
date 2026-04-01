import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Wallet, BookOpen, Star, MapPin, ArrowRight, CheckCircle, Shield, Zap, Users, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../components/Footer';

const benefits = [
  { icon: <Clock size={28} />, title: 'Flexible Hours', desc: 'Work when you want. Set your own schedule and take jobs that fit your life — full-time or part-time.' },
  { icon: <Wallet size={28} />, title: 'Weekly Payouts', desc: 'Get paid every week directly to your bank account. No delays, no hassle, no middlemen.' },
  { icon: <BookOpen size={28} />, title: 'Free Training', desc: 'Access skill workshops and certification programs at zero cost to upgrade your expertise.' },
  { icon: <Shield size={28} />, title: 'Insurance Coverage', desc: 'Every job is covered under FIXI\'s pro protection plan. Work with complete peace of mind.' },
  { icon: <Zap size={28} />, title: 'Instant Job Leads', desc: 'Get matched with customers near you in real-time. No cold calling, no hunting for work.' },
  { icon: <Users size={28} />, title: 'Pro Community', desc: 'Join a network of 500+ verified pros. Share tips, get support, and grow together.' },
];

const steps = [
  { n: '01', title: 'Apply Online', desc: 'Fill a quick form with your skills, experience, and service areas. Takes under 5 minutes.' },
  { n: '02', title: 'Background Check', desc: 'We verify your identity and conduct a police background check — usually done in 24–48 hours.' },
  { n: '03', title: 'Skill Assessment', desc: 'Complete a short practical test or upload your certifications to prove your expertise.' },
  { n: '04', title: 'Start Earning', desc: 'Profile live! Start receiving job requests in your area and build your FIXI reputation.' },
];

const testimonials = [
  { name: 'Ramesh K.', city: 'Hyderabad', quote: 'I doubled my income within 3 months. FIXI connects me with great clients every day.', rating: 5 },
  { name: 'Priya S.', city: 'Bangalore', quote: 'The weekly payout system is a game changer. I never stress about money anymore.', rating: 5 },
  { name: 'Arjun M.', city: 'Chennai', quote: 'The training programs helped me expand my skills and charge more for my services.', rating: 5 },
];

const faqs = [
  { q: 'Is there a registration fee?', a: 'No. Registering as a FIXI Pro is completely free. We only take a small platform commission when you complete a job.' },
  { q: 'What services can I offer?', a: 'Any of our 50+ service categories — AC repair, plumbing, electrical, cleaning, carpentry, painting, pest control, and more.' },
  { q: 'How does payment work?', a: 'Customers pay FIXI directly. We transfer your earnings every Monday for the previous week\'s completed jobs.' },
  { q: 'What if a customer disputes the work?', a: 'Our support team mediates all disputes fairly. Your reputation and earnings are protected throughout the process.' },
];

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function BecomeProPage() {
  const navigate = useNavigate();
  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [openFaq, setOpenFaq] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const avgRatePerHour = 350;
  const estimated = Math.round(hoursPerDay * daysPerWeek * 4.3 * avgRatePerHour);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #3E2A56 0%, #4A3268 60%, #2A1B3D 100%)',
        minHeight: '80vh', paddingTop: 70, position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: [200, 150, 100, 180, 120, 90, 160, 130][i],
              height: [200, 150, 100, 180, 120, 90, 160, 130][i],
              borderRadius: '50%',
              border: '1px solid rgba(107,74,143,0.3)',
              left: `${[10, 70, 85, 30, 55, 75, 5, 45][i]}%`,
              top: `${[-20, -30, 30, 70, -10, 60, 50, 80][i]}%`,
            }} />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
          <div className="pro-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.15)', color: '#EDE6F8',
                padding: '6px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600, marginBottom: 20,
              }}>✦ Join 500+ Pros</div>
              <h1 style={{
                color: 'white', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontFamily: 'var(--font-serif)', lineHeight: 1.1, marginBottom: 16,
              }}>
                Earn on Your<br /><em>Own Terms</em>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
                Join FIXI's growing network of skilled professionals and start earning more with complete flexibility and weekly payments.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'white', color: '#3E2A56', borderRadius: 50,
                    padding: '14px 28px', fontWeight: 700, fontSize: 15,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                  Register as Pro <ArrowRight size={16} />
                </motion.button>
                <button style={{
                  border: '2px solid rgba(255,255,255,0.5)', color: 'white', borderRadius: 50,
                  padding: '12px 28px', fontWeight: 600, fontSize: 15, background: 'transparent',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  Learn More
                </button>
              </div>
              {/* Quick stats */}
              <div style={{ display: 'flex', gap: 28, marginTop: 40, flexWrap: 'wrap' }}>
                {[['₹35,000+', 'Avg Monthly Earnings'], ['4.8★', 'Pro Satisfaction'], ['48h', 'Avg Onboarding']].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ color: 'white', fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-sans)' }}>{val}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Earnings Calculator */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div style={{
                background: 'white', borderRadius: 20, padding: 32,
                boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 24 }}>
                  💰 Earnings Calculator
                </h3>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: 14, color: '#6B6B8A', fontWeight: 500 }}>Hours per day</label>
                    <span style={{ fontWeight: 700, color: '#3E2A56', fontSize: 15 }}>{hoursPerDay}h</span>
                  </div>
                  <input type="range" min={2} max={12} value={hoursPerDay}
                    onChange={e => setHoursPerDay(+e.target.value)}
                    style={{ width: '100%', accentColor: '#3E2A56' }} />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: 14, color: '#6B6B8A', fontWeight: 500 }}>Days per week</label>
                    <span style={{ fontWeight: 700, color: '#3E2A56', fontSize: 15 }}>{daysPerWeek} days</span>
                  </div>
                  <input type="range" min={1} max={7} value={daysPerWeek}
                    onChange={e => setDaysPerWeek(+e.target.value)}
                    style={{ width: '100%', accentColor: '#3E2A56' }} />
                </div>
                <div style={{ background: '#EDE6F8', borderRadius: 14, padding: '20px 24px', textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: 13, color: '#6B4A8F', fontWeight: 600, marginBottom: 4 }}>ESTIMATED MONTHLY</div>
                  <motion.div key={estimated} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                    style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#3E2A56', lineHeight: 1 }}>
                    ₹{estimated.toLocaleString('en-IN')}
                  </motion.div>
                  <div style={{ fontSize: 13, color: '#9B8AB0', marginTop: 6 }}>Based on ₹350/hr avg rate</div>
                </div>
                <button style={{
                  width: '100%', background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                  color: 'white', borderRadius: 50, padding: '13px', fontWeight: 700, fontSize: 15,
                }}>Start Earning Today</button>
              </div>
            </motion.div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 60L720 20L1440 60V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>✦ Benefits</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1A1A2E' }}>Why Pros Love FIXI</motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {benefits.map((b, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                style={{
                  background: 'white', borderRadius: 16, padding: '28px 24px',
                  boxShadow: '0 4px 20px rgba(62,42,86,0.08)',
                  border: '1px solid #F0EAF8', borderTop: '4px solid #3E2A56',
                }}>
                <div style={{
                  width: 56, height: 56, background: '#EDE6F8', borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#3E2A56', marginBottom: 18,
                }}>{b.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>{b.title}</h3>
                <p style={{ color: '#6B6B8A', fontSize: 14, lineHeight: 1.7 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 0', background: '#F8F5FF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>✦ Process</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1A1A2E' }}>How to Join FIXI</motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 44, left: '12.5%', right: '12.5%', height: 2,
              background: 'linear-gradient(90deg, #3E2A56, #6B4A8F)', opacity: 0.2,
            }} className="connector-line" />
            {steps.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                <motion.div whileHover={{ scale: 1.08 }}
                  style={{
                    width: 88, height: 88, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(62,42,86,0.3)',
                    position: 'relative',
                  }}>
                  <div style={{
                    width: 72, height: 72, background: '#EDE6F8', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 800, color: '#3E2A56', fontFamily: 'var(--font-sans)',
                  }}>{step.n}</div>
                </motion.div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: '#6B6B8A', fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>✦ Pro Stories</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1A1A2E' }}>What Our Pros Say</motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ background: '#F8F5FF', borderRadius: 16, padding: '28px', boxShadow: '0 4px 16px rgba(62,42,86,0.08)' }}>
                <div style={{ fontSize: 32, color: '#3E2A56', lineHeight: 1, marginBottom: 14 }}>"</div>
                <p style={{ color: '#4A4A6A', fontSize: 14, lineHeight: 1.8, marginBottom: 16, fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} style={{ fill: '#FBBF24', color: '#FBBF24' }} />)}
                </div>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14 }}>{t.name}</div>
                <div style={{ color: '#9B8AB0', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={12} />{t.city}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 0', background: '#F8F5FF' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>✦ FAQ</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1A1A2E' }}>Common Questions</motion.h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 14,
                border: openFaq === i ? '1.5px solid #3E2A56' : '1.5px solid #EDE6F8',
                borderLeft: openFaq === i ? '4px solid #3E2A56' : '4px solid transparent',
                overflow: 'hidden', transition: 'all 0.25s',
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
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
      </section>

      {/* CTA Banner + Application Form */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)' }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="section-label" style={{ background: 'rgba(255,255,255,0.15)', color: '#EDE6F8' }}>✦ Apply Now</div>
            <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: 12 }}>
              Ready to Start Earning?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 36 }}>
              Join thousands of professionals already earning with FIXI. Get started in minutes.
            </p>

            {formSent ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                style={{ background: 'white', borderRadius: 20, padding: '32px', textAlign: 'center' }}>
                <CheckCircle size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 8 }}>Application Submitted!</h3>
                <p style={{ color: '#6B6B8A', fontSize: 15 }}>Our team will review your profile and reach out within 48 hours.</p>
              </motion.div>
            ) : (
              <div style={{ background: 'white', borderRadius: 20, padding: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
                  {[
                    { label: 'Full Name', placeholder: 'Your full name', type: 'text' },
                    { label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                    { label: 'City', placeholder: 'Your city', type: 'text' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        style={{
                          width: '100%', padding: '12px 16px', border: '1.5px solid #EDE6F8',
                          borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)', color: '#1A1A2E',
                        }}
                        onFocus={e => e.target.style.borderColor = '#3E2A56'}
                        onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 6 }}>Your Skill</label>
                    <select style={{
                      width: '100%', padding: '12px 16px', border: '1.5px solid #EDE6F8',
                      borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)',
                      color: '#1A1A2E', background: 'white',
                    }}
                      onFocus={e => e.target.style.borderColor = '#3E2A56'}
                      onBlur={e => e.target.style.borderColor = '#EDE6F8'}>
                      <option value="">Select your primary skill...</option>
                      {['AC Technician', 'Plumber', 'Electrician', 'Cleaner', 'Carpenter', 'Painter', 'Pest Control', 'Appliance Repair'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(62,42,86,0.35)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setFormSent(true); setTimeout(() => navigate('/pro/register'), 1500); }}
                    style={{
                      background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                      color: 'white', borderRadius: 50, padding: '14px', fontWeight: 700, fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}>
                    Submit Application <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
