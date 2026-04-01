import { motion } from 'framer-motion';
import { Share2, Globe, AtSign, Link, Wrench } from 'lucide-react';

const footerLinks = {
  Services: ['AC Repair', 'Plumbing', 'Electrical', 'Deep Cleaning', 'Carpentry', 'Painting', 'Pest Control', 'Appliance Repair'],
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Become a Pro', 'Partner with Us'],
  'Support & Legal': ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy'],
};

const cities = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];

export default function Footer() {
  return (
    <footer style={{ background: '#2A1B3D', color: 'white' }}>
      <div className="container" style={{ paddingTop: 64, paddingBottom: 32 }}>
        {/* Main Grid */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: 48, marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{
                background: 'linear-gradient(135deg, #6B4A8F, #9B7EC8)',
                borderRadius: 10, padding: '6px 14px',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Wrench size={16} color="white" />
                <span style={{ color: 'white', fontWeight: 800, fontSize: 18, fontFamily: 'var(--font-sans)' }}>FIXI</span>
              </div>
            </div>
            <p style={{ color: '#B0A0C8', fontSize: 14, lineHeight: 1.8, marginBottom: 24, maxWidth: 240 }}>
              India's most trusted home services platform. Reliable pros, transparent pricing, guaranteed results.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { Icon: AtSign, label: 'Instagram' },
                { Icon: Globe, label: 'Facebook' },
                { Icon: Share2, label: 'Twitter' },
                { Icon: Link, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <motion.button key={label}
                  whileHover={{ y: -3, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)' }}
                  title={label}
                  style={{
                    width: 36, height: 36,
                    background: 'rgba(237,230,248,0.12)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#EDE6F8', transition: 'all 0.25s', cursor: 'pointer',
                    border: 'none',
                  }}>
                  <Icon size={16} />
                </motion.button>
              ))}
            </div>

            {/* App badges */}
            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              {['App Store', 'Google Play'].map(store => (
                <div key={store} style={{
                  border: '1.5px solid rgba(237,230,248,0.25)',
                  borderRadius: 8, padding: '8px 14px',
                  fontSize: 11, color: '#B0A0C8', cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  display: 'flex', flexDirection: 'column', gap: 1,
                }}>
                  <span style={{ fontSize: 9, opacity: 0.7 }}>Download on</span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'white' }}>{store}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <div style={{
                color: 'white', fontWeight: 700, fontSize: 14,
                marginBottom: 20, fontFamily: 'var(--font-sans)',
                letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 12,
              }}>
                {heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <a key={link} href="#" style={{
                    color: '#B0A0C8', fontSize: 14, transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = '#EDE6F8'}
                    onMouseLeave={e => e.target.style.color = '#B0A0C8'}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#4D3569', marginBottom: 24 }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ color: '#B0A0C8', fontSize: 13 }}>
            © 2026 FIXI Technologies Pvt. Ltd. · All rights reserved.
          </div>
          {/* City chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cities.map(city => (
              <span key={city} style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#B0A0C8', fontSize: 11, padding: '3px 10px',
                borderRadius: 50, cursor: 'pointer',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = '#EDE6F8'}
                onMouseLeave={e => e.target.style.color = '#B0A0C8'}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
