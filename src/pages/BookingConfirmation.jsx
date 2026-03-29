import React from 'react';
import Header from '../components/Header';
import BookingCard from '../components/BookingCard';
import styles from './BookingConfirmation.module.css';

export default function BookingConfirmation({ onNavigate }) {
  const handleBackClick = () => {
    onNavigate('services');
  };

  const handleViewDetails = () => {
    // Navigate to the bookings list (future page — for now go to home)
    onNavigate('home');
  };

  const handleExploreServices = () => {
    onNavigate('services');
  };

  const bookingData = {
    serviceName: 'Expert Electrician',
    serviceImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&q=80',
    date: 'Monday, 28th October 2024',
    time: '10:00 AM - 11:00 AM',
    location: '123 Maple Street, Anytown',
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <Header title="Booking Confirmation" onBackClick={handleBackClick} />
        <BookingCard
          booking={bookingData}
          onViewDetails={handleViewDetails}
          onExploreServices={handleExploreServices}
        />
      </div>
    </div>
  );
}
