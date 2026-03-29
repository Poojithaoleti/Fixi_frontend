import React, { useState, useEffect, useCallback } from 'react';
import styles from './Home.module.css';

export default function Home({ onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const popularServices = [
    { id: 'Electrical', name: 'Electrical', icon: 'electrical_services' },
    { id: 'Cleaning', name: 'Deep Cleaning', icon: 'cleaning_services' },
    { id: 'AC Repair', name: 'AC Servicing', icon: 'ac_unit' },
    { id: 'Plumbing', name: 'Plumbing', icon: 'plumbing' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      rating: 5,
      comment: 'Homezy has made my life so much easier. The electricians were professional, arrived on time, and did an amazing job with our home wiring!'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      rating: 5,
      comment: 'I use their deep cleaning services for my office regularly. The team is efficient and very thorough. Highly recommended for any home or office needs.'
    },
    {
      id: 3,
      name: 'Ananya Iyer',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      rating: 5,
      comment: 'Excellent plumbing service! They fixed a chronic leakage issue in our bathroom that three other plumbers couldnt solve. Best home service app in the city.'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Marketing Lead',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      rating: 5,
      comment: 'The AC repair team was fantastic. They diagnosed the issue within minutes and had it fixed before lunch. Fair pricing and honest work!'
    },
    {
      id: 5,
      name: 'Meera Kapur',
      role: 'Interior Designer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      rating: 5,
      comment: 'Ive worked with many contractors, but Homezys carpentry team is top-notch. Their attention to detail on our custom shelves was remarkable.'
    }
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: ['About Us', 'Terms & Conditions', 'Privacy Policy', 'Anti-discrimination Policy', 'Homezy Impact', 'Careers']
    },
    {
      title: 'For Customers',
      links: ['Homezy Reviews', 'Categories Near You', 'Blog', 'Contact Us', 'Help Center']
    },
    {
      title: 'For Partners',
      links: ['Register as a Professional', 'Partner Help Center', 'Training Centers']
    },
    {
      title: 'Social Links',
      icons: ['share', 'public', 'language']
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // 5s interval
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className={styles.homeContainer}>
      {/* ── Top Info Bar ────────────────── */}
      <div className={styles.topInfoBar}>
        <div className={styles.topInfoInner}>
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className="material-symbols-outlined">mail</span>
              <span>info@homezy.com</span>
            </div>
            <div className={styles.infoItem}>
              <span className="material-symbols-outlined">call</span>
              <span>+91-98765-43210</span>
            </div>
          </div>
          <div className={styles.socialInfo}>
            <span className="material-symbols-outlined">share</span>
            <span className="material-symbols-outlined">public</span>
            <span className="material-symbols-outlined">language</span>
          </div>
        </div>
      </div>

      {/* ── Hero Section with Background ── */}
      <header className={styles.heroSection}>
        {/* Navbar inside Hero */}
        <nav className={styles.navbar}>
          <div className={styles.navInner}>
            <div className={styles.logo}>
              <span className="material-symbols-outlined">auto_fix</span>
              <span>Homezy</span>
            </div>
            <div className={styles.navLinks}>
              <button onClick={() => onNavigate('home')}>HOME</button>
              <button onClick={() => onNavigate('services')}>SERVICES</button>
              <button>ABOUT US</button>
              <button>BLOG</button>
              <button>CONTACTS</button>
            </div>
            <button className={styles.loginBtn}>LOGIN</button>
          </div>
        </nav>

        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>Professional home services at your doorstep</h1>
            <p>Reliable, affordable, and expert services for every home need.</p>
          </div>

          <div className={styles.heroActions}>
            <button className={styles.primaryBtn} onClick={() => onNavigate('services')}>
              GET STARTED
            </button>
            <button className={styles.secondaryBtn}>
              <span className="material-symbols-outlined">play_circle</span>
              <span>watch video</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Popular Services & Promo ────── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Popular Services</h2>
          <span className={styles.viewAll} onClick={() => onNavigate('services')} role="button" tabIndex={0}>
            View All
          </span>
        </div>

        <div className={styles.popularGrid}>
          {popularServices.map((service) => (
            <div
              key={service.id}
              className={styles.popularCard}
              onClick={() => onNavigate('subservices', service.id)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.popularIcon}>
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <h3>{service.name}</h3>
            </div>
          ))}
        </div>

        <div className={styles.promoBanner}>
          <h3>Flat 20% OFF</h3>
          <p>On your first booking this month!</p>
          <button className={styles.promoButton} onClick={() => onNavigate('services')}>
            Book Now
          </button>
        </div>
      </section>

      {/* ── Testimonials Sliding Carousel ── */}
      <section className={styles.testimonialSection}>
        <div className={styles.testimonialHeaderMain}>
          <h2>Testimonials</h2>
        </div>

        <div className={styles.testimonialDecorator}>
          <div className={styles.accentGlow} />
          <span className={`material-symbols-outlined ${styles.quoteIconBg}`}>format_quote</span>
        </div>

        <div className={styles.sliderViewport}>
          <button className={`${styles.sliderArrow} ${styles.prev}`} onClick={prevSlide} aria-label="Previous testimonial">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <div className={styles.sliderTrack} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map((t) => (
              <div key={t.id} className={styles.slide}>
                <div className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <img src={t.image} alt={t.name} className={styles.customerAvatar} />
                    <div className={styles.customerInfo}>
                      <h4>{t.name}</h4>
                      <p>{t.role}</p>
                    </div>
                  </div>
                  <div className={styles.starRating}>
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined">star</span>
                    ))}
                  </div>
                  <p className={styles.comment}>"{t.comment}"</p>
                </div>
              </div>
            ))}
          </div>

          <button className={`${styles.sliderArrow} ${styles.next}`} onClick={nextSlide} aria-label="Next testimonial">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <div className={styles.sliderDots}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Quicklinks / Footer Section ── */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.brandColumn}>
            <div className={styles.footerLogo}>
              <span className="material-symbols-outlined">auto_fix</span>
              <span>Homezy</span>
            </div>
            <p className={styles.brandDesc}>
              Making your home a better place, one service at a time. Trusted by thousands across the city.
            </p>
          </div>
          
          {footerLinks.map((column, idx) => (
            <div key={idx} className={styles.footerColumn}>
              <h4>{column.title}</h4>
              {column.links ? (
                <ul>
                  {column.links.map((link, lIdx) => (
                    <li key={lIdx}>{link}</li>
                  ))}
                </ul>
              ) : (
                <div className={styles.footerSocials}>
                  {column.icons.map((icon, iIdx) => (
                    <span key={iIdx} className="material-symbols-outlined">{icon}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.copyright}>
          <p>© 2026 Homezy Services Private Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
