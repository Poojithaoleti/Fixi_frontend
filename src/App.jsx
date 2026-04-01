import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTop from './components/ScrollToTop';

// Phase 1 — Public
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AboutPage from './pages/AboutPage';
import BecomeProPage from './pages/BecomeProPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import PrivacyTerms from './pages/PrivacyTerms';
import NotFoundPage from './pages/NotFoundPage';

// Phase 2 — Auth
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import OTPVerification from './pages/auth/OTPVerification';
import ForgotPassword from './pages/auth/ForgotPassword';

// Phase 2 — Customer Dashboard
import DashboardHome from './pages/dashboard/DashboardHome';
import UserProfile from './pages/dashboard/UserProfile';
import BookingFlow from './pages/dashboard/BookingFlow';
import BookingConfirmation from './pages/dashboard/BookingConfirmation';
import ActiveBookings from './pages/dashboard/ActiveBookings';
import LiveTracking from './pages/dashboard/LiveTracking';
import BookingHistory from './pages/dashboard/BookingHistory';
import RatingsReviews from './pages/dashboard/RatingsReviews';
import ProPublicProfile from './pages/dashboard/ProPublicProfile';
import PaymentMethods from './pages/dashboard/PaymentMethods';
import WalletCredits from './pages/dashboard/WalletCredits';
import Notifications from './pages/dashboard/Notifications';
import ReferralProgram from './pages/dashboard/ReferralProgram';
import HelpCenter from './pages/dashboard/HelpCenter';


// Phase 3 — Pro Portal
import ProRegistration from './pages/pro/ProRegistration';
import ProDashboard from './pages/pro/ProDashboard';
import ProJobLeads from './pages/pro/ProJobLeads';
import ProJobDetail from './pages/pro/ProJobDetail';
import ProSchedule from './pages/pro/ProSchedule';
import ProEarnings from './pages/pro/ProEarnings';
import ProAnalytics from './pages/pro/ProAnalytics';
import ProServiceArea from './pages/pro/ProServiceArea';
import ProNotifications from './pages/pro/ProNotifications';


// Phase 4 — Admin Portal
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProviders from './pages/admin/AdminProviders';
import AdminBookings from './pages/admin/AdminBookings';
import AdminPricing from './pages/admin/AdminPricing';
import AdminPromotions from './pages/admin/AdminPromotions';
import AdminReviews from './pages/admin/AdminReviews';
import AdminTickets from './pages/admin/AdminTickets';
import AdminZones from './pages/admin/AdminZones';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';

import Footer from './components/Footer';
import './index.css';

// Pages that hide the public navbar+footer entirely
const FULLSCREEN_ROUTES = [
  '/login', '/signup', '/otp', '/forgot-password',
  '/dashboard', '/dashboard/', '/booking',
  '/pro/',
  '/admin',
];

function isFullscreen(pathname) {
  return FULLSCREEN_ROUTES.some(p => pathname.startsWith(p));
}

function AppShell() {
  const location = useLocation();
  const fullscreen = isFullscreen(location.pathname);

  return (
    <div style={{ minHeight: '100vh' }}>
      {!fullscreen && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Phase 1 — Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/become-pro" element={<BecomeProPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyTerms />} />

          {/* Phase 2 — Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Phase 2 — Customer Dashboard */}
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/profile" element={<UserProfile />} />
          <Route path="/dashboard/active-bookings" element={<ActiveBookings />} />
          <Route path="/dashboard/live-tracking" element={<LiveTracking />} />
          <Route path="/dashboard/booking-history" element={<BookingHistory />} />
          <Route path="/dashboard/ratings" element={<RatingsReviews />} />
          <Route path="/dashboard/payment-methods" element={<PaymentMethods />} />
          <Route path="/dashboard/wallet" element={<WalletCredits />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/referral" element={<ReferralProgram />} />
          <Route path="/dashboard/help" element={<HelpCenter />} />
          <Route path="/booking/flow" element={<BookingFlow />} />
          <Route path="/booking/confirmed" element={<BookingConfirmation />} />
          <Route path="/pro/ravi-kumar" element={<ProPublicProfile />} />

          {/* Phase 3 — Pro Portal (routes added as built) */}


          {/* Phase 3 — Pro Portal */}
          <Route path="/pro/register" element={<ProRegistration />} />
          <Route path="/pro/dashboard" element={<ProDashboard />} />
          <Route path="/pro/job-leads" element={<ProJobLeads />} />
          <Route path="/pro/job-detail" element={<ProJobDetail />} />
          <Route path="/pro/schedule" element={<ProSchedule />} />
          <Route path="/pro/earnings" element={<ProEarnings />} />
          <Route path="/pro/analytics" element={<ProAnalytics />} />
          <Route path="/pro/area" element={<ProServiceArea />} />
          <Route path="/pro/notifications" element={<ProNotifications />} />


          {/* Phase 4 — Admin Portal */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/providers" element={<AdminProviders />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/pricing" element={<AdminPricing />} />
          <Route path="/admin/promotions" element={<AdminPromotions />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/tickets" element={<AdminTickets />} />
          <Route path="/admin/zones" element={<AdminZones />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/audit" element={<AdminAuditLogs />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      {!fullscreen && <FloatingCTA />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}
