import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

function getDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function BookingModal({ service, plan, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const dates = getDates();

  const canProceed = () => {
    if (step === 1) return selectedDate && selectedTime;
    if (step === 2) return address.length > 5;
    if (step === 3) return name.length > 1 && phone.length >= 10;
    return true;
  };

  const stepLabels = ['Schedule', 'Location', 'Details', 'Confirm'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(26,26,46,0.65)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20, backdropFilter: 'blur(4px)',
        }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'white', borderRadius: 24, width: '100%', maxWidth: 560,
            maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          }}>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            padding: '24px 28px', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 4 }}>Booking</div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>{service.name}</div>
                {plan && <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{plan.name} Plan · {plan.price}</div>}
              </div>
              <button onClick={onClose} style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', cursor: 'pointer', flexShrink: 0,
              }}>
                <X size={18} />
              </button>
            </div>

            {/* Step indicators */}
            <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
              {stepLabels.map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: i + 1 <= step ? 'white' : 'rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700,
                      color: i + 1 <= step ? '#3E2A56' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.3s',
                    }}>
                      {i + 1 < step ? <CheckCircle size={16} color="#3E2A56" /> : i + 1}
                    </div>
                    <div style={{ fontSize: 10, color: i + 1 <= step ? 'white' : 'rgba(255,255,255,0.45)', marginTop: 4, fontWeight: 500 }}>{label}</div>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: i + 1 < step ? 'white' : 'rgba(255,255,255,0.2)', margin: '0 6px', marginBottom: 16, transition: 'background 0.3s' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
            <AnimatePresence mode="wait">
              {/* Step 1: Schedule */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                    <Calendar size={18} color="#3E2A56" />
                    <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16 }}>Select a Date</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
                    {dates.map((d, i) => {
                      const isSelected = selectedDate?.toDateString() === d.toDateString();
                      const isToday = i === 0;
                      return (
                        <button key={i} onClick={() => setSelectedDate(d)}
                          style={{
                            flexShrink: 0, width: 64, padding: '12px 0', borderRadius: 14, cursor: 'pointer',
                            background: isSelected ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#F8F5FF',
                            border: isSelected ? 'none' : '1.5px solid #EDE6F8',
                            transition: 'all 0.2s', textAlign: 'center',
                          }}>
                          <div style={{ fontSize: 11, color: isSelected ? 'rgba(255,255,255,0.7)' : '#9B8AB0', fontWeight: 600, marginBottom: 4 }}>
                            {isToday ? 'TODAY' : days[d.getDay()].toUpperCase()}
                          </div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: isSelected ? 'white' : '#1A1A2E', lineHeight: 1 }}>{d.getDate()}</div>
                          <div style={{ fontSize: 11, color: isSelected ? 'rgba(255,255,255,0.7)' : '#9B8AB0', marginTop: 4 }}>{months[d.getMonth()]}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Clock size={18} color="#3E2A56" />
                    <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16 }}>Select a Time</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {timeSlots.map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        style={{
                          padding: '10px 8px', borderRadius: 10, cursor: 'pointer',
                          background: selectedTime === t ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#F8F5FF',
                          border: selectedTime === t ? 'none' : '1.5px solid #EDE6F8',
                          color: selectedTime === t ? 'white' : '#4A4A6A',
                          fontWeight: 600, fontSize: 14, transition: 'all 0.2s',
                          fontFamily: 'var(--font-sans)',
                        }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                    <MapPin size={18} color="#3E2A56" />
                    <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16 }}>Service Address</span>
                  </div>
                  <textarea rows={3} value={address} onChange={e => setAddress(e.target.value)}
                    placeholder="Flat / House No, Building Name, Street, Area..."
                    style={{
                      width: '100%', padding: '14px 16px', border: '1.5px solid #EDE6F8',
                      borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)',
                      color: '#1A1A2E', resize: 'none', lineHeight: 1.6, marginBottom: 16,
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#3E2A56'}
                    onBlur={e => e.target.style.borderColor = '#EDE6F8'} />

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 6 }}>City</label>
                    <select style={{
                      width: '100%', padding: '12px 16px', border: '1.5px solid #EDE6F8',
                      borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)',
                      color: '#1A1A2E', background: 'white', cursor: 'pointer',
                    }}
                      onFocus={e => e.target.style.borderColor = '#3E2A56'}
                      onBlur={e => e.target.style.borderColor = '#EDE6F8'}>
                      {['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 6 }}>Pincode</label>
                    <input type="text" maxLength={6} placeholder="500081"
                      style={{
                        width: '100%', padding: '12px 16px', border: '1.5px solid #EDE6F8',
                        borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)', color: '#1A1A2E',
                      }}
                      onFocus={e => e.target.style.borderColor = '#3E2A56'}
                      onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Details */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  <h3 style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16, marginBottom: 20 }}>Your Details</h3>
                  {[
                    { key: 'name', label: 'Full Name', placeholder: 'Your full name', value: name, set: setName, type: 'text' },
                    { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', value: phone, set: setPhone, type: 'tel' },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                        style={{
                          width: '100%', padding: '12px 16px', border: '1.5px solid #EDE6F8',
                          borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)', color: '#1A1A2E',
                        }}
                        onFocus={e => e.target.style.borderColor = '#3E2A56'}
                        onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 6 }}>Notes for Pro (optional)</label>
                    <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                      placeholder="Any specific instructions or details about the problem..."
                      style={{
                        width: '100%', padding: '12px 16px', border: '1.5px solid #EDE6F8',
                        borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)',
                        color: '#1A1A2E', resize: 'none', lineHeight: 1.6,
                      }}
                      onFocus={e => e.target.style.borderColor = '#3E2A56'}
                      onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirm */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      style={{
                        width: 72, height: 72, background: 'linear-gradient(135deg, #10B981, #059669)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
                      }}>
                      <CheckCircle size={36} color="white" />
                    </motion.div>
                    <h3 style={{ fontSize: 22, color: '#1A1A2E', marginBottom: 8 }}>Booking Confirmed!</h3>
                    <p style={{ color: '#9B8AB0', fontSize: 14 }}>We'll send a confirmation to your phone shortly.</p>
                  </div>

                  <div style={{ background: '#F8F5FF', borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { label: 'Service', value: service.name },
                      { label: 'Plan', value: plan ? `${plan.name} · ${plan.price}` : 'Standard' },
                      { label: 'Date', value: selectedDate ? `${days[selectedDate.getDay()]}, ${selectedDate.getDate()} ${months[selectedDate.getMonth()]} 2026` : '—' },
                      { label: 'Time', value: selectedTime || '—' },
                      { label: 'Name', value: name || '—' },
                      { label: 'Phone', value: phone || '—' },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#9B8AB0', fontSize: 13 }}>{item.label}</span>
                        <span style={{ color: '#1A1A2E', fontWeight: 600, fontSize: 14 }}>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 20, background: '#EDE6F8', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 24 }}>📱</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#3E2A56' }}>Pro assigned within 30 mins</div>
                      <div style={{ fontSize: 12, color: '#9B8AB0' }}>You'll receive an SMS with their details</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div style={{ padding: '20px 28px', borderTop: '1px solid #F0EAF8', display: 'flex', gap: 12, flexShrink: 0 }}>
            {step > 1 && step < 4 && (
              <button onClick={() => setStep(s => s - 1)} style={{
                flex: 1, border: '1.5px solid #EDE6F8', color: '#6B6B8A', borderRadius: 50,
                padding: '13px', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <ChevronLeft size={16} /> Back
              </button>
            )}
            {step < 4 ? (
              <motion.button
                whileHover={canProceed() ? { scale: 1.02 } : {}}
                whileTap={canProceed() ? { scale: 0.98 } : {}}
                onClick={() => canProceed() && setStep(s => s + 1)}
                style={{
                  flex: step === 1 ? 1 : 2,
                  background: canProceed() ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#E5E5E5',
                  color: canProceed() ? 'white' : '#AAAAAA', borderRadius: 50, padding: '13px',
                  fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'background 0.3s', cursor: canProceed() ? 'pointer' : 'not-allowed',
                }}>
                {step === 3 ? 'Confirm Booking' : 'Continue'} {step < 3 && <ChevronRight size={16} />}
              </motion.button>
            ) : (
              <button onClick={onClose} style={{
                flex: 1, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                color: 'white', borderRadius: 50, padding: '13px', fontWeight: 700, fontSize: 15,
              }}>
                Done
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
