import React from 'react';
import Header from '../components/Header';
import BookingCard from '../components/BookingCard';
import BottomNavigation from '../components/BottomNavigation';
import styles from './BookingConfirmation.module.css';

export default function BookingConfirmation() {
  const handleBackClick = () => {
    console.log('Back button clicked');
  };

  const handleViewDetails = () => {
    console.log('View Booking Details clicked');
  };

  const handleExploreServices = () => {
    console.log('Explore Other Services clicked');
  };

  const bookingData = {
    serviceName: 'Expert Electrician',
    serviceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJPY553xctADWXokwMt2-A68ckNlBLInbgyJznlVsIfAP8jdaO8Zn_mfss1qMR0NWfKgOvaaGJla2N6ZRn9ylxPdzbQGTbb-VkJXp0WQ4pXNnalG1n_1qQuwmeOYMyjjTFqJJg2pTt6g5kh-RiEyd8MHeoWZM54I-TmGIQrX-BiWd_b-VHgaYueC2uHHbEiydgyUHeCSpEriA54W_p7eVtzc_YoJ9zG0AQR_j5-BqUOY69u0lYnqjO8CTOjTOdmYC4dJMsVgLZD4-j',
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
      <BottomNavigation activeNav="bookings" />
    </div>
  );
}
