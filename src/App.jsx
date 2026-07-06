import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {
  Activity,
  BedDouble,
  CloudSun,
  IndianRupee,
  Map,
  Menu,
  Moon,
  ShieldPlus,
  Shirt,
  Sun,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import TrafficMap from './pages/TrafficMap.jsx';
import ActivitiesPlanner from './pages/ActivitiesPlanner.jsx';
import Hotels from './pages/Hotels.jsx';
import Emergency from './pages/Emergency.jsx';
import Weather from './pages/Weather.jsx';
import Packing from './pages/Packing.jsx';
import Budget from './pages/Budget.jsx';

const navItems = [
  { to: '/traffic', label: 'Traffic', icon: Map },
  { to: '/activities', label: 'Activities', icon: Activity },
  { to: '/hotels', label: 'Hotels', icon: BedDouble },
  { to: '/emergency', label: 'Emergency', icon: ShieldPlus },
  { to: '/weather', label: 'Weather', icon: CloudSun },
  { to: '/packing', label: 'Packing', icon: Shirt },
  { to: '/budget', label: 'Budget', icon: IndianRupee },
];

function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/traffic" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-skyglass-500 text-white shadow-glow">
            <Map size={23} />
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight text-slate-900 dark:text-white">Trip Trekker</span>
            <span className="block text-xs font-semibold uppercase text-skyglass-700 dark:text-skyglass-200">Delhi planner</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="icon-button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle dark mode">
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="icon-button lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-2 border-t border-skyglass-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden"
        >
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

function PageShell() {
  const location = useLocation();
  return (
    <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/traffic" replace />} />
            <Route path="/traffic" element={<TrafficMap />} />
            <Route path="/activities" element={<ActivitiesPlanner />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/packing" element={<Packing />} />
            <Route path="/budget" element={<Budget />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen overflow-hidden bg-skyglass-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.28),transparent_32%),linear-gradient(135deg,#f8fdff_0%,#e4f7ff_42%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.28),transparent_32%),linear-gradient(135deg,#020617_0%,#0f172a_55%,#082f49_100%)]" />
      <div className="pointer-events-none fixed left-8 top-28 h-36 w-36 rounded-full border border-skyglass-200/80 bg-white/40 blur-sm dark:border-skyglass-600/30 dark:bg-skyglass-900/20" />
      <div className="pointer-events-none fixed bottom-10 right-10 h-44 w-44 rounded-full border border-white/80 bg-skyglass-100/40 blur-sm dark:border-skyglass-700/30 dark:bg-slate-900/30" />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <PageShell />
      <Toaster position="top-right" toastOptions={{ className: 'text-sm font-semibold' }} />
    </div>
  );
}
