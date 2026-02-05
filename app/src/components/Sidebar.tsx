import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import logo from '../assets/logo.png';

interface SidebarProps {
  activeSection: number;
  onNavigate: (index: number) => void;
  onHomeClick?: () => void;
}

// 4 navigation dots: Home, Benefits (Dlaczego my), Gallery (Realizacje), Contact (Kontakt)
const sections = ['Home', 'Dlaczego my', 'Realizacje', 'Kontakt'];

export function Sidebar({ activeSection, onNavigate, onHomeClick }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 flex-col items-center justify-between py-8 bg-white border-r border-gray z-50">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-14 h-14 cursor-pointer mb-10"
          onClick={onHomeClick}
        >
          <img src={logo} alt="Logo" className="w-full h-full object-contain transition-transform duration-300 hover:scale-110" />
        </motion.div>

        {/* Vertical Navigation - 4 dots */}
        <nav className="flex flex-col items-center gap-5">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => onNavigate(index)}
              className="group relative flex items-center justify-center w-8 h-8"
              aria-label={`Navigate to ${section}`}
            >
              <span className={`relative text-lg transition-all duration-300 ${activeSection === index ? 'text-black' : 'text-gray-text group-hover:text-black'}`}>
                {activeSection === index ? '●' : '○'}
              </span>

              {/* Tooltip */}
              <span className="absolute left-full ml-4 px-2 py-1 bg-black text-white text-xs font-mono opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out whitespace-nowrap pointer-events-none">
                {section}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-6">
          {/* Admin Button */}
          <Link
            to="/admin"
            className="group relative flex items-center justify-center w-8 h-8"
            aria-label="Admin Panel"
          >
            <Lock size={16} className="text-gray-text group-hover:text-black transition-colors duration-300" />

            {/* Tooltip */}
            <span className="absolute left-full ml-4 px-2 py-1 bg-black text-white text-xs font-mono opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out whitespace-nowrap pointer-events-none">
              Admin
            </span>
          </Link>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="font-mono text-[10px] text-gray-text"
          >
            © {new Date().getFullYear()}
          </motion.div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center justify-between px-6 border-b border-black/5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-12 h-12 cursor-pointer"
          onClick={onHomeClick}
        >
          <img src={logo} alt="Logo" className="w-full h-full object-contain transition-transform duration-300 hover:scale-110" />
        </motion.div>

        <nav className="flex items-center gap-3">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => onNavigate(index)}
              className="flex items-center justify-center w-8 h-8 relative"
              aria-label={`Navigate to ${section}`}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.08, duration: 0.3 }}
                className={`transition-all duration-300 ${activeSection === index
                  ? 'text-black scale-125'
                  : 'text-gray-text hover:text-black'
                  }`}
              >
                {activeSection === index ? '●' : '○'}
              </motion.span>

              {/* Indicator line for active on mobile */}
              {activeSection === index && (
                <motion.div
                  layoutId="activeIndicatorMobile"
                  className="absolute -bottom-4 left-0 right-0 h-0.5 bg-black"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* Admin Button Mobile */}
          <Link
            to="/admin"
            className="flex items-center justify-center w-8 h-8"
            aria-label="Admin Panel"
          >
            <Lock size={14} className="text-gray-text hover:text-black transition-colors duration-300" />
          </Link>
        </nav>
      </header>
    </>
  );
}
