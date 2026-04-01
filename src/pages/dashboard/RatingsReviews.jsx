import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Upload, X } from 'lucide-react';

const tags = ['On Time', 'Professional', 'Clean Work', 'Friendly', 'Explained Well', 'Good Value'];
const tipAmounts = ['₹50', '₹100', '₹150', '₹200'];

export default function RatingsReviews() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hovRating, setHovRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tip, setTip] = useState('₹100');

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];
  const displayRating = hovRating || rating;

  const toggleTag = t => setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <div style={{
      minHeight: '100vh', background: 'rgba(30,20,50,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', paddingTop: 90,
      backdropFilter: 'blur(4px)',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'white', borderRadius: 20, padding: '32px',
          width: '100%', maxWidth: 500,
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          maxHeight: '90vh', overflowY: 'auto',
        }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', color: '#1A1A2E', marginBottom: 4 }}>Rate Your Experience</h2>
            <p style={{ color: '#9B8AB0', fontSize: 13 }}>AC Service — Job #FX-29483</p>
          </div>
          <button onClick={() => navigate('/dashboard/booking-history')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B8AB0', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {/* Pro avatar */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6B4A8F, #9B7EC8)',
            outline: '3px solid #6B4A8F', outlineOffset: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, color: 'white', fontSize: 26,
            margin: '0 auto 10px',
          }}>R</div>
          <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>Ravi Kumar</div>
          <div style={{ color: '#9B8AB0', fontSize: 13 }}>AC & HVAC Specialist</div>
        </div>

        {/* Star rating */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <motion.button
                key={i}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHovRating(i)}
                onMouseLeave={() => setHovRating(0)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                <Star size={36} style={{
                  fill: i <= displayRating ? '#FBBF24' : '#F0ECFD',
                  color: i <= displayRating ? '#FBBF24' : '#EDE6F8',
                  transition: 'all 0.15s',
                }} />
              </motion.button>
            ))}
          </div>
          <motion.div
            key={displayRating}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 16, fontWeight: 700, color: '#3E2A56', minHeight: 24 }}>
            {ratingLabels[displayRating]}
          </motion.div>
        </div>

        {/* Quick tags */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 10 }}>What did you like?</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                whileHover={{ y: -1 }}
                style={{
                  padding: '8px 14px', borderRadius: 50, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                  background: selectedTags.includes(tag) ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#F8F5FF',
                  color: selectedTags.includes(tag) ? 'white' : '#4A4A6A',
                  boxShadow: selectedTags.includes(tag) ? '0 4px 12px rgba(62,42,86,0.3)' : 'none',
                }}>
                {tag}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Review textarea */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 8 }}>Write a Review (Optional)</div>
          <textarea
            placeholder="Share your experience with Ravi and this service..."
            rows={3}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #EDE6F8',
              outline: 'none', fontSize: 14, fontFamily: 'var(--font-sans)', resize: 'vertical',
              lineHeight: 1.6, boxSizing: 'border-box', color: '#1A1A2E',
            }}
            onFocus={e => e.target.style.borderColor = '#3E2A56'}
            onBlur={e => e.target.style.borderColor = '#EDE6F8'}
          />
        </div>

        {/* Photo upload */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 8 }}>Add Photo (Optional)</div>
          <div style={{
            border: '2px dashed #D6C8F0', borderRadius: 10, padding: '14px',
            background: '#F8F5FF', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Upload size={16} color="#6B4A8F" />
            <span style={{ fontSize: 13, color: '#9B8AB0' }}>Upload photo</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginBottom: 8 }}>Send a Tip to Ravi 🙏</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {tipAmounts.map(t => (
              <button key={t} onClick={() => setTip(t)}
                style={{
                  flex: 1, padding: '9px 6px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', border: 'none', fontFamily: 'var(--font-sans)',
                  background: tip === t ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : 'white',
                  color: tip === t ? 'white' : '#4A4A6A',
                  boxShadow: tip === t ? '0 4px 12px rgba(62,42,86,0.3)' : '0 0 0 1.5px #EDE6F8',
                  transition: 'all 0.2s',
                }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(62,42,86,0.4)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard/booking-history')}
          style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            color: 'white', fontWeight: 700, fontSize: 15,
            fontFamily: 'var(--font-sans)', cursor: 'pointer',
          }}>
          Submit Review ★
        </motion.button>

        <button onClick={() => navigate('/dashboard/booking-history')}
          style={{ display: 'block', margin: '12px auto 0', color: '#B0A0C8', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
          Skip for now
        </button>
      </motion.div>
    </div>
  );
}
