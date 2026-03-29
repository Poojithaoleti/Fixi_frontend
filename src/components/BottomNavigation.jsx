import React from 'react';
import styles from './BottomNavigation.module.css';

export default function BottomNavigation({ activeNav = 'home', onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'services', label: 'Services', icon: 'list_alt' },
    { id: 'bookings', label: 'Bookings', icon: 'calendar_month' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navInner}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeNav === item.id ? styles.active : styles.inactive}`}
            onClick={() => onNavigate?.(item.id)}
            aria-label={item.label}
          >
            <span className={`${styles.icon} material-symbols-outlined`}>
              {item.icon}
            </span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}