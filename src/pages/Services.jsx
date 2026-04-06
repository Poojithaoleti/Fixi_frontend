import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import styles from './Services.module.css';

export default function Services({ onNavigate }) {
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { 
      id: 1, 
      name: 'Electrical', 
      icon: 'electrical_services', 
      color: '#d97706',
      bgColor: '#fef3c7',
      count: '12 Services',
      subservices: [
        'Wiring Repair & Replacement', 'Electrical Panel Upgrade / Repair',
        'Outlet & Switch Installation', 'Ceiling Fan Installation',
        'Light Fixture Installation', 'Exhaust Fan Installation',
        'Circuit Breaker Repair', 'Home Security Camera Installation',
        'Smoke & Carbon Monoxide Detector Upgrade', 'EV Charger Installation',
        'Doorbell & Intercom Wiring', 'Smart Home Electrical Setup'
      ]
    },
    { 
      id: 2, 
      name: 'Plumbing', 
      icon: 'plumbing', 
      color: '#2563eb',
      bgColor: '#dbeafe',
      count: '8 Services',
      subservices: [
        'Leaky Faucet Repair', 'Drain Cleaning & Unclogging',
        'Pipe Repair & Replacement', 'Water Heater Installation & Repair',
        'Toilet Repair & Installation', 'Shower & Bathtub Fixture Repair',
        'Kitchen Sink & Garbage Disposal Install', 'Bathroom & Kitchen Caulking'
      ]
    },
    { 
      id: 3, 
      name: 'Cleaning', 
      icon: 'cleaning_services', 
      color: '#059669',
      bgColor: '#d1fae5',
      count: '15 Services',
      subservices: [
        'Regular Home Cleaning', 'Deep Cleaning', 'Kitchen Deep Clean',
        'Bathroom Deep Clean', 'Carpet & Rug Cleaning', 'Sofa / Upholstery Cleaning',
        'Window & Glass Cleaning', 'Floor Cleaning & Polishing',
        'Move-In / Move-Out Cleaning', 'Post-Construction Cleaning',
        'Appliance Cleaning (Fridge, Oven, etc.)', 'Balcony & Terrace Cleaning',
        'Water Tank Cleaning', 'Mattress Cleaning', 'Office / Commercial Cleaning'
      ]
    },
    { 
      id: 4, 
      name: 'Painting', 
      icon: 'format_paint', 
      color: '#e11d48',
      bgColor: '#ffe4e6',
      count: '6 Services',
      subservices: [
        'Interior Wall Painting', 'Exterior / Facade Painting',
        'Ceiling Painting', 'Wood & Furniture Painting',
        'Waterproofing & Texture Coating', 'Wallpaper Installation & Removal'
      ]
    },
    { 
      id: 5, 
      name: 'AC Repair', 
      icon: 'ac_unit', 
      color: '#0891b2',
      bgColor: '#cffafe',
      count: '10 Services',
      subservices: [
        'AC Installation', 'AC Gas Refilling / Recharging',
        'AC Deep Cleaning & Servicing', 'AC Filter Replacement',
        'AC Thermostat Repair', 'Split AC Repair', 'Window AC Repair',
        'AC PCB / Circuit Board Repair', 'AC Duct Cleaning',
        'Annual AC Maintenance Contract'
      ]
    },
    { 
      id: 6, 
      name: 'Carpentry', 
      icon: 'handyman', 
      color: '#7c3aed',
      bgColor: '#ede9fe',
      count: '9 Services',
      subservices: [
        'Door Repair & Installation', 'Window Frame Repair',
        'Kitchen Cabinet Installation & Repair', 'Wardrobe / Closet Assembly',
        'Furniture Assembly & Repair', 'Shelf & Storage Unit Installation',
        'Baseboard & Trim Repair', 'Wood Flooring Installation',
        'False Ceiling / POP Work'
      ]
    },
  ];

  const filteredCategories = categories.filter(category => {
    const matchesCategory = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubservices = category.subservices.some(sub =>
      sub.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCategory || matchesSubservices;
  });

  const toggleExpand = (id, e) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.topRow}>
            <button className={styles.backButton} onClick={() => onNavigate('home')} aria-label="Go back">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className={styles.backButton} aria-label="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>

          <div className={styles.titleSection}>
            <h1>Our Services</h1>
            <p>Find the right expert for your home needs</p>
          </div>

          <div className={styles.searchBar}>
            <span className={`${styles.searchIcon} material-symbols-outlined`}>search</span>
            <input
              type="text"
              placeholder="Search for a service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search services"
            />
            {searchQuery && (
              <button className={styles.clearBtn} onClick={() => setSearchQuery('')} aria-label="Clear search">
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className={styles.categoriesSection}>
        {filteredCategories.length > 0 ? (
          <div className={styles.categoryGrid}>
            {filteredCategories.map((category) => {
              const isExpanded = expandedId === category.id;
              const isSearching = searchQuery.length > 1;
              const subMatches = category.subservices.filter(sub =>
                sub.toLowerCase().includes(searchQuery.toLowerCase())
              );

              return (
                <div
                  key={category.id}
                  className={`${styles.categoryCard} ${isExpanded ? styles.expanded : ''}`}
                  onClick={() => onNavigate('subservices', category.name)}
                >
                  <div className={styles.cardHeader}>
                    <div
                      className={styles.categoryIcon}
                      style={{ backgroundColor: category.bgColor, color: category.color }}
                    >
                      <span className="material-symbols-outlined">{category.icon}</span>
                    </div>
                    <div className={styles.cardTitleInfo}>
                      <h3>{category.name}</h3>
                      <p>{category.count}</p>
                    </div>
                    <button
                      className={styles.expandButton}
                      onClick={(e) => toggleExpand(category.id, e)}
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      <span className="material-symbols-outlined">
                        {isExpanded ? 'expand_less' : 'chevron_right'}
                      </span>
                    </button>
                  </div>

                  {/* Subservices accordion — wired up */}
                  <div className={`${styles.subservicesList} ${(isExpanded || (isSearching && subMatches.length > 0)) ? styles.show : ''}`}>
                    <div className={styles.subservicesListInner}>
                      {(isSearching && subMatches.length > 0 ? subMatches : category.subservices).map((sub, i) => (
                        <div key={i} className={`${styles.subserviceItem} ${isSearching && subMatches.includes(sub) ? styles.highlighted : ''}`}>
                          <span className="material-symbols-outlined">chevron_right</span>
                          {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noResults}>
            <span className="material-symbols-outlined">sentiment_dissatisfied</span>
            <p>No services found matching your search.</p>
          </div>
        )}
      </main>

    </div>
  );
}
