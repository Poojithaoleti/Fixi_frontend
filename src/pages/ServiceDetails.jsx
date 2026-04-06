import React, { useState, useEffect } from 'react';
import styles from './ServiceDetails.module.css';

export default function ServiceDetails({ service, onNavigate, onReady }) {
  const [selectedPackage, setSelectedPackage] = useState('Standard');

  // Trigger ready signal instantly for this page
  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);

  if (!service) {
    return (
      <div className={styles.errorState}>
        <span className="material-symbols-outlined">error_outline</span>
        <h2>Service not found</h2>
        <p>We couldn't load the service details.</p>
        <button onClick={() => onNavigate('services')}>Browse Services</button>
      </div>
    );
  }

  // Fix: parse price safely by stripping all commas
  const parsePrice = (priceStr) => parseInt(priceStr.replace(/[₹,]/g, ''), 10) || 0;
  const basePrice = parsePrice(service.price);

  const packages = [
    {
      id: 'Basic',
      name: 'Basic Package',
      description: 'Essential service covering core requirements.',
      price: Math.round(basePrice * 0.7),
      icon: 'electric_bolt',
    },
    {
      id: 'Standard',
      name: 'Standard Package',
      description: 'Our most popular choice with added care.',
      price: basePrice,
      icon: 'stars',
      popular: true,
    },
    {
      id: 'Premium',
      name: 'Premium Package',
      description: 'Complete top-to-bottom service with premium care.',
      price: Math.round(basePrice * 1.5),
      icon: 'diamond',
    }
  ];

  const currentPrice = packages.find(p => p.id === selectedPackage)?.price ?? basePrice;

  const descriptions = {
    'Electrical': `Our certified electricians handle everything from diagnostic repairs to full system upgrades. Precision wiring, panel inspections, and modern fixture installations — all backed by a satisfaction guarantee.`,
    'Plumbing': `Reliable plumbing solutions for all your home needs. From fixing minor leaks and clogged drains to complete pipe replacements and appliance installations.`,
    'Cleaning': `Our comprehensive deep cleaning service covers every corner of your home. We use eco-friendly products to remove tough stains, sanitize surfaces, and leave your space sparkling.`,
    'Painting': `Give your home a fresh new look with expert color consultation, surface preparation, and a flawless finish for both interior and exterior walls.`,
    'AC Repair': `Keep your home cool with expert AC servicing. We handle everything from gas refilling and filter cleaning to complex PCB repairs and new installations.`,
    'Carpentry': `Expert carpentry for repairs, installations, and furniture assembly. Quality craftsmanship you can count on.`
  };

  const category = service.category || service._category || '';
  const providerNames = {
    'Cleaning': 'SparkleClean Solutions',
    'Electrical': 'VoltMaster Pro',
    'Plumbing': 'FlowGuard Plumbing',
    'Painting': 'FinishExpert Pro',
    'AC Repair': 'CoolAir Solutions',
    'Carpentry': 'WoodCraft Masters',
  };

  const dynamicDescription = descriptions[category] || `Professional ${service.title.toLowerCase()} service delivered by our top-rated technicians, with 100% customer satisfaction guaranteed.`;
  const providerName = providerNames[category] || 'Homezy Pro Provider';

  return (
    <div className={styles.container}>
      {/* Hero Image */}
      <div className={styles.hero}>
        <img src={service.img} alt={service.title} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <button className={styles.circleBtn} onClick={() => onNavigate('subservices')} aria-label="Go back">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className={styles.heroActions}>
            <button className={styles.circleBtn} aria-label="Share">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={styles.content}>
        <div className={styles.badge}>TOP RATED</div>

        <div className={styles.titleRow}>
          <h1>{service.title}</h1>
          <div className={styles.rating}>
            <span className="material-symbols-outlined">star</span>
            <strong>{service.rating}</strong>
            <span>({service.reviews})</span>
          </div>
        </div>

        {/* Provider Card */}
        <div className={styles.providerCard}>
          <div className={styles.providerAvatar}>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${providerName}`} alt={providerName} />
          </div>
          <div className={styles.providerInfo}>
            <h3>{providerName}</h3>
            <p>Professional Provider • 5 yrs exp.</p>
          </div>
          <div className={styles.basePrice}>₹{currentPrice.toLocaleString('en-IN')}</div>
        </div>

        {/* About */}
        <section className={styles.section}>
          <h2>About this service</h2>
          <p className={styles.description}>{dynamicDescription}</p>
        </section>

        {/* Packages */}
        <section className={styles.section}>
          <h2>Service Packages</h2>
          <div className={styles.packagesList}>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`${styles.packageCard} ${selectedPackage === pkg.id ? styles.selectedPackage : ''} ${pkg.popular ? styles.popularCard : ''}`}
                onClick={() => setSelectedPackage(pkg.id)}
                role="radio"
                aria-checked={selectedPackage === pkg.id}
              >
                {pkg.popular && <div className={styles.popularBadge}>POPULAR</div>}
                <div className={styles.pkgIcon}>
                  <span className="material-symbols-outlined">{pkg.icon}</span>
                </div>
                <div className={styles.pkgInfo}>
                  <h4>{pkg.name}</h4>
                  <p>{pkg.description}</p>
                </div>
                <div className={styles.pkgPrice}>₹{pkg.price.toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className={styles.section}>
          <h2>Service Location</h2>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapOverlay}>
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <p className={styles.mapLabel}>Tap to choose your address</p>
          </div>
        </section>
      </main>

      {/* Bottom CTA Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.priceSummary}>
          <p>TOTAL PRICE</p>
          <div className={styles.totalPrice}>₹{currentPrice.toLocaleString('en-IN')}</div>
        </div>
        <button className={styles.bookBtn} onClick={() => onNavigate('bookings')}>
          Book Now
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
