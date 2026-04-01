import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Upload, X, ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Zap } from 'lucide-react';

const steps = ['Service', 'Problem', 'Schedule', 'Confirm'];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
const urgencies = ['Flexible (3–5 days)', 'This Week', 'Tomorrow', 'Today — Urgent'];

function StepProgress({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 36, gap: 0 }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <motion.div
              animate={{
                background: i < current ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : i === current ? 'white' : '#EDE6F8',
                scale: i === current ? 1.1 : 1,
              }}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: i === current ? '2.5px solid #3E2A56' : i < current ? 'none' : '2px solid #D6C8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: i === current ? '0 0 0 4px rgba(62,42,86,0.12)' : 'none',
              }}>
              {i < current
                ? <CheckCircle size={16} color="white" />
                : <span style={{ fontSize: 13, fontWeight: 700, color: i === current ? '#3E2A56' : '#B0A0C8' }}>{i + 1}</span>
              }
            </motion.div>
            <span style={{ fontSize: 11, fontWeight: i === current ? 700 : 500, color: i === current ? '#3E2A56' : '#B0A0C8', whiteSpace: 'nowrap' }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              width: 60, height: 2, margin: '0 4px', marginTop: -16,
              background: i < current ? 'linear-gradient(90deg, #3E2A56, #6B4A8F)' : '#EDE6F8',
              transition: 'background 0.4s',
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [urgency, setUrgency] = useState(1);
  const [slot, setSlot] = useState('10:00 AM');
  const [uploads, setUploads] = useState(['photo1.jpg', 'photo2.jpg']);

  return (
    <div style={{ minHeight: '100vh', background: '#F8F5FF', paddingTop: 90, paddingBottom: 60 }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>

        {/* Back */}
        <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B4A8F', fontWeight: 600, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24 }}>
          <ArrowLeft size={16} /> {step === 0 ? 'Back to Service' : 'Previous Step'}
        </button>

        <StepProgress current={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'white', borderRadius: 20, padding: '32px',
              boxShadow: '0 4px 24px rgba(62,42,86,0.08)', border: '1px solid #F0ECFD',
            }}>

            {step === 1 && (
              <div>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ background: '#EDE6F8', color: '#6B4A8F', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 50, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 2 of 4</span>
                </div>
                <h2 style={{ fontSize: '1.4rem', color: '#1A1A2E', marginBottom: 6, marginTop: 12 }}>Tell us about the issue</h2>
                <p style={{ color: '#9B8AB0', fontSize: 14, marginBottom: 24 }}>The more detail you give, the better we can match you with the right pro.</p>

                {/* Textarea */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', display: 'block', marginBottom: 8 }}>Describe the Problem</label>
                  <textarea
                    placeholder="E.g. My AC is not cooling properly. It's a 1.5 ton split AC (LG). The issue started 2 days ago..."
                    rows={4}
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #EDE6F8',
                      outline: 'none', fontSize: 14, fontFamily: 'var(--font-sans)', color: '#1A1A2E',
                      resize: 'vertical', lineHeight: 1.6, boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = '#3E2A56'}
                    onBlur={e => e.target.style.borderColor = '#EDE6F8'}
                  />
                </div>

                {/* Photo Upload */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', display: 'block', marginBottom: 8 }}>Attach Photos (Optional)</label>
                  <div style={{
                    border: '2px dashed #D6C8F0', borderRadius: 12, padding: '20px',
                    background: '#F8F5FF', cursor: 'pointer', textAlign: 'center', marginBottom: 12,
                  }}>
                    <Upload size={24} color="#6B4A8F" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontSize: 13, color: '#9B8AB0' }}>Drag & drop or <span style={{ color: '#6B4A8F', fontWeight: 600 }}>browse files</span></div>
                    <div style={{ fontSize: 11, color: '#B0A0C8', marginTop: 4 }}>PNG, JPG up to 5MB each</div>
                  </div>
                  {uploads.length > 0 && (
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {uploads.map((f, i) => (
                        <div key={i} style={{
                          background: '#EDE6F8', borderRadius: 8, padding: '6px 12px',
                          display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#3E2A56',
                        }}>
                          📷 {f}
                          <button onClick={() => setUploads(u => u.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B8AB0', padding: 0, display: 'flex' }}>
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Urgency */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', display: 'block', marginBottom: 10 }}>When do you need this done?</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {urgencies.map((u, i) => (
                      <motion.button
                        key={u}
                        onClick={() => setUrgency(i)}
                        whileHover={{ y: -1 }}
                        style={{
                          padding: '9px 14px', borderRadius: 50, fontSize: 13, fontWeight: 600,
                          cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                          background: urgency === i ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : 'white',
                          color: urgency === i ? 'white' : '#4A4A6A',
                          boxShadow: urgency === i ? '0 4px 12px rgba(62,42,86,0.3)' : '0 0 0 1.5px #EDE6F8',
                          fontFamily: 'var(--font-sans)',
                        }}>
                        {u === 'Today — Urgent' ? <><Zap size={12} style={{ display: 'inline', marginRight: 4 }} />{u}</> : u}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ background: '#EDE6F8', color: '#6B4A8F', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 50, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 3 of 4</span>
                </div>
                <h2 style={{ fontSize: '1.4rem', color: '#1A1A2E', marginBottom: 6, marginTop: 12 }}>Choose Date & Time</h2>
                <p style={{ color: '#9B8AB0', fontSize: 14, marginBottom: 24 }}>Select a slot that works for you.</p>

                {/* Mini Calendar */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', display: 'block', marginBottom: 10 }}>Select Date</label>
                  <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                    {['Mon\n31', 'Tue\n1', 'Wed\n2', 'Thu\n3', 'Fri\n4', 'Sat\n5', 'Sun\n6'].map((d, i) => {
                      const [day, date] = d.split('\n');
                      const active = i === 1;
                      return (
                        <div key={i} style={{
                          flexShrink: 0, width: 56, padding: '10px 6px', borderRadius: 10, textAlign: 'center',
                          cursor: 'pointer',
                          background: active ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#F8F5FF',
                          color: active ? 'white' : '#4A4A6A',
                          border: active ? 'none' : '1.5px solid #EDE6F8',
                        }}>
                          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4, opacity: active ? 0.8 : 1 }}>{day}</div>
                          <div style={{ fontSize: 18, fontWeight: 800 }}>{date}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', display: 'block', marginBottom: 10 }}>Select Time Slot</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {timeSlots.map(t => (
                      <button key={t} onClick={() => setSlot(t)}
                        style={{
                          padding: '10px 6px', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                          border: 'none', textAlign: 'center', fontFamily: 'var(--font-sans)',
                          background: slot === t ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#F8F5FF',
                          color: slot === t ? 'white' : '#4A4A6A',
                          boxShadow: slot === t ? '0 4px 12px rgba(62,42,86,0.25)' : 'none',
                          transition: 'all 0.2s',
                        }}>
                        <Clock size={12} style={{ display: 'block', margin: '0 auto 4px' }} />
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ background: '#EDE6F8', color: '#6B4A8F', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 50, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 4 of 4</span>
                </div>
                <h2 style={{ fontSize: '1.4rem', color: '#1A1A2E', marginBottom: 6, marginTop: 12 }}>Review & Confirm</h2>
                <p style={{ color: '#9B8AB0', fontSize: 14, marginBottom: 24 }}>Double-check your booking details before confirming.</p>

                <div style={{ background: '#F8F5FF', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
                  <div style={{ background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)', padding: '14px 18px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Booking Summary</div>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    {[
                      { icon: '❄️', label: 'Service', val: 'AC Service & Repair' },
                      { icon: '📅', label: 'Date', val: 'Tuesday, 1 April 2026' },
                      { icon: '🕐', label: 'Time', val: slot },
                      { icon: '📍', label: 'Address', val: 'Flat 4B, Banjara Hills, Hyderabad' },
                      { icon: '💰', label: 'Plan', val: 'Standard — ₹699' },
                    ].map(({ icon, label, val }) => (
                      <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                        <span style={{ fontSize: 16 }}>{icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>{label}</div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{val}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ borderTop: '1px dashed #D6C8F0', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#1A1A2E' }}>Total Amount</span>
                      <span style={{ fontWeight: 800, fontSize: 18, color: '#3E2A56' }}>₹699</span>
                    </div>
                  </div>
                </div>

                {/* Payment method */}
                <div style={{ background: 'white', border: '1.5px solid #EDE6F8', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 24, background: 'linear-gradient(135deg, #1A1F71, #0066B2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontSize: 9, fontWeight: 800 }}>VISA</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>•••• •••• •••• 4242</div>
                      <div style={{ fontSize: 11, color: '#9B8AB0' }}>Expires 12/27</div>
                    </div>
                  </div>
                  <button style={{ color: '#6B4A8F', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              style={{
                padding: '14px 24px', borderRadius: 12, border: '2px solid #EDE6F8',
                background: 'white', color: '#4A4A6A', fontWeight: 600, fontSize: 15,
                cursor: 'pointer', fontFamily: 'var(--font-sans)', flex: step === 3 ? 0 : 1,
              }}>
              ← Back
            </button>
          )}
          <motion.button
            onClick={() => step < 3 ? setStep(s => s + 1) : navigate('/booking/confirmed')}
            whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(62,42,86,0.35)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1, padding: '14px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
              color: 'white', fontWeight: 700, fontSize: 15,
              fontFamily: 'var(--font-sans)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
            {step === 3 ? '✅ Confirm Booking' : `Next: ${steps[step + 1]}`} {step < 3 && <ArrowRight size={16} />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
