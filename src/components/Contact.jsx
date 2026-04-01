import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const contactInfo = [
  { icon: <Phone size={20} />, label: 'Call Us', value: '+91 1800-FIXI-NOW', sub: 'Mon–Sat, 8am–8pm' },
  { icon: <Mail size={20} />, label: 'Email Us', value: 'help@fixi.in', sub: 'We reply within 2 hours' },
  { icon: <MapPin size={20} />, label: 'Head Office', value: 'FIXI Towers, Hitec City', sub: 'Hyderabad, Telangana 500081' },
  { icon: <Clock size={20} />, label: 'Working Hours', value: 'Mon–Sun: 6am–10pm', sub: 'Emergency support 24/7' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <section id="contact" style={{ padding: 'var(--section-py) 0', background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="section-label">
            ✦ Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A2E', marginBottom: 12 }}>
            We're Here to Help
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: '#6B6B8A', fontSize: 17 }}>
            Reach out any time — our team responds fast.
          </motion.p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'white', borderRadius: 20,
              boxShadow: '0 4px 24px rgba(62,42,86,0.1)',
              padding: '40px',
            }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1A1A2E', marginBottom: 28, fontFamily: 'var(--font-sans)' }}>
              Send Us a Message
            </h3>

            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
              { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
              { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 6 }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  placeholder={field.placeholder}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '1.5px solid #EDE6F8', borderRadius: 10,
                    fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)',
                    color: '#1A1A2E', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#3E2A56'}
                  onBlur={e => e.target.style.borderColor = '#EDE6F8'}
                />
              </div>
            ))}

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 6 }}>
                Subject
              </label>
              <select
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '1.5px solid #EDE6F8', borderRadius: 10,
                  fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)',
                  color: form.subject ? '#1A1A2E' : '#B0A0C8',
                  background: 'white', cursor: 'pointer',
                }}
                onFocus={e => e.target.style.borderColor = '#3E2A56'}
                onBlur={e => e.target.style.borderColor = '#EDE6F8'}
              >
                <option value="" disabled>Select a subject...</option>
                <option>Booking Issue</option>
                <option>Pro Application</option>
                <option>Billing & Payments</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 6 }}>
                Message
              </label>
              <textarea
                rows={4}
                value={form.message}
                placeholder="Tell us how we can help..."
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '1.5px solid #EDE6F8', borderRadius: 10,
                  fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)',
                  color: '#1A1A2E', resize: 'vertical', lineHeight: 1.6,
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#3E2A56'}
                onBlur={e => e.target.style.borderColor = '#EDE6F8'}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(62,42,86,0.35)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              style={{
                width: '100%',
                background: sent ? '#10B981' : 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                color: 'white', borderRadius: 12, padding: '14px',
                fontWeight: 700, fontSize: 15,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.3s',
              }}>
              {sent ? '✓ Message Sent!' : <><Send size={16} /> Send Message</>}
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              {contactInfo.map((info, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: '#EDE6F8', borderRadius: 14, padding: '20px 20px',
                }}>
                  <div style={{
                    width: 44, height: 44, background: '#3E2A56', borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', flexShrink: 0,
                  }}>{info.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9B8AB0', fontWeight: 600, marginBottom: 2 }}>{info.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E' }}>{info.value}</div>
                    <div style={{ fontSize: 12, color: '#7A7A9A' }}>{info.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{
              background: '#EDE6F8', borderRadius: 16, height: 220,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 12, border: '1.5px dashed #C4AFDE',
            }}>
              <MapPin size={32} color="#6B4A8F" />
              <span style={{ color: '#6B4A8F', fontWeight: 600, fontSize: 14 }}>Map View — FIXI HQ Hyderabad</span>
              <span style={{ color: '#9B8AB0', fontSize: 12 }}>Hitec City, Hyderabad 500081</span>
            </div>

            {/* Live Chat */}
            <div style={{
              marginTop: 20, background: '#F8F5FF', borderRadius: 14, padding: '20px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            }}>
              <div>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>Prefer live chat?</div>
                <div style={{ color: '#7A7A9A', fontSize: 13 }}>Usually replies in under 2 minutes</div>
              </div>
              <button style={{
                background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                color: 'white', borderRadius: 50, padding: '10px 20px',
                fontWeight: 600, fontSize: 14,
                display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
              }}>
                <MessageCircle size={15} /> Start Chat
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
