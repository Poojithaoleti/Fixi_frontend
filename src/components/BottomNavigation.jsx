import React from 'react';
import styles from './BottomNavigation.module.css';

export default function BottomNavigation({ activeNav = 'bookings' }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'services', label: 'Services', icon: 'list_alt' },
    { id: 'bookings', label: 'Bookings', icon: 'calendar_month' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <div className={styles.navContainer}>
      <div className={styles.navItemsWrapper}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`${styles.navItem} ${
              activeNav === item.id ? styles.active : styles.inactive
            }`}
          >
            <span className={`${styles.icon} material-symbols-outlined`}>
              {item.icon}
            </span>
            <p className={styles.label}>{item.label}</p>
          </a>
        ))}
      </div>
      <div className={styles.spacer}></div>
    </div>
  );
}