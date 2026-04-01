import { motion } from 'framer-motion';
import { ShieldCheck, Award, Clock, ThumbsUp } from 'lucide-react';

const trust = [
  { icon: <ShieldCheck size={32} />, label: 'Background Verified', sub: 'Every pro is screened' },
  { icon: <Award size={32} />, label: 'Insured Work', sub: 'Fully covered jobs' },
  { icon: <Clock size={32} />, label: 'On-Time Guarantee', sub: 'Or your money back' },
  { icon: <ThumbsUp size={32} />, label: 'Satisfaction Promise', sub: '30-day re-service free' },
];

export default function TrustBanner() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #3E2A56, #4D3569, #2A1B3D)',
      padding: '64px 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32,
        }}>
          {trust.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 14, border: '1px solid rgba(237,230,248,0.12)',
              }}>
              <div style={{ color: '#EDE6F8', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{item.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
