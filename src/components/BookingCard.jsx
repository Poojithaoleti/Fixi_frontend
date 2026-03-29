import React from 'react';
import styles from './BookingCard.module.css';

export default function BookingCard({ 
  booking, 
  onViewDetails, 
  onExploreServices 
}) {
  return (
    <>
      {/* Success Confirmation Section */}
      <div className={styles.successContainer}>
        <div className={styles.iconCircle}>
          <span className={`${styles.checkIcon} material-symbols-outlined`}>
            check_circle
          </span>
        </div>
        <h1 className={styles.successTitle}>Booking Confirmed!</h1>
        <p className={styles.successMessage}>
          We've sent a confirmation to your email. You can view your booking details below or in the "Bookings" tab.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className={styles.card}>
        <div className={styles.serviceInfo}>
          <div>
            <p className={styles.label}>Service</p>
            <p className={styles.serviceName}>{booking.serviceName}</p>
          </div>
          <img 
            alt={booking.serviceName} 
            className={styles.serviceImage}
            src={booking.serviceImage}
          />
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <span className={styles.icon + ' material-symbols-outlined'}>calendar_today</span>
            <p>{booking.date}</p>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.icon + ' material-symbols-outlined'}>schedule</span>
            <p>{booking.time}</p>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.icon + ' material-symbols-outlined'}>location_on</span>
            <p>{booking.location}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.buttonsContainer}>
        <button 
          className={styles.primaryButton} 
          onClick={onViewDetails}
        >
          View Booking Details
        </button>
        <button 
          className={styles.secondaryButton} 
          onClick={onExploreServices}
        >
          Explore Other Services
        </button>
      </div>
    </>
  );
}