import React from 'react';
import styles from './Header.module.css';

export default function Header({ title, onBackClick }) {
  return (
    <div className={styles.headerContainer}>
      <button className={styles.backButton} onClick={onBackClick}>
        <span className={`${styles.icon} material-symbols-outlined`}>arrow_back</span>
      </button>
      <h2 className={styles.headerTitle}>{title}</h2>
      <div className={styles.spacer}></div>
    </div>
  );
}