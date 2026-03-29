import { useState, useEffect, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Services from './pages/Services'
import BookingConfirmation from './pages/BookingConfirmation'
import Home from './pages/Home'
import SubServices from './pages/SubServices'
import ServiceDetails from './pages/ServiceDetails'
import LoadingScreen from './components/LoadingScreen'
import BottomNavigation from './components/BottomNavigation'
import Sidebar from './components/Sidebar'
import './app.css'

// Configuration for loading behavior
const LOADING_PAGES = new Set(['subservices', 'service-details']);
const LOADING_THRESHOLD = 450; // High enough to hide for all "normal" local/fast loads
const MIN_DISPLAY_TIME = 800;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  
  // Responsive state
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  
  // Loading state tracking
  const [loadingCtx, setLoadingCtx] = useState(null);
  const [pendingNav, setPendingNav] = useState(null);
  const [isContentReady, setIsContentReady] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main navigation side-effect
  useEffect(() => {
    if (!pendingNav) return;

    const { page, context } = pendingNav;
    let thresholdTimer = null;
    let fallbackTimer = null;

    // 1. Threshold logic: Don't show the loader for the first 250ms
    thresholdTimer = setTimeout(() => {
      if (!isContentReady) {
        // Still not ready! Show the loading screen now.
        const cat = page === 'subservices' ? context : (context?.category || context?._category || selectedCategory);
        const serviceName = page === 'service-details' ? context?.title : null;
        setLoadingCtx({ page, category: cat, service: serviceName, isExiting: false });
        setStartTime(Date.now());
      }
    }, LOADING_THRESHOLD);

    // 2. Transition logic: Triggered when content reports it is ready
    if (isContentReady) {
      const performTransition = () => {
        if (page === 'subservices' && context) setSelectedCategory(context);
        if (page === 'service-details' && context) {
          setSelectedService({ ...context, _category: selectedCategory });
        }
        setCurrentPage(page);
        window.scrollTo(0, 0);

        // If the loader was shown, fade it out gracefully
        if (loadingCtx) {
          setLoadingCtx(prev => ({ ...prev, isExiting: true }));
          setTimeout(() => {
            setLoadingCtx(null);
            setPendingNav(null);
            setIsContentReady(false);
          }, 300);
        } else {
          // If no loader was shown, just cleanup pending
          setPendingNav(null);
          setIsContentReady(false);
          if (thresholdTimer) clearTimeout(thresholdTimer);
        }
      };

      // Ensure minimal duration if loader is active to prevent flashes
      const elapsed = loadingCtx ? (Date.now() - startTime) : 1000;
      const remaining = loadingCtx ? Math.max(0, MIN_DISPLAY_TIME - elapsed) : 0;
      
      const transitionTimer = setTimeout(performTransition, remaining);
      return () => clearTimeout(transitionTimer);
    }

    // 3. Absolute fallback (e.g. 10s if component fails to signal ready)
    fallbackTimer = setTimeout(() => setIsContentReady(true), 10000);

    return () => {
      if (thresholdTimer) clearTimeout(thresholdTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [pendingNav, isContentReady, loadingCtx, startTime, selectedCategory]);

  const handleContentReady = () => setIsContentReady(true);

  // Main navigation logic
  const navigateTo = (page, context = null) => {
    // 1. Handle actual page transition immediately
    if (page === 'subservices' && context) setSelectedCategory(context);
    if (page === 'service-details' && context) {
      setSelectedService({ ...context, _category: selectedCategory });
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);

    // 2. Handle "Issue Detection" (Loading Screen)
    if (LOADING_PAGES.has(page)) {
      setPendingNav({ page, context });
      setIsContentReady(false);
      setStartTime(Date.now());
    } else {
      setPendingNav(null);
      setLoadingCtx(null);
    }
  };

  // Grace period / Issue detection effect
  useEffect(() => {
    if (!pendingNav || isContentReady) {
      // If we're done or nothing is pending, cleanup
      if (isContentReady && loadingCtx) {
        // Only if the loader was actually shown, fade it out
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);
        
        const cleanupTimer = setTimeout(() => {
          setLoadingCtx(prev => (prev ? { ...prev, isExiting: true } : null));
          setTimeout(() => {
            setLoadingCtx(null);
            setPendingNav(null);
          }, 300);
        }, remaining);
        return () => clearTimeout(cleanupTimer);
      } else if (isContentReady) {
        setPendingNav(null);
      }
      return;
    }

    // Start the grace period timer
    const thresholdTimer = setTimeout(() => {
      if (!isContentReady && pendingNav) {
        const { page, context } = pendingNav;
        const cat = page === 'subservices' ? context : (context?._category || selectedCategory);
        const sName = page === 'service-details' ? context?.title : null;
        
        setLoadingCtx({ page, category: cat, service: sName, isExiting: false });
        setStartTime(Date.now());
      }
    }, LOADING_THRESHOLD);

    return () => clearTimeout(thresholdTimer);
  }, [pendingNav, isContentReady, loadingCtx, startTime, selectedCategory]);

  return (
    <div className={`app-shell ${isDesktop ? 'desktop-layout' : 'mobile-layout'}`}>
      {isDesktop && <Sidebar activeNav={currentPage} onNavigate={navigateTo} />}
      
      <main className="app-frame" style={{ marginLeft: isDesktop ? '280px' : '0' }}>
        {currentPage === 'home' && <Home onNavigate={navigateTo} />}
        {currentPage === 'services' && <Services onNavigate={navigateTo} />}
        {currentPage === 'subservices' && (
          <SubServices 
            category={selectedCategory} 
            onNavigate={navigateTo} 
            onReady={handleContentReady} 
          />
        )}
        {currentPage === 'service-details' && (
          <ServiceDetails 
            service={selectedService} 
            onNavigate={navigateTo} 
            onReady={handleContentReady}
          />
        )}
        {currentPage === 'bookings' && <BookingConfirmation onNavigate={navigateTo} />}
        {currentPage === 'profile' && (
          <div className="placeholder-page">
            <span className="material-symbols-outlined">person</span>
            <h2>Profile</h2>
            <p>Coming soon!</p>
            <button onClick={() => navigateTo('home')}>Go Home</button>
          </div>
        )}

        {!isDesktop && <BottomNavigation activeNav={currentPage} onNavigate={navigateTo} />}

        {loadingCtx && (
          <LoadingScreen
            category={loadingCtx.category}
            service={loadingCtx.service}
            isExiting={loadingCtx.isExiting}
          />
        )}
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
