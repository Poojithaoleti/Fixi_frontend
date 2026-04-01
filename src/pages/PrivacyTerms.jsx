import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const privacySections = [
  {
    id: 'overview', title: 'Overview',
    content: `FIXI Technologies Pvt. Ltd. ("FIXI", "we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform — including our website, mobile applications, and all related services.`,
    highlight: 'By using FIXI, you agree to the collection and use of information in accordance with this policy. If you disagree with any part, you must discontinue use immediately.',
  },
  {
    id: 'collection', title: 'Information We Collect',
    content: `We collect several types of information to provide and improve our services:\n\n• Account information: name, email address, phone number, and password when you register.\n• Profile data: address, location, service preferences, and payment details.\n• Usage data: pages visited, features used, clicks, search queries, and time spent.\n• Device data: IP address, browser type, operating system, and device identifiers.\n• Location data: with your permission, we collect precise GPS location to match you with nearby professionals.`,
    highlight: 'We never sell your personal data to third parties. Your information is used solely to power the FIXI platform.',
  },
  {
    id: 'usage', title: 'How We Use Your Information',
    content: `We use the information we collect to:\n\n• Process bookings and connect you with service professionals.\n• Send transactional notifications (booking confirmation, OTP, reminders).\n• Improve our platform through analytics and A/B testing.\n• Detect and prevent fraud, abuse, and security threats.\n• Personalise your experience based on past bookings and preferences.\n• Comply with legal obligations and enforce our terms.`,
  },
  {
    id: 'sharing', title: 'Sharing Your Information',
    content: `We share your information only in limited circumstances:\n\n• With service professionals: we share your name, contact number, and address to facilitate the booked service.\n• With payment processors: to complete transactions securely (we never store full card details).\n• With analytics providers: aggregated, anonymised data only.\n• When required by law: in response to valid legal requests from courts or government authorities.`,
    highlight: 'Service professionals only receive the information necessary to complete your booking — nothing more.',
  },
  {
    id: 'cookies', title: 'Cookies & Tracking',
    content: `FIXI uses cookies and similar tracking technologies to:\n\n• Keep you logged in across sessions.\n• Remember your preferences and location.\n• Track platform performance and errors.\n• Serve relevant promotions (you can opt out).\n\nYou can control cookies through your browser settings. Disabling certain cookies may limit some features.`,
  },
  {
    id: 'security', title: 'Data Security',
    content: `We implement industry-standard security measures including TLS encryption, hashed passwords (bcrypt), role-based access controls, and regular security audits. However, no transmission over the internet or method of electronic storage is 100% secure. We encourage you to use strong passwords and report any suspicious activity to security@fixi.in.`,
  },
  {
    id: 'rights', title: 'Your Rights',
    content: `Under applicable data protection laws, you have the right to:\n\n• Access: request a copy of the personal data we hold about you.\n• Rectification: correct inaccurate or incomplete data.\n• Erasure: request deletion of your account and associated data.\n• Portability: receive your data in a machine-readable format.\n• Objection: opt out of certain processing activities, including marketing.\n\nTo exercise these rights, email privacy@fixi.in with your request.`,
    highlight: 'We will respond to all verified requests within 30 calendar days.',
  },
  {
    id: 'contact', title: 'Contact Us',
    content: `If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer:\n\nEmail: dpo@fixi.in\nPhone: +91 1800-FIXI-NOW\nAddress: FIXI Technologies Pvt. Ltd., FIXI Towers, Hitec City, Hyderabad – 500081, Telangana, India.`,
  },
];

