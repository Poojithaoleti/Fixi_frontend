import React from 'react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'services', label: 'Services', icon: 'grid_view' },
  { id: 'bookings', label: 'Bookings', icon: 'calendar_today' },
  { id: 'profile', label: 'Profile', icon: 'person' },
];

export default function Sidebar({ activeNav, onNavigate }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <span className="material-symbols-outlined">auto_fix</span>
        </div>
        <span className={styles.logoText}>Homezy</span>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeNav === item.id ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            {activeNav === item.id && <div className={styles.activeIndicator} />}
          </button>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.userBrief}>
          <div className={styles.avatar}>P</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Pragna</p>
            <p className={styles.userRole}>Premium Member</p>
          </div>
        </div>
        <button className={styles.logoutBtn}>
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </aside>
  );
}
