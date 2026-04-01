import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, MapPin, Plus, Trash2, Shield, Bell, Lock } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';

const addresses = [
  { id: 1, label: 'Home', addr: 'Flat 4B, Sunridge Apartments, Banjara Hills, Hyderabad 500034', default: true },
  { id: 2, label: 'Office', addr: '3rd Floor, Cyber One, Madhapur, Hyderabad 500081', default: false },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="dashboard-layout" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px' }}>
      <DashboardSidebar currentPage="profile" />

      <main style={{ flex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Profile header card */}
          <div style={{
            background: 'white', borderRadius: 16, padding: '28px', marginBottom: 20,
            boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD',
            display: 'flex', alignItems: 'center', gap: 24,
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6B4A8F, #9B7EC8)',
                border: '3px solid transparent',
                backgroundClip: 'padding-box',
                outline: '3px solid #6B4A8F',
                outlineOffset: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 800, color: 'white',
              }}>A</div>
              <button style={{
                position: 'absolute', bottom: 0, right: 0, width: 26, height: 26,
                borderRadius: '50%', background: '#3E2A56', border: '2px solid white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}><Edit2 size={12} color="white" /></button>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.4rem', color: '#1A1A2E', marginBottom: 4 }}>Arjun Kumar</h2>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ color: '#9B8AB0', fontSize: 14 }}>Member since Jan 2024</span>
                <span style={{ background: '#EDE6F8', color: '#3E2A56', padding: '3px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Shield size={11} /> Verified
                </span>
              </div>
            </div>
            <button onClick={() => setEditMode(!editMode)}
              style={{
                border: '2px solid #3E2A56', color: '#3E2A56', borderRadius: 10,
                padding: '9px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                background: editMode ? '#3E2A56' : 'transparent',
                color: editMode ? 'white' : '#3E2A56',
                fontFamily: 'var(--font-sans)', transition: 'all 0.2s',
              }}>
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {/* Personal Info */}
          <div style={{
            background: 'white', borderRadius: 16, padding: '24px', marginBottom: 20,
            boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#3E2A56', marginBottom: 20, fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 12 }}>
              Personal Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Full Name', val: 'Arjun Kumar' },
                { label: 'Phone', val: '+91 98765 43210' },
                { label: 'Email', val: 'arjun.kumar@email.com' },
                { label: 'Date of Birth', val: '12 March 1992' },
                { label: 'Gender', val: 'Male' },
                { label: 'City', val: 'Hyderabad' },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div style={{ fontSize: 12, color: '#9B8AB0', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
                  {editMode ? (
                    <input defaultValue={val} style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #EDE6F8',
                      outline: 'none', fontSize: 14, fontFamily: 'var(--font-sans)', color: '#1A1A2E',
                      boxSizing: 'border-box',
                    }}
                      onFocus={e => e.target.style.borderColor = '#3E2A56'}
                      onBlur={e => e.target.style.borderColor = '#EDE6F8'}
                    />
                  ) : (
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{val}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div style={{
            background: 'white', borderRadius: 16, padding: '24px', marginBottom: 20,
            boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>Saved Addresses</h3>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6, color: '#6B4A8F',
                fontWeight: 700, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer',
              }}>
                <Plus size={15} /> Add Address
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {addresses.map(addr => (
                <div key={addr.id} style={{
                  background: '#F8F5FF', borderRadius: 12, padding: '14px 16px',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  border: addr.default ? '2px solid #EDE6F8' : '2px solid transparent',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', background: '#EDE6F8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <MapPin size={16} color="#3E2A56" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{addr.label}</span>
                      {addr.default && <span style={{ background: '#EDE6F8', color: '#3E2A56', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 50 }}>DEFAULT</span>}
                    </div>
                    <div style={{ fontSize: 13, color: '#9B8AB0', lineHeight: 1.5 }}>{addr.addr}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B4A8F', padding: 6 }}><Edit2 size={14} /></button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: 6 }}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              {/* Add address dashed */}
              <button style={{
                border: '2px dashed #D6C8F0', borderRadius: 12, padding: '14px',
                background: 'transparent', cursor: 'pointer', color: '#6B4A8F',
                fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-sans)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Plus size={16} /> Add New Address
              </button>
            </div>
          </div>

          {/* Account Settings */}
          <div style={{
            background: 'white', borderRadius: 16, padding: '24px',
            boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD',
          }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)', marginBottom: 20 }}>Account Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Email Notifications', sub: 'Booking updates and offers', on: true },
                { label: 'SMS Alerts', sub: 'OTP and booking reminders', on: true },
                { label: 'Push Notifications', sub: 'App notifications', on: false },
              ].map(({ label, sub, on }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E' }}>{label}</div>
                    <div style={{ fontSize: 12, color: '#9B8AB0' }}>{sub}</div>
                  </div>
                  <div style={{
                    width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                    background: on ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#E5E7EB',
                    position: 'relative', transition: 'all 0.2s', flexShrink: 0,
                  }}>
                    <div style={{
                      position: 'absolute', top: 3, left: on ? 22 : 3,
                      width: 18, height: 18, borderRadius: '50%', background: 'white',
                      transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    }} />
                  </div>
                </div>
              ))}
              <div style={{ paddingTop: 4, borderTop: '1px solid #F0ECFD' }}>
                <button style={{ color: '#6B4A8F', fontWeight: 700, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Lock size={14} /> Change Password
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