const termsSections = [
  {
    id: 'acceptance', title: 'Acceptance of Terms',
    content: `By accessing or using FIXI's platform, you confirm that you are at least 18 years old, have read these Terms of Service, and agree to be bound by them. These terms form a legally binding agreement between you and FIXI Technologies Pvt. Ltd.`,
    highlight: 'If you do not agree to these terms, you must not access or use the FIXI platform.',
  },
  {
    id: 'services', title: 'Platform Services',
    content: `FIXI operates as a technology marketplace connecting customers with independent service professionals ("Pros"). FIXI is not a direct service provider. All services are rendered by independent contractors who have agreed to separate service agreements with FIXI.\n\nFIXI reserves the right to add, modify, or remove any service category at its sole discretion, with or without notice.`,
  },
  {
    id: 'accounts', title: 'User Accounts',
    content: `You are responsible for maintaining the confidentiality of your account credentials. You agree to:\n\n• Provide accurate and truthful information during registration.\n• Promptly update your information when it changes.\n• Not share your account with any third party.\n• Notify FIXI immediately of any unauthorised access to your account.\n\nFIXI reserves the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    id: 'bookings', title: 'Bookings & Payments',
    content: `All prices displayed on the platform are inclusive of applicable taxes. By placing a booking, you authorise FIXI to charge the selected payment method for the stated amount.\n\nCancellations made more than 2 hours before the scheduled service time are eligible for a full refund. Cancellations within 2 hours may attract a cancellation fee of up to ₹100.`,
    highlight: 'FIXI uses PCI-DSS compliant payment processors. Your card details are never stored on FIXI servers.',
  },
  {
    id: 'conduct', title: 'Prohibited Conduct',
    content: `You may not:\n\n• Use the platform for any unlawful purpose.\n• Harass, threaten, or discriminate against any Pro or FIXI employee.\n• Circumvent the platform to book Pros directly outside FIXI.\n• Submit false reviews or ratings.\n• Introduce malware, scrape content, or attempt to reverse-engineer the platform.\n• Impersonate another person or entity.`,
  },
  {
    id: 'liability', title: 'Limitation of Liability',
    content: `To the fullest extent permitted by applicable law, FIXI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or any service booked through it. FIXI's total liability shall not exceed the amount you paid for the specific booking giving rise to the claim.`,
  },
  {
    id: 'governing', title: 'Governing Law',
    content: `These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana, India.`,
    highlight: 'FIXI encourages users to first attempt resolution through our support team before pursuing legal action.',
  },
];

export default function PrivacyTerms() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('privacy');
  const [activeSection, setActiveSection] = useState('overview');
  const sections = activeTab === 'privacy' ? privacySections : termsSections;

  useEffect(() => {
    setActiveSection(sections[0].id);
  }, [activeTab]);

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white', paddingTop: 70 }}>
      {/* Hero */}
      <div style={{ background: 'white', borderBottom: '1px solid #EDE6F8', padding: '32px 0 24px' }}>
        <div className="container">
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B4A8F', fontWeight: 600, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20 }}>
            <ArrowLeft size={15} /> Back to Home
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: '#1A1A2E' }}>Legal</h1>
            <span style={{ background: '#EDE6F8', color: '#6B4A8F', padding: '3px 12px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>Last updated: March 2026</span>
          </div>
          {/* Tab toggle */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ id: 'privacy', label: 'Privacy Policy' }, { id: 'terms', label: 'Terms of Service' }].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: '10px 24px', borderRadius: 50, fontWeight: 700, fontSize: 14,
                border: '2px solid', cursor: 'pointer', transition: 'all 0.25s',
                borderColor: '#3E2A56',
                background: activeTab === tab.id ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white',
                color: activeTab === tab.id ? 'white' : '#3E2A56',
              }}>{tab.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }} className="legal-grid">

          {/* Sidebar TOC */}
          <div>
            <div style={{ position: 'sticky', top: 88 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Contents</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {sections.map(s => (
                  <button key={s.id} onClick={() => scrollTo(s.id)} style={{
                    textAlign: 'left', padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: activeSection === s.id ? '#EDE6F8' : 'transparent',
                    borderLeft: `3px solid ${activeSection === s.id ? '#3E2A56' : 'transparent'}`,
                    color: activeSection === s.id ? '#3E2A56' : '#6B6B8A',
                    fontWeight: activeSection === s.id ? 700 : 400,
                    fontSize: 13, transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { if (activeSection !== s.id) e.currentTarget.style.background = '#F8F5FF'; }}
                    onMouseLeave={e => { if (activeSection !== s.id) e.currentTarget.style.background = 'transparent'; }}>
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {sections.map((s, i) => (
                <div key={s.id} id={`section-${s.id}`} style={{ marginBottom: 48 }}>
                  <h2 style={{ fontSize: 22, color: '#3E2A56', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #F0EAF8' }}>{s.title}</h2>
                  {s.highlight && (
                    <div style={{ background: '#EDE6F8', borderLeft: '4px solid #3E2A56', borderRadius: '0 10px 10px 0', padding: '14px 18px', marginBottom: 16 }}>
                      <p style={{ color: '#3E2A56', fontSize: 14, lineHeight: 1.7, fontWeight: 500 }}>{s.highlight}</p>
                    </div>
                  )}
                  {s.content.split('\n\n').map((para, j) => (
                    <p key={j} style={{ color: '#1A1A2E', fontSize: 15, lineHeight: 1.8, marginBottom: 12, whiteSpace: 'pre-line' }}>{para}</p>
                  ))}
                </div>
              ))}

              {/* Contact CTA */}
              <div style={{ borderTop: '1px solid #EDE6F8', paddingTop: 32, textAlign: 'center' }}>
                <p style={{ color: '#6B6B8A', fontSize: 14 }}>
                  Have questions about this policy?{' '}
                  <a href="#contact" style={{ color: '#6B4A8F', fontWeight: 700 }}>Contact our team →</a>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
