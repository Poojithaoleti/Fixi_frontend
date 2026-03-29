import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './SubServices.module.css';

const ALL_SUBSERVICES = {
  'Electrical': [
    { title: 'Wiring Repair & Replacement', price: '₹799', rating: '4.8', reviews: '1.2k', duration: '2-3 hours', img: '/src/assets/electrical.png', tab: 'Repair' },
    { title: 'Electrical Panel Upgrade', price: '₹3,499', rating: '4.9', reviews: '450', duration: '4-5 hours', img: '/src/assets/electrical.png', tab: 'Installation' },
    { title: 'Outlet & Switch Installation', price: '₹299', rating: '4.7', reviews: '2.3k', duration: '1 hour', img: '/src/assets/electrical.png', tab: 'Installation' },
    { title: 'Ceiling Fan Installation', price: '₹399', rating: '4.8', reviews: '3.1k', duration: '1 hour', img: '/src/assets/electrical.png', tab: 'Installation' },
    { title: 'Light Fixture Installation', price: '₹499', rating: '4.7', reviews: '1.8k', duration: '1.5 hours', img: '/src/assets/electrical.png', tab: 'Installation' },
    { title: 'Exhaust Fan Installation', price: '₹449', rating: '4.6', reviews: '920', duration: '1.5 hours', img: '/src/assets/electrical.png', tab: 'Installation' },
    { title: 'Circuit Breaker Repair', price: '₹899', rating: '4.8', reviews: '560', duration: '2 hours', img: '/src/assets/electrical.png', tab: 'Repair' },
    { title: 'Home Security Camera Setup', price: '₹2,999', rating: '4.9', reviews: '320', duration: '4 hours', img: '/src/assets/electrical.png', tab: 'Smart Home' },
    { title: 'Smoke Detector Upgrade', price: '₹1,299', rating: '4.9', reviews: '210', duration: '1.5 hours', img: '/src/assets/electrical.png', tab: 'Installation' },
    { title: 'EV Charger Installation', price: '₹5,999', rating: '5.0', reviews: '85', duration: 'Full Day', img: '/src/assets/electrical.png', tab: 'Installation' },
    { title: 'Intercom Wiring', price: '₹1,899', rating: '4.7', reviews: '140', duration: '3 hours', img: '/src/assets/electrical.png', tab: 'Repair' },
    { title: 'Smart Home Setup', price: '₹7,499', rating: '5.0', reviews: '110', duration: 'Full Day', img: '/src/assets/electrical.png', tab: 'Smart Home' },
  ],
  'Plumbing': [
    { title: 'Leaky Faucet Repair', price: '₹199', rating: '4.8', reviews: '2.5k', duration: '45 mins', img: '/src/assets/plumbing.jpeg', tab: 'Repair' },
    { title: 'Drain Cleaning', price: '₹599', rating: '4.7', reviews: '1.8k', duration: '1-2 hours', img: '/src/assets/plumbing.jpeg', tab: 'Repair' },
    { title: 'Pipe Replacement', price: '₹1,499', rating: '4.8', reviews: '420', duration: '3-4 hours', img: '/src/assets/plumbing.jpeg', tab: 'Repair' },
    { title: 'Water Heater Service', price: '₹899', rating: '4.9', reviews: '950', duration: '2 hours', img: '/src/assets/plumbing.jpeg', tab: 'Installation' },
    { title: 'Toilet Installation', price: '₹1,299', rating: '4.8', reviews: '610', duration: '2-3 hours', img: '/src/assets/plumbing.jpeg', tab: 'Installation' },
    { title: 'Shower Fixture Repair', price: '₹399', rating: '4.7', reviews: '530', duration: '1 hour', img: '/src/assets/plumbing.jpeg', tab: 'Repair' },
    { title: 'Kitchen Sink Install', price: '₹999', rating: '4.8', reviews: '480', duration: '2 hours', img: '/src/assets/plumbing.jpeg', tab: 'Installation' },
    { title: 'Bathroom Caulking', price: '₹899', rating: '4.6', reviews: '340', duration: '2-3 hours', img: '/src/assets/plumbing.jpeg', tab: 'Installation' },
  ],
  'Cleaning': [
    { title: 'Regular Home Cleaning', price: '₹599', rating: '4.4', reviews: '5.2k', duration: '2 hours', img: '/src/assets/cleaning.jpg', tab: 'Regular' },
    { title: 'Home Deep Cleaning', price: '₹2,499', rating: '4.8', reviews: '1.2k', duration: '4-5 hours', img: '/src/assets/cleaning.jpg', tab: 'Deep Cleaning' },
    { title: 'Kitchen Deep Clean', price: '₹1,299', rating: '4.7', reviews: '850', duration: '3 hours', img: '/src/assets/cleaning.jpg', tab: 'Deep Cleaning' },
    { title: 'Bathroom Deep Clean', price: '₹899', rating: '4.7', reviews: '1.1k', duration: '2 hours', img: '/src/assets/cleaning.jpg', tab: 'Deep Cleaning' },
    { title: 'Carpet Cleaning', price: '₹1,499', rating: '4.6', reviews: '620', duration: '2-3 hours', img: '/src/assets/cleaning.jpg', tab: 'Specialized' },
    { title: 'Sofa Cleaning', price: '₹799', rating: '4.8', reviews: '1.4k', duration: '1-2 hours', img: '/src/assets/cleaning.jpg', tab: 'Specialized' },
    { title: 'Window Cleaning', price: '₹499', rating: '4.5', reviews: '720', duration: '2 hours', img: '/src/assets/cleaning.jpg', tab: 'Regular' },
    { title: 'Floor Polishing', price: '₹2,999', rating: '4.9', reviews: '240', duration: '5 hours', img: '/src/assets/cleaning.jpg', tab: 'Specialized' },
    { title: 'Move-In Cleaning', price: '₹5,499', rating: '4.9', reviews: '410', duration: '7 hours', img: '/src/assets/cleaning.jpg', tab: 'Deep Cleaning' },
    { title: 'Post-Construction', price: '₹8,999', rating: '4.7', reviews: '120', duration: 'Full Day', img: '/src/assets/cleaning.jpg', tab: 'Deep Cleaning' },
    { title: 'Appliance Cleaning', price: '₹699', rating: '4.6', reviews: '530', duration: '1.5 hours', img: '/src/assets/cleaning.jpg', tab: 'Regular' },
    { title: 'Balcony Cleaning', price: '₹399', rating: '4.5', reviews: '640', duration: '1 hour', img: '/src/assets/cleaning.jpg', tab: 'Regular' },
    { title: 'Water Tank Cleaning', price: '₹1,199', rating: '4.8', reviews: '280', duration: '3 hours', img: '/src/assets/cleaning.jpg', tab: 'Specialized' },
    { title: 'Mattress Cleaning', price: '₹999', rating: '4.7', reviews: '340', duration: '1.5 hours', img: '/src/assets/cleaning.jpg', tab: 'Specialized' },
    { title: 'Office Cleaning', price: '₹4,499', rating: '4.9', reviews: '180', duration: '5 hours', img: '/src/assets/cleaning.jpg', tab: 'Regular' },
  ],
  'Painting': [
    { title: 'Interior Wall Painting', price: '₹9,999', rating: '4.8', reviews: '320', duration: '2-3 Days', img: '/src/assets/painting.png', tab: 'Full House' },
    { title: 'Exterior Painting', price: '₹14,999', rating: '4.7', reviews: '140', duration: '5 Days', img: '/src/assets/painting.png', tab: 'Full House' },
    { title: 'Ceiling Painting', price: '₹2,499', rating: '4.6', reviews: '230', duration: '1 Day', img: '/src/assets/painting.png', tab: 'Stencil' },
    { title: 'Furniture Painting', price: '₹3,299', rating: '4.9', reviews: '180', duration: '2 Days', img: '/src/assets/painting.png', tab: 'Stencil' },
    { title: 'Waterproofing', price: '₹6,499', rating: '4.8', reviews: '95', duration: '3 Days', img: '/src/assets/painting.png', tab: 'Expert' },
    { title: 'Wallpaper Installation', price: '₹1,899', rating: '4.9', reviews: '210', duration: '1 Day', img: '/src/assets/painting.png', tab: 'Expert' },
  ],
  'AC Repair': [
    { title: 'AC Installation', price: '₹999', rating: '4.8', reviews: '1.2k', duration: '2 hours', img: '/src/assets/ac.png', tab: 'Installation' },
    { title: 'Gas Refilling', price: '₹2,499', rating: '4.9', reviews: '850', duration: '1 hour', img: '/src/assets/ac.png', tab: 'Repair' },
    { title: 'Deep Cleaning', price: '₹599', rating: '4.7', reviews: '2.4k', duration: '1.5 hours', img: '/src/assets/ac.png', tab: 'Servicing' },
    { title: 'Filter Replacement', price: '₹299', rating: '4.6', reviews: '930', duration: '30 mins', img: '/src/assets/ac.png', tab: 'Servicing' },
    { title: 'Thermostat Repair', price: '₹899', rating: '4.7', reviews: '420', duration: '1 hour', img: '/src/assets/ac.png', tab: 'Repair' },
    { title: 'Split AC Repair', price: '₹1,299', rating: '4.8', reviews: '610', duration: '2 hours', img: '/src/assets/ac.png', tab: 'Repair' },
    { title: 'Window AC Repair', price: '₹999', rating: '4.8', reviews: '480', duration: '2 hours', img: '/src/assets/ac.png', tab: 'Repair' },
    { title: 'PCB Repair', price: '₹2,999', rating: '4.9', reviews: '150', duration: '1 Day', img: '/src/assets/ac.png', tab: 'Repair' },
    { title: 'Duct Cleaning', price: '₹4,999', rating: '4.9', reviews: '85', duration: '4 hours', img: '/src/assets/ac.png', tab: 'Servicing' },
    { title: 'Annual Maintenance', price: '₹8,999', rating: '5.0', reviews: '60', duration: 'Yearly', img: '/src/assets/ac.png', tab: 'Servicing' },
  ],
  'Carpentry': [
    { title: 'Door Repair', price: '₹499', rating: '4.8', reviews: '1.4k', duration: '2 hours', img: '/src/assets/carpentry-hero.png', tab: 'Repair' },
    { title: 'Window Frame Fix', price: '₹699', rating: '4.7', reviews: '820', duration: '3 hours', img: '/src/assets/carpentry-hero.png', tab: 'Repair' },
    { title: 'Cabinet Install', price: '₹4,499', rating: '4.9', reviews: '240', duration: '1 Day', img: '/src/assets/carpentry-hero.png', tab: 'Installation' },
    { title: 'Wardrobe Assembly', price: '₹2,999', rating: '4.8', reviews: '530', duration: '5 hours', img: '/src/assets/carpentry-hero.png', tab: 'Installation' },
    { title: 'Furniture Repair', price: '₹899', rating: '4.7', reviews: '1.2k', duration: '2-3 hours', img: '/src/assets/carpentry-hero.png', tab: 'Repair' },
    { title: 'Shelf Installation', price: '₹1,299', rating: '4.9', reviews: '640', duration: '2 hours', img: '/src/assets/carpentry-hero.png', tab: 'Installation' },
    { title: 'Baseboard Repair', price: '₹799', rating: '4.6', reviews: '310', duration: '2 hours', img: '/src/assets/carpentry-hero.png', tab: 'Repair' },
    { title: 'Wood Flooring', price: '₹15,999', rating: '4.9', reviews: '110', duration: '3 Days', img: '/src/assets/carpentry-hero.png', tab: 'Installation' },
    { title: 'False Ceiling', price: '₹12,499', rating: '5.0', reviews: '85', duration: '4 Days', img: '/src/assets/carpentry-hero.png', tab: 'Installation' },
  ],
};

