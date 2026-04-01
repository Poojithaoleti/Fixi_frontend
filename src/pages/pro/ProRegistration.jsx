import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wrench, CheckCircle, Upload, ArrowRight, ArrowLeft } from 'lucide-react';

const steps = ['Personal Info', 'Skills & Docs', 'Review'];

const serviceCategories = [
  'AC Technician', 'Plumber', 'Electrician', 'Cleaner',
  'Carpenter', 'Painter', 'Pest Control', 'Appliance Repair',
  'CCTV Installation', 'Solar Panel',
];

const cities = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];

const inp = {
  width: '100%', padding: '11px 14px', border: '1.5px solid #EDE6F8',
  borderRadius: 10, fontSize: 14, outline: 'none',
  fontFamily: 'var(--font-sans)', color: '#1A1A2E', boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

export default function ProRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleCat = (c) => setSelected(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  const Label = ({ children }) => (
    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4A4A6A', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {children}
    </label>
  );

  const Field = ({ label, placeholder, type = 'text' }) => (
    <div>
      <Label>{label}</Label>
      <input type={type} placeholder={placeholder} style={inp}
        onFocus={e => e.target.style.borderColor = '#3E2A56'}
        onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8F5FF 0%, #EDE6F8 100%)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '36px 24px' }}>
      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-8%', right: '-4%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,74,143,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-8%', left: '-4%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(62,42,86,0.08), transparent 70%)' }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ background: 'white', borderRadius: 24, padding: '36px', width: '100%', maxWidth: 560, boxShadow: '0 24px 64px rgba(62,42,86,0.14)', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', borderRadius: 10, padding: '6px 14px', marginBottom: 16 }}>
            <Wrench size={15} color="white" />
            <span style={{ color: 'white', fontWeight: 800, fontSize: 17, fontFamily: 'var(--font-sans)' }}>FIXI</span>
            <span style={{ background: 'rgba(251,191,36,0.25)', color: '#FBBF24', fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 50 }}>PRO</span>
          </div>
          <h1 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 4 }}>Join as a Pro</h1>
          <p style={{ color: '#9B8AB0', fontSize: 14 }}>Start earning with FIXI in 3 easy steps</p>
        </div>

        {/* Step progress */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <motion.div animate={{ background: i < step ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : i === step ? 'white' : '#F0EAF8', borderColor: i <= step ? '#3E2A56' : '#EDE6F8' }}
                  style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid', transition: 'all 0.3s' }}>
                  {i < step
                    ? <CheckCircle size={16} color="white" />
                    : <span style={{ fontSize: 12, fontWeight: 700, color: i === step ? '#3E2A56' : '#C4AFDE' }}>{i + 1}</span>
                  }
                </motion.div>
                <span style={{ fontSize: 11, color: i <= step ? '#3E2A56' : '#9B8AB0', fontWeight: i === step ? 600 : 400, whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < step ? 'linear-gradient(90deg,#3E2A56,#6B4A8F)' : '#EDE6F8', margin: '0 8px', marginBottom: 20, transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-end' }}>
                {/* Photo upload circle */}
                <div style={{ flexShrink: 0 }}>
                  <Label>Photo</Label>
                  <div style={{ width: 76, height: 76, borderRadius: '50%', border: '2px dashed #6B4A8F', background: '#F8F5FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 4 }}>
                    <Upload size={18} color="#6B4A8F" />
                    <span style={{ fontSize: 10, color: '#9B8AB0', textAlign: 'center', lineHeight: 1.2 }}>Upload</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <Field label="Full Name" placeholder="Ravi Kumar" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <Field label="Phone Number" placeholder="+91 98765 43210" type="tel" />
                <Field label="Email Address" placeholder="ravi@email.com" type="email" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <Label>City</Label>
                  <select style={{ ...inp }}
                    onFocus={e => e.target.style.borderColor = '#3E2A56'}
                    onBlur={e => e.target.style.borderColor = '#EDE6F8'}>
                    <option value="">Select city...</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <select style={{ ...inp }}
                    onFocus={e => e.target.style.borderColor = '#3E2A56'}
                    onBlur={e => e.target.style.borderColor = '#EDE6F8'}>
                    {['Less than 1 year', '1–2 years', '3–5 years', '5–10 years', '10+ years'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <Label>Primary Skills</Label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {serviceCategories.map(c => (
                    <button key={c} onClick={() => toggleCat(c)} style={{
                      padding: '7px 14px', borderRadius: 50, fontSize: 13, cursor: 'pointer',
                      background: selected.includes(c) ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : '#F8F5FF',
                      color: selected.includes(c) ? 'white' : '#6B6B8A',
                      border: selected.includes(c) ? 'none' : '1.5px solid #EDE6F8',
                      fontFamily: 'var(--font-sans)', transition: 'all 0.2s',
                    }}>{c}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 1: Skills & Docs */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Aadhaar Card / Govt. ID', sub: 'Required for identity verification' },
                  { label: 'Skill Certificate (if any)', sub: 'ITI, NSDC, or relevant certification' },
                  { label: 'Recent Selfie', sub: 'Clear face photo for profile' },
                ].map((doc, i) => (
                  <div key={i} style={{ border: '1.5px dashed #C4AFDE', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8F5FF', cursor: 'pointer' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 3 }}>{doc.label}</div>
                      <div style={{ fontSize: 12, color: '#9B8AB0' }}>{doc.sub}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE6F8', borderRadius: 8, padding: '8px 14px' }}>
                      <Upload size={15} color="#6B4A8F" />
                      <span style={{ fontSize: 13, color: '#6B4A8F', fontWeight: 600 }}>Upload</span>
                    </div>
                  </div>
                ))}

                <div>
                  <Label>Bank Account Number</Label>
                  <input type="text" placeholder="Account number for weekly payouts" style={inp}
                    onFocus={e => e.target.style.borderColor = '#3E2A56'}
                    onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="IFSC Code" placeholder="HDFC0001234" />
                  <Field label="UPI ID (optional)" placeholder="ravi@okaxis" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Review */}
          {step === 2 && !submitted && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div style={{ background: '#F8F5FF', borderRadius: 16, padding: '20px', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22, fontWeight: 700 }}>R</div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A2E' }}>Ravi Kumar</div>
                    <div style={{ fontSize: 13, color: '#9B8AB0' }}>Hyderabad · 3–5 years exp.</div>
                  </div>
                </div>
                {[['Skills', selected.length > 0 ? selected.slice(0, 3).join(', ') + (selected.length > 3 ? ` +${selected.length - 3}` : '') : 'None selected'], ['Documents', '3 uploaded'], ['Bank', '••••••7842 (HDFC)']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #EDE6F8' }}>
                    <span style={{ color: '#9B8AB0', fontSize: 13 }}>{k}</span>
                    <span style={{ color: '#1A1A2E', fontWeight: 600, fontSize: 13 }}>{v}</span>
                  </div>
                ))}
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
                <div onClick={() => setAgreed(!agreed)} style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${agreed ? '#3E2A56' : '#C4AFDE'}`, background: agreed ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {agreed && <CheckCircle size={11} color="white" />}
                </div>
                <span style={{ fontSize: 13, color: '#6B6B8A', lineHeight: 1.6 }}>
                  I agree to FIXI's <span style={{ color: '#6B4A8F', fontWeight: 600 }}>Pro Terms of Service</span> and confirm all uploaded documents are genuine.
                </span>
              </label>
            </motion.div>
          )}

          {/* Success */}
          {submitted && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '20px 0' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#10B981,#059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 12px 32px rgba(16,185,129,0.3)' }}>
                <CheckCircle size={40} color="white" />
              </motion.div>
              <h2 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 8 }}>Application Submitted!</h2>
              <p style={{ color: '#9B8AB0', fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>Our team will review your profile and reach out within <strong style={{ color: '#3E2A56' }}>48 hours</strong>. Get ready to start earning!</p>
              <button onClick={() => navigate('/pro/dashboard')} style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '13px 28px', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto' }}>
                Go to Pro Dashboard <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer buttons */}
        {!submitted && (
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, border: '1.5px solid #EDE6F8', color: '#9B8AB0', borderRadius: 50, padding: '13px', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'white', cursor: 'pointer' }}>
                <ArrowLeft size={15} /> Back
              </button>
            )}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (step < steps.length - 1) setStep(s => s + 1);
                else if (agreed) setSubmitted(true);
              }}
              style={{ flex: step === 0 ? 1 : 2, background: (step === 2 && !agreed) ? '#E5E5E5' : 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: (step === 2 && !agreed) ? '#AAAAAA' : 'white', borderRadius: 50, padding: '13px', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: (step === 2 && !agreed) ? 'not-allowed' : 'pointer' }}>
              {step < steps.length - 1 ? <><span>Continue</span> <ArrowRight size={15} /></> : 'Submit Application'}
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
