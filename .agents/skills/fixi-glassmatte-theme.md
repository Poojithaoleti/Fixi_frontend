# FIXI — Glass-Matte Purple Theme Skill

**Version:** 1.0  
**Stack:** React 19 + Vite + Framer Motion + Lucide React  
**Applies to:** All 52 screens across Public, Auth, Customer Dashboard, Pro Portal, Admin Panel  
**Theme Name:** `glassmatte-purple`  
**Style Fusion:** Glassmorphism + Matte Frosted Purple + Soft Luminance

---

## ⚠️ SKILL USAGE RULES

**Read this entire file before writing or modifying any FIXI component.**

1. Replace ALL hardcoded hex colors with CSS variables defined in Section 1.
2. Replace emoji icons (❄️ 🔧 ⚡ etc.) with Lucide React SVG icons.
3. Every component must use `backdrop-filter` + `rgba` backgrounds — no flat solid fills on cards.
4. Framer Motion transitions must follow the timing table in Section 5.
5. Run the Error Checklist (Section 8) before every code delivery.

---

## 1. DESIGN TOKENS — Replace Existing `index.css` `:root`

Paste this block at the top of `src/index.css`, replacing the existing `:root {}`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  /* ── Core Brand ── */
  --fixi-purple:        #3E2A56;
  --fixi-purple-mid:    #4D3569;
  --fixi-purple-light:  #6B4A8F;
  --fixi-purple-tint:   #EDE6F8;
  --fixi-purple-pale:   #F8F5FF;
  --fixi-purple-dark:   #2A1B3D;
  --fixi-purple-deep:   #1E1230;

  /* ── Text ── */
  --fixi-text-dark:     #1A1A2E;
  --fixi-text-body:     #2D2540;
  --fixi-muted:         #9B8AB0;
  --fixi-muted-light:   #B0A0C8;
  --fixi-white:         #FFFFFF;

  /* ── Status ── */
  --fixi-green:         #10B981;
  --fixi-green-tint:    rgba(16,185,129,0.12);
  --fixi-amber:         #F59E0B;
  --fixi-amber-tint:    rgba(245,158,11,0.12);
  --fixi-red:           #EF4444;
  --fixi-red-tint:      rgba(239,68,68,0.12);
  --fixi-gold:          #FBBF24;
  --fixi-blue:          #3B82F6;
  --fixi-blue-tint:     rgba(59,130,246,0.12);

  /* ── Glassmatte Surfaces ── */
  --glass-card:         rgba(255,255,255,0.72);
  --glass-card-hover:   rgba(255,255,255,0.88);
  --glass-card-dark:    rgba(42,27,61,0.55);
  --glass-sidebar:      rgba(30,18,48,0.82);
  --glass-sidebar-item: rgba(107,74,143,0.22);
  --glass-sidebar-active: rgba(107,74,143,0.45);
  --glass-navbar:       rgba(255,255,255,0.85);
  --glass-modal:        rgba(255,255,255,0.92);
  --glass-input:        rgba(255,255,255,0.65);
  --glass-input-focus:  rgba(255,255,255,0.92);
  --glass-overlay:      rgba(30,18,48,0.6);
  --glass-tint-card:    rgba(237,230,248,0.55);

  /* ── Gradients ── */
  --gradient-primary:   linear-gradient(135deg, #3E2A56 0%, #6B4A8F 100%);
  --gradient-deep:      linear-gradient(135deg, #3E2A56 0%, #2A1B3D 100%);
  --gradient-sidebar:   linear-gradient(180deg, #2A1B3D 0%, #1E1230 100%);
  --gradient-glow:      linear-gradient(135deg, rgba(107,74,143,0.35) 0%, rgba(62,42,86,0.15) 100%);
  --gradient-hero:      linear-gradient(135deg, #2A1B3D 0%, #3E2A56 45%, #6B4A8F 100%);
  --gradient-soft:      linear-gradient(135deg, #EDE6F8 0%, #F8F5FF 100%);
  --gradient-button:    linear-gradient(135deg, #5B3A7E 0%, #7B5A9F 100%);
  --gradient-danger:    linear-gradient(135deg, #EF4444 0%, #DC2626 100%);

  /* ── Borders ── */
  --border-glass:       1px solid rgba(255,255,255,0.35);
  --border-glass-dark:  1px solid rgba(107,74,143,0.25);
  --border-subtle:      1px solid rgba(237,230,248,0.8);
  --border-focus:       2px solid #6B4A8F;

  /* ── Shadows ── */
  --shadow-card:        0 4px 24px rgba(62,42,86,0.10), 0 1px 4px rgba(62,42,86,0.06);
  --shadow-card-hover:  0 8px 40px rgba(62,42,86,0.18), 0 2px 8px rgba(62,42,86,0.10);
  --shadow-modal:       0 16px 64px rgba(30,18,48,0.30), 0 4px 16px rgba(30,18,48,0.15);
  --shadow-navbar:      0 1px 20px rgba(62,42,86,0.10);
  --shadow-glow:        0 0 32px rgba(107,74,143,0.30);
  --shadow-input:       0 2px 8px rgba(62,42,86,0.06);
  --shadow-button:      0 4px 16px rgba(62,42,86,0.30);
  --shadow-sidebar:     4px 0 32px rgba(30,18,48,0.25);

  /* ── Blur ── */
  --blur-card:          blur(16px);
  --blur-navbar:        blur(20px);
  --blur-modal:         blur(24px);
  --blur-sidebar:       blur(32px);
  --blur-subtle:        blur(8px);

  /* ── Radius ── */
  --radius-sm:          8px;
  --radius:             12px;
  --radius-md:          16px;
  --radius-lg:          20px;
  --radius-xl:          24px;
  --radius-pill:        999px;

  /* ── Typography ── */
  --font-serif:         'DM Serif Display', serif;
  --font-sans:          'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;

  /* ── Spacing ── */
  --section-py:         clamp(56px, 8vw, 96px);
  --container-px:       clamp(16px, 4vw, 24px);

  /* ── Page Background ── */
  --page-bg:            #F4EEFF;
  --page-bg-mesh:       radial-gradient(ellipse at 20% 10%, rgba(107,74,143,0.18) 0%, transparent 55%),
                        radial-gradient(ellipse at 80% 90%, rgba(62,42,86,0.12) 0%, transparent 55%),
                        radial-gradient(ellipse at 50% 50%, rgba(237,230,248,0.3) 0%, transparent 70%),
                        #F4EEFF;
  --page-bg-dashboard:  radial-gradient(ellipse at 10% 0%, rgba(107,74,143,0.15) 0%, transparent 50%),
                        radial-gradient(ellipse at 90% 100%, rgba(62,42,86,0.10) 0%, transparent 50%),
                        #F0EBFC;
}
```

---

## 2. GLOBAL BASE STYLES — Add to `index.css` After `:root`

```css
/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  color: var(--fixi-text-dark);
  background: var(--page-bg-mesh);
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
  overflow-x: hidden;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  line-height: 1.2;
}

a { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; background: none; font-family: var(--font-sans); }
img { max-width: 100%; display: block; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: rgba(237,230,248,0.3); }
::-webkit-scrollbar-thumb { background: var(--fixi-purple-light); border-radius: 3px; }

/* ── Container ── */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--container-px);
}

/* ── Section Label Pill ── */
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(237,230,248,0.7);
  backdrop-filter: var(--blur-subtle);
  color: var(--fixi-purple);
  padding: 6px 16px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 16px;
  border: 1px solid rgba(107,74,143,0.15);
}

/* ── Dashboard Page Background ── */
.dashboard-page-bg {
  background: var(--page-bg-dashboard);
  background-attachment: fixed;
  min-height: 100vh;
}

/* ── Responsive Grids ── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

@media (max-width: 1024px) { .grid-4 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) {
  .grid-2 { grid-template-columns: 1fr; gap: 24px; }
  .grid-3 { grid-template-columns: 1fr; }
  .grid-4 { grid-template-columns: 1fr 1fr; }
  .desktop-nav { display: none !important; }
  .mobile-menu-btn { display: flex !important; }
  .timeline-line, .connector-line { display: none !important; }
  .pro-hero-grid, .dashboard-layout, .service-hero-grid { flex-direction: column !important; grid-template-columns: 1fr !important; }
  .sidebar-desktop { display: none !important; }
}
```

---

## 3. COMPONENT STYLE PATTERNS

Every component in the FIXI codebase must follow these exact patterns. These are inline-style equivalents (for Framer Motion JSX). All values map to CSS variables.

### 3.1 Glass Card (Standard)

```jsx
// Standard glass card — use for booking cards, service cards, stat cards
const glassCard = {
  background: 'var(--glass-card)',
  backdropFilter: 'var(--blur-card)',
  WebkitBackdropFilter: 'var(--blur-card)',
  border: 'var(--border-glass)',
  borderRadius: 'var(--radius)',
  boxShadow: 'var(--shadow-card)',
  padding: 20,
};

// Hover state (apply via Framer Motion whileHover or CSS :hover)
const glassCardHover = {
  background: 'var(--glass-card-hover)',
  boxShadow: 'var(--shadow-card-hover)',
  translateY: -2,
};
```

### 3.2 Glass Card Dark (Hero / Sidebar Widgets)

```jsx
const glassCardDark = {
  background: 'var(--glass-card-dark)',
  backdropFilter: 'var(--blur-card)',
  WebkitBackdropFilter: 'var(--blur-card)',
  border: '1px solid rgba(107,74,143,0.30)',
  borderRadius: 'var(--radius)',
  boxShadow: 'var(--shadow-card)',
  color: 'white',
};
```

### 3.3 Navbar

```jsx
const navbarStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  background: 'var(--glass-navbar)',
  backdropFilter: 'var(--blur-navbar)',
  WebkitBackdropFilter: 'var(--blur-navbar)',
  borderBottom: 'var(--border-glass)',
  boxShadow: 'var(--shadow-navbar)',
  height: 64,
  display: 'flex',
  alignItems: 'center',
};
```

### 3.4 Dashboard Sidebar

```jsx
const sidebarStyle = {
  width: 260,
  flexShrink: 0,
  background: 'var(--glass-sidebar)',
  backdropFilter: 'var(--blur-sidebar)',
  WebkitBackdropFilter: 'var(--blur-sidebar)',
  border: 'var(--border-glass-dark)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-sidebar)',
  padding: '24px 0',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 120px)',
  position: 'sticky',
  top: 88,
};

// Sidebar nav item — inactive
const sidebarItem = {
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '11px 20px',
  color: 'var(--fixi-muted-light)',
  borderRadius: 0,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

// Sidebar nav item — active
const sidebarItemActive = {
  ...sidebarItem,
  background: 'var(--glass-sidebar-active)',
  color: 'white',
  borderLeft: '3px solid white',
  paddingLeft: 17,
};
```

### 3.5 Primary Button

```jsx
const btnPrimary = {
  background: 'var(--gradient-button)',
  color: 'white',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  fontSize: 14,
  padding: '0 20px',
  height: 40,
  cursor: 'pointer',
  boxShadow: 'var(--shadow-button)',
  transition: 'all 0.2s ease',
  // On hover: translateY(-1px), shadow stronger
};

const btnOutlined = {
  background: 'transparent',
  color: 'var(--fixi-purple)',
  border: '1.5px solid var(--fixi-purple)',
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  fontSize: 14,
  padding: '0 20px',
  height: 40,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const btnGhost = {
  background: 'rgba(107,74,143,0.10)',
  color: 'var(--fixi-purple-light)',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  padding: '0 16px',
  height: 36,
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  fontSize: 13,
  cursor: 'pointer',
};
```

### 3.6 Input Field

```jsx
// Default state
const inputStyle = {
  width: '100%',
  background: 'var(--glass-input)',
  backdropFilter: 'var(--blur-subtle)',
  WebkitBackdropFilter: 'var(--blur-subtle)',
  border: 'var(--border-glass)',
  borderRadius: 'var(--radius-sm)',
  padding: '0 14px',
  height: 44,
  fontSize: 14,
  fontFamily: 'var(--font-sans)',
  color: 'var(--fixi-text-dark)',
  boxShadow: 'var(--shadow-input)',
  outline: 'none',
  transition: 'all 0.2s ease',
};

// Focus state — add via onFocus handler or CSS :focus
const inputFocusStyle = {
  background: 'var(--glass-input-focus)',
  border: 'var(--border-focus)',
  boxShadow: '0 0 0 4px rgba(107,74,143,0.12)',
};
```

### 3.7 Modal / Drawer

```jsx
const modalStyle = {
  background: 'var(--glass-modal)',
  backdropFilter: 'var(--blur-modal)',
  WebkitBackdropFilter: 'var(--blur-modal)',
  border: 'var(--border-glass)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-modal)',
  padding: 28,
};

const modalOverlay = {
  position: 'fixed', inset: 0,
  background: 'var(--glass-overlay)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  zIndex: 200,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
```

### 3.8 Status Badges

```jsx
// Map status → token colors; NEVER use hardcoded hex here
const badgeStyles = {
  'Active':      { background: 'var(--fixi-green-tint)',  color: 'var(--fixi-green)',  border: '1px solid rgba(16,185,129,0.20)' },
  'Pending':     { background: 'var(--fixi-amber-tint)',  color: '#92400E',            border: '1px solid rgba(245,158,11,0.20)' },
  'In Progress': { background: 'var(--fixi-blue-tint)',   color: 'var(--fixi-blue)',   border: '1px solid rgba(59,130,246,0.20)' },
  'Cancelled':   { background: 'rgba(156,163,175,0.15)',  color: '#6B7280',            border: '1px solid rgba(156,163,175,0.20)' },
  'Urgent':      { background: 'var(--fixi-amber-tint)',  color: '#B45309',            border: '1px solid rgba(245,158,11,0.20)' },
  'Error':       { background: 'var(--fixi-red-tint)',    color: 'var(--fixi-red)',    border: '1px solid rgba(239,68,68,0.20)' },
};

const badgeBase = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '3px 10px',
  borderRadius: 'var(--radius-pill)',
  fontSize: 12, fontWeight: 600,
};
```

### 3.9 Hero Section

```jsx
const heroSection = {
  background: 'var(--gradient-hero)',
  position: 'relative',
  overflow: 'hidden',
  // Decorative glow blobs — add as absolutely positioned divs
};

// Glow blobs inside hero (decorative only, pointer-events: none)
const glowBlob1 = {
  position: 'absolute', top: '-30%', right: '-10%',
  width: 500, height: 500,
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(107,74,143,0.35) 0%, transparent 70%)',
  pointerEvents: 'none',
};
const glowBlob2 = {
  position: 'absolute', bottom: '-20%', left: '5%',
  width: 350, height: 350,
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(62,42,86,0.40) 0%, transparent 70%)',
  pointerEvents: 'none',
};
```

### 3.10 Skeleton Loader

```jsx
// Add this keyframes to index.css:
// @keyframes fixi-shimmer {
//   0%   { background-position: -500px 0; }
//   100% { background-position: 500px 0; }
// }

const skeletonStyle = {
  background: 'linear-gradient(90deg, rgba(237,230,248,0.6) 25%, rgba(245,240,255,0.9) 50%, rgba(237,230,248,0.6) 75%)',
  backgroundSize: '1000px 100%',
  animation: 'fixi-shimmer 1.5s infinite linear',
  borderRadius: 'var(--radius-sm)',
};
```

---

## 4. ICON RULES — CRITICAL

**Problem in current codebase:** Multiple files use emoji as icons (`❄️`, `🔧`, `⚡`, `🏠`, `📅`, `🔍`, `👤`, `❓`, `🧹`, `🔨`, `🎨`). This is a PRD violation.

**Fix:** Replace every emoji icon with the correct Lucide React import.

### Emoji → Lucide Mapping

| Emoji | Replace With | Import Name |
|-------|-------------|-------------|
| ❄️ | `<AirVent />` | `AirVent` |
| 🔧 | `<Wrench />` | `Wrench` |
| ⚡ | `<Zap />` | `Zap` |
| 🧹 | `<Sparkles />` | `Sparkles` |
| 🔨 | `<Hammer />` | `Hammer` |
| 🎨 | `<Paintbrush />` | `Paintbrush` |
| 🏠 | `<Home />` | `Home` |
| 📅 | `<Calendar />` | `Calendar` |
| 🔍 | `<Search />` | `Search` |
| 👤 | `<User />` | `User` |
| ❓ | `<HelpCircle />` | `HelpCircle` |
| 🔔 | `<Bell />` | `Bell` |
| 💳 | `<CreditCard />` | `CreditCard` |
| 💰 | `<Wallet />` | `Wallet` |
| 🎁 | `<Gift />` | `Gift` |
| ⭐ | `<Star />` | `Star` |
| 📊 | `<BarChart2 />` | `BarChart2` |
| 🗓️ | `<CalendarDays />` | `CalendarDays` |
| 📍 | `<MapPin />` | `MapPin` |
| 🔑 | `<Key />` | `Key` |

### Icon Wrapper Component (add to shared utils)

```jsx
// src/components/ServiceIcon.jsx
import { AirVent, Wrench, Zap, Sparkles, Hammer, Paintbrush, Shield, Bug, Camera, Sun } from 'lucide-react';

const iconMap = {
  'AC Repair':       AirVent,
  'Plumbing':        Wrench,
  'Electrical':      Zap,
  'Cleaning':        Sparkles,
  'Carpentry':       Hammer,
  'Painting':        Paintbrush,
  'Pest Control':    Bug,
  'CCTV':            Camera,
  'Solar Panel':     Sun,
  'Security':        Shield,
};

export default function ServiceIcon({ service, size = 20, color = 'var(--fixi-purple)' }) {
  const Icon = iconMap[service] || Wrench;
  return <Icon size={size} color={color} strokeWidth={1.8} />;
}
```

---

## 5. ANIMATION — Framer Motion Patterns

All transitions must follow these values. Never deviate.

```jsx
// Shared page entry
export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

// Stagger container + items
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// Card hover (apply to motion.div wrapping card)
export const cardHover = {
  whileHover: { y: -3, boxShadow: 'var(--shadow-card-hover)', transition: { duration: 0.2 } },
  whileTap:   { scale: 0.98, transition: { duration: 0.1 } },
};

// Modal
export const modalVariants = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1,   transition: { duration: 0.2, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
};

// Side drawer (right)
export const drawerVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0,  transition: { duration: 0.25, ease: 'easeOut' } },
  exit:    { opacity: 0, x: 40, transition: { duration: 0.2 } },
};

// Sidebar (left)
export const sidebarVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0,  transition: { duration: 0.4, ease: 'easeOut' } },
};
```

---

## 6. PAGE-SPECIFIC PATTERNS

### 6.1 Public Pages — Body Background

```jsx
// Wrap entire public page with mesh gradient bg
<div style={{ background: 'var(--page-bg-mesh)', backgroundAttachment: 'fixed', minHeight: '100vh' }}>
```

### 6.2 Dashboard Layout Wrapper

```jsx
<div
  className="dashboard-page-bg"
  style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1140, margin: '0 auto', padding: '88px 24px 60px' }}
>
  <DashboardSidebar currentPage={page} />
  <main style={{ flex: 1, minWidth: 0 }}>
    {/* Page content */}
  </main>
</div>
```

### 6.3 Auth Pages (Login, Signup, OTP, ForgotPassword)

```jsx
// Full-screen centered card
<div style={{
  minHeight: '100vh',
  background: 'var(--gradient-hero)',
  backgroundAttachment: 'fixed',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '24px',
  position: 'relative', overflow: 'hidden',
}}>
  {/* Glow blobs */}
  <div style={{ position:'absolute', top:'-20%', right:'-10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(107,74,143,0.35) 0%, transparent 70%)', pointerEvents:'none' }} />
  <div style={{ position:'absolute', bottom:'-15%', left:'5%', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle, rgba(42,27,61,0.5) 0%, transparent 70%)', pointerEvents:'none' }} />

  <motion.div
    variants={modalVariants} initial="initial" animate="animate"
    style={{
      background: 'var(--glass-modal)',
      backdropFilter: 'var(--blur-modal)',
      WebkitBackdropFilter: 'var(--blur-modal)',
      border: 'var(--border-glass)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-modal)',
      padding: '40px 36px',
      width: '100%', maxWidth: 420,
      position: 'relative', zIndex: 1,
    }}
  >
    {/* Auth form content */}
  </motion.div>
</div>
```

### 6.4 Section with Tint Background (public pages)

```jsx
// Soft tint section (replaces flat #F8F5FF)
<section style={{
  background: 'rgba(237,230,248,0.35)',
  backdropFilter: 'blur(0px)',
  borderTop: '1px solid rgba(237,230,248,0.6)',
  borderBottom: '1px solid rgba(237,230,248,0.6)',
  padding: 'var(--section-py) 0',
}}>
```

### 6.5 Stat Card (Dashboard KPI cards)

```jsx
<motion.div
  {...cardHover}
  style={{
    background: 'var(--glass-card)',
    backdropFilter: 'var(--blur-card)',
    WebkitBackdropFilter: 'var(--blur-card)',
    border: 'var(--border-glass)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-card)',
    padding: '20px',
    borderTop: '3px solid var(--fixi-purple-light)',  // accent top border
    position: 'relative', overflow: 'hidden',
  }}
>
  {/* Subtle background glow behind icon */}
  <div style={{
    position: 'absolute', top: -20, right: -20,
    width: 100, height: 100, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(107,74,143,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  }} />
  {/* content */}
</motion.div>
```

### 6.6 Wallet / Balance Card (Full Gradient)

```jsx
<div style={{
  background: 'var(--gradient-primary)',
  borderRadius: 'var(--radius)',
  padding: 24,
  color: 'white',
  boxShadow: 'var(--shadow-glow)',
  position: 'relative', overflow: 'hidden',
}}>
  {/* Shimmer highlight overlay */}
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
    borderRadius: 'var(--radius) var(--radius) 0 0',
    pointerEvents: 'none',
  }} />
  {/* content */}
</div>
```

---

## 7. KNOWN ERRORS & FIXES

These are confirmed bugs in the existing FIXI codebase. Apply every fix listed.

### 7.1 Invalid Lucide Icon Imports

```jsx
// ❌ WRONG — these don't exist in lucide-react v1.x
import { Toggle } from 'lucide-react';

// ✅ CORRECT alternatives
import { ToggleLeft, ToggleRight } from 'lucide-react'; // for toggles
import { SlidersHorizontal } from 'lucide-react';       // for settings/sliders
```

### 7.2 Unescaped Apostrophes in JSX

```jsx
// ❌ WRONG — causes React build error
<p>You're almost done</p>
<p>We're here to help</p>
<p>It's easy to book</p>

// ✅ CORRECT
<p>You&apos;re almost done</p>
<p>We&apos;re here to help</p>
<p>It&apos;s easy to book</p>
// OR use template literals / string variables
```

### 7.3 Missing Package: react-confetti

If `react-confetti` is used in BookingConfirmation or ReferralProgram:

```bash
# Add to package.json dependencies
npm install react-confetti
```

```jsx
// Safe import with lazy loading to avoid SSR issues
import { lazy, Suspense } from 'react';
const Confetti = lazy(() => import('react-confetti'));
// Usage: <Suspense fallback={null}><Confetti /></Suspense>
```

### 7.4 Emoji Icons in MobileBottomNav (DashboardHome)

```jsx
// ❌ WRONG — emoji nav icons
const items = [
  { icon: '🏠', label: 'Home', path: '/dashboard' },
  { icon: '📅', label: 'Bookings', path: '/dashboard/active-bookings' },
  // ...
];

// ✅ CORRECT — Lucide icons
import { Home, Calendar, Search, User, HelpCircle } from 'lucide-react';
const items = [
  { Icon: Home,        label: 'Home',     path: '/dashboard' },
  { Icon: Calendar,   label: 'Bookings', path: '/dashboard/active-bookings' },
  { Icon: Search,     label: 'Services', path: '/services' },
  { Icon: User,       label: 'Profile',  path: '/dashboard/profile' },
  { Icon: HelpCircle, label: 'Help',     path: '/dashboard/help' },
];
// Render: <Icon size={20} color={isActive ? 'var(--fixi-purple)' : 'var(--fixi-muted)'} />
```

### 7.5 Emoji Icons in quickServices (DashboardHome)

```jsx
// ❌ WRONG
const quickServices = [
  { icon: '❄️', label: 'AC Repair' },
  { icon: '🔧', label: 'Plumbing' },
  // ...
];

// ✅ CORRECT
import { AirVent, Wrench, Zap, Sparkles, Hammer, Paintbrush } from 'lucide-react';
const quickServices = [
  { Icon: AirVent,    label: 'AC Repair' },
  { Icon: Wrench,     label: 'Plumbing' },
  { Icon: Zap,        label: 'Electrical' },
  { Icon: Sparkles,   label: 'Cleaning' },
  { Icon: Hammer,     label: 'Carpentry' },
  { Icon: Paintbrush, label: 'Painting' },
];
// Render: <Icon size={22} color="var(--fixi-purple)" strokeWidth={1.8} />
```

### 7.6 Hardcoded Colors (Audit Sweep)

Search and replace these patterns:

```
Find → Replace
#3E2A56 → var(--fixi-purple)
#6B4A8F → var(--fixi-purple-light)
#2A1B3D → var(--fixi-purple-dark)
#4D3569 → var(--fixi-purple-mid)
#EDE6F8 → var(--fixi-purple-tint)
#F8F5FF → var(--fixi-purple-pale)
#1A1A2E → var(--fixi-text-dark)
#9CA3AF → var(--fixi-muted)
#B0A0C8 → var(--fixi-muted-light)
#FBBF24 → var(--fixi-gold)
#10B981 → var(--fixi-green)
#F59E0B → var(--fixi-amber)
#EF4444 → var(--fixi-red)
rgba(62,42,86, → rgba(62,42,86, [KEEP, these are shadow/overlay values — review case by case]
```

### 7.7 Missing `WebkitBackdropFilter`

Whenever `backdropFilter` is used, `WebkitBackdropFilter` must also be set to the same value for Safari compatibility:

```jsx
// ❌ WRONG
style={{ backdropFilter: 'blur(16px)' }}

// ✅ CORRECT
style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
```

### 7.8 Sidebar `position: sticky` Missing `top` Value

```jsx
// ❌ Missing top — sidebar won't stick
style={{ position: 'sticky' }}

// ✅ Must include top offset (navbar height + buffer)
style={{ position: 'sticky', top: 88 }}
```

### 7.9 Mobile Bottom Nav Missing `position: fixed`

```jsx
// ❌ WRONG — flows in document, overlaps content
<nav className="mobile-bottom-nav" style={{ display: 'flex' }}>

// ✅ CORRECT — fixed to viewport bottom
<nav className="mobile-bottom-nav" style={{
  position: 'fixed', bottom: 0, left: 0, right: 0,
  background: 'var(--glass-navbar)',
  backdropFilter: 'var(--blur-navbar)',
  WebkitBackdropFilter: 'var(--blur-navbar)',
  borderTop: 'var(--border-glass)',
  display: 'flex', justifyContent: 'space-around', alignItems: 'center',
  height: 64, zIndex: 90,
  paddingBottom: 'env(safe-area-inset-bottom)',
}}>
```

### 7.10 `react-confetti` Missing from package.json

Current `package.json` does not list `react-confetti` as a dependency.  
Add it or wrap the import with a try-catch dynamic import.

### 7.11 Inconsistent Border Radius on Cards

Some cards use `borderRadius: 12`, some use `borderRadius: '12px'`, some use `16`. Standardize:

```jsx
borderRadius: 'var(--radius)'      // 12px — standard card
borderRadius: 'var(--radius-md)'   // 16px — large card / modal
borderRadius: 'var(--radius-lg)'   // 20px — hero card / special
borderRadius: 'var(--radius-pill)' // 999px — badge / chip / pill button
```

---

## 8. PRE-DELIVERY ERROR CHECKLIST

Run this before delivering any modified FIXI file.

### Visual
- [ ] No emoji used as structural icons — all replaced with Lucide SVG
- [ ] All glass surfaces have both `backdropFilter` AND `WebkitBackdropFilter`
- [ ] Cards use `var(--glass-card)` not solid `#FFFFFF`
- [ ] Page backgrounds use `var(--page-bg-mesh)` or `var(--page-bg-dashboard)`, not flat white
- [ ] Gradients use CSS variable refs, not inline hex gradients
- [ ] Border radius uses `var(--radius-*)` tokens
- [ ] Shadows use `var(--shadow-*)` tokens

### Errors
- [ ] No unescaped apostrophes in JSX strings (`'` must be `&apos;` or use template literals)
- [ ] No invalid Lucide imports (`Toggle` → `ToggleLeft`/`ToggleRight`)
- [ ] `react-confetti` is installed if imported (`npm install react-confetti`)
- [ ] No hardcoded hex values — all replaced with CSS variable tokens
- [ ] Mobile bottom nav has `position: fixed` and `zIndex: 90`
- [ ] All `position: sticky` elements have explicit `top` values

### Accessibility
- [ ] All icon-only buttons have `aria-label` or `title`
- [ ] All interactive elements have visible focus styles (2px ring in `var(--fixi-purple-light)`)
- [ ] Touch targets are min 44×44px
- [ ] Text contrast meets 4.5:1 — do NOT use muted text on glass surfaces without testing
- [ ] No `pointer-events: none` on decorative blobs/overlays that could block interaction

### Responsive
- [ ] Sidebar hides on mobile (`display: none`) in favor of drawer/bottom-nav
- [ ] Page padding is `padding: '88px 24px 60px'` on dashboard pages to clear sticky navbar
- [ ] On mobile, add `paddingBottom: 80` to main content to clear fixed bottom nav

### Animation
- [ ] Page entries use `pageVariants` — duration 0.35s, easeOut
- [ ] Card hovers use `cardHover` — y: -3, duration 0.2s
- [ ] Modals use `modalVariants` — scale 0.94→1, duration 0.2s
- [ ] No animation duration over 400ms on interactive elements
- [ ] `AnimatePresence` wrapping route switches in `App.jsx`

---

## 9. THEME UPGRADE PRIORITY ORDER

Apply changes in this sequence to avoid cascading breaks:

```
STEP 1 — Tokens
  Update index.css :root with new CSS variables (Section 1)
  Add global base styles (Section 2)

STEP 2 — Layout Components
  Navbar.jsx       → glass surface, blur
  DashboardSidebar.jsx  → glassmatte dark sidebar
  ProSidebar.jsx   → same as DashboardSidebar
  AdminSidebar.jsx → same as DashboardSidebar
  Footer.jsx       → keep deep dark bg, add glass border

STEP 3 — Fix Known Errors
  DashboardHome.jsx   → emoji → Lucide icons
  MobileBottomNav     → fixed position + glass
  All .jsx files      → audit apostrophes
  package.json        → add react-confetti

STEP 4 — Public Pages
  HomePage.jsx, AboutPage.jsx, ServicesPage.jsx,
  ServiceDetailPage.jsx, SearchResultsPage.jsx,
  BecomeProPage.jsx, BlogPage.jsx, ContactPage.jsx

STEP 5 — Auth Pages
  Login.jsx, Signup.jsx, OTPVerification.jsx, ForgotPassword.jsx
  → Full-screen glass card on gradient bg

STEP 6 — Dashboard Pages
  DashboardHome.jsx → stat cards, booking card, service chips
  ActiveBookings, BookingHistory, BookingFlow, LiveTracking,
  WalletCredits, Notifications, ReferralProgram, HelpCenter,
  UserProfile, RatingsReviews, PaymentMethods, BookingConfirmation

STEP 7 — Pro Portal
  ProDashboard, ProJobLeads, ProJobDetail, ProSchedule,
  ProEarnings, ProAnalytics, ProServiceArea, ProNotifications

STEP 8 — Admin Panel
  AdminDashboard, AdminUsers, AdminProviders, AdminBookings,
  AdminPricing, AdminPromotions, AdminReviews, AdminTickets,
  AdminZones, AdminNotifications, AdminAuditLogs
```

---

## 10. SHIMMER KEYFRAMES — Add to index.css

```css
/* Skeleton shimmer */
@keyframes fixi-shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}

/* Glow pulse for tracking dot, pro availability, etc. */
@keyframes fixi-pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(107,74,143,0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(107,74,143,0); }
}

/* Tracking dot pulse */
@keyframes fixi-track-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.4); opacity: 0.7; }
}

/* Gradient border animation (optional: use on wallet card) */
@keyframes fixi-border-glow {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}
```

---

## 11. QUICK REFERENCE — CSS Variable Index

| Variable | Value | Use For |
|---|---|---|
| `--glass-card` | rgba(255,255,255,0.72) | Standard card bg |
| `--glass-card-hover` | rgba(255,255,255,0.88) | Card on hover |
| `--glass-card-dark` | rgba(42,27,61,0.55) | Hero/dark widgets |
| `--glass-sidebar` | rgba(30,18,48,0.82) | All sidebar backgrounds |
| `--glass-navbar` | rgba(255,255,255,0.85) | Navbar + mobile bottom nav |
| `--glass-modal` | rgba(255,255,255,0.92) | Modals, drawers, auth cards |
| `--glass-input` | rgba(255,255,255,0.65) | Input default bg |
| `--glass-overlay` | rgba(30,18,48,0.6) | Modal overlays |
| `--blur-card` | blur(16px) | Cards |
| `--blur-navbar` | blur(20px) | Navbar |
| `--blur-modal` | blur(24px) | Modals |
| `--blur-sidebar` | blur(32px) | Sidebar |
| `--gradient-button` | 135deg #5B3A7E → #7B5A9F | All primary buttons |
| `--gradient-hero` | 135deg #2A1B3D → #3E2A56 → #6B4A8F | Hero backgrounds |
| `--shadow-glow` | 0 0 32px rgba(107,74,143,0.30) | Wallet card, CTA buttons |
| `--page-bg-mesh` | multi-radial-gradient + #F4EEFF | Public page body bg |
| `--page-bg-dashboard` | multi-radial-gradient + #F0EBFC | Dashboard body bg |

---

*FIXI Glass-Matte Theme Skill v1.0 — Save as `/mnt/skills/user/fixi-glassmatte-theme/SKILL.md`*