export default function SubServices({ category, onNavigate, onReady }) {
  const [activeTab, setActiveTab] = useState('All');
  const [favorites, setFavorites] = useState(new Set());
  // Track loaded images by title (not index) so tab switching doesn't break state
  const [loadedImages, setLoadedImages] = useState(new Set());
  // Ref to ensure onReady is only called once per mount — prevents blinking
  const readyCalled = useRef(false);

  const services = ALL_SUBSERVICES[category] || [];

  // Reset when category changes
  useEffect(() => {
    readyCalled.current = false;
  }, [category]);

  // Call onReady immediately on mount for "issue-only" loading behavior
  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);

  const tabs = useMemo(() => {
    const uniqueTabs = ['All', ...new Set(services.map(s => s.tab))];
    return uniqueTabs;
  }, [services]);

  const filteredServices = services.filter(s => activeTab === 'All' || s.tab === activeTab);

  const handleImageLoad = (title) => {
    setLoadedImages(prev => new Set(prev).add(title));
  };

  if (!category || services.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className="material-symbols-outlined">sentiment_dissatisfied</span>
        <h2>No services found</h2>
        <p>We couldn't find services for this category.</p>
        <button onClick={() => onNavigate('services')}>Browse All Services</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.topBar}>
            <button className={styles.iconBtn} onClick={() => onNavigate('services')} aria-label="Go back">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1>{category} Services</h1>
            <button className={styles.iconBtn} aria-label="Filter">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>

          <div className={styles.tabsContainer} role="tablist">
            {tabs.map(tab => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'All' ? 'All Services' : tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className={styles.content}>
        {filteredServices.length === 0 ? (
          <div className={styles.emptyTab}>
            <span className="material-symbols-outlined">search_off</span>
            <p>No services in this tab.</p>
          </div>
        ) : (
          filteredServices.map((service) => {
            const isLoaded = loadedImages.has(service.title);
            return (
              <div key={service.title} className={styles.serviceCard}>
                <div className={`${styles.imageWrapper} ${!isLoaded ? styles.skeleton : ''}`}>
                  <img
                    src={service.img}
                    alt={service.title}
                    className={`${styles.serviceImage} ${isLoaded ? styles.loaded : styles.loading}`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(service.title)}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695ce2958?w=800&q=80';
                      e.target.onerror = null;
                      handleImageLoad(service.title);
                    }}
                  />
                  <div className={styles.ratingBadge}>
                    <span className="material-symbols-outlined">star</span>
                    {service.rating}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <div className={styles.titleInfo}>
                      <h3>{service.title}</h3>
                      <p className={styles.reviewsText}>{service.reviews} reviews • {service.duration}</p>
                    </div>
                    <div className={styles.priceTag}>{service.price}</div>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      className={styles.viewDetailsBtn}
                      onClick={() => onNavigate('service-details', { ...service, category })}
                    >
                      View Details
                    </button>
                    <button
                      className={`${styles.favoriteBtn} ${favorites.has(service.title) ? styles.favorited : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFavorites(prev => {
                          const next = new Set(prev);
                          if (next.has(service.title)) next.delete(service.title);
                          else next.add(service.title);
                          return next;
                        });
                      }}
                      aria-label={favorites.has(service.title) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <span className="material-symbols-outlined">
                        {favorites.has(service.title) ? 'favorite' : 'favorite'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

    </div>
  );
}
