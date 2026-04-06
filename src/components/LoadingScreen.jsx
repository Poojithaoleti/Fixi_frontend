import React, { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

// Map category name → Material Symbol icon + color
const CATEGORY_META = {
  'Electrical': { icon: 'electrical_services', color: '#d97706', bg: '#fef3c7' },
  'Plumbing':   { icon: 'plumbing',            color: '#2563eb', bg: '#dbeafe' },
  'Cleaning':   { icon: 'cleaning_services',   color: '#059669', bg: '#d1fae5' },
  'Painting':   { icon: 'format_paint',        color: '#e11d48', bg: '#ffe4e6' },
  'AC Repair':  { icon: 'ac_unit',             color: '#0891b2', bg: '#cffafe' },
  'Carpentry':  { icon: 'handyman',            color: '#7c3aed', bg: '#ede9fe' },
};

const DEFAULT_META = { icon: 'home_repair_service', color: '#3e2a56', bg: '#f0edff' };

export default function LoadingScreen({ category, service, isExiting }) {
  const [dots, setDots] = useState('');

  const meta = CATEGORY_META[category] || DEFAULT_META;
  const label = service
    ? `Loading ${service}...`
    : category
    ? `Loading ${category} Services...`
    : 'Loading, please wait...';

  // Animate the trailing dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.overlay} ${isExiting ? styles.exiting : ''}`}>
      <div className={styles.card}>
        {/* Magnifying lens with service icon inside */}
        <div className={styles.lensWrapper}>
          {/* Lens glass */}
          <div className={styles.lens}>
            <div className={styles.lensInner} style={{ backgroundColor: meta.bg, borderColor: meta.color }}>
              <span
                className={`${styles.categoryIcon} material-symbols-outlined`}
                style={{ color: meta.color }}
              >
                {meta.icon}
              </span>
            </div>
          </div>

          {/* Lens handle */}
          <div className={styles.handle} style={{ backgroundColor: meta.color }} />

          {/* Orbit ring */}
          <div className={styles.orbitRing} style={{ borderColor: `${meta.color}30` }}>
            <div className={styles.orbitDot} style={{ backgroundColor: meta.color }} />
          </div>

          {/* Outer glow */}
          <div className={styles.glow} style={{ background: `radial-gradient(circle, ${meta.color}20 0%, transparent 70%)` }} />
        </div>

        {/* Text */}
        <div className={styles.textBlock}>
          <p className={styles.mainText}>Loading your services</p>
          <p className={styles.subText}>
            {label}<span className={styles.dots}>{dots}</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ backgroundColor: meta.color }} />
        </div>
      </div>
    </div>
  );
}
