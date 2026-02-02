import { motion } from 'framer-motion';

interface SidebarProps {
  activeSection: number;
  onNavigate: (index: number) => void;
  onOpenGallery?: () => void;
}

const sections = ['Home', 'Przykłady zastosowań', 'Dlaczego my?', 'Use Cases', 'Zapytaj o cenę'];

export function Sidebar({ activeSection, onNavigate, onOpenGallery }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 flex-col items-center justify-between py-8 bg-white border-r border-gray z-50">
        {/* Initials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-sans font-bold text-black text-lg tracking-tight cursor-pointer"
          onClick={() => onNavigate(0)}
        >
          DM
        </motion.div>

        {/* Vertical Navigation */}
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

          {/* Gallery Button */}
          <button
            onClick={onOpenGallery}
            className="group relative flex items-center justify-center w-8 h-8 mt-4"
            aria-label="Open Gallery"
          >
            <span className="relative text-xl text-gray-text group-hover:text-black transition-colors duration-300 transform group-hover:rotate-90">
              +
            </span>

            {/* Tooltip */}
            <span className="absolute left-full ml-4 px-2 py-1 bg-black text-white text-xs font-mono opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out whitespace-nowrap pointer-events-none">
              Dlaczego my?
            </span>
          </button>
        </nav>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="font-mono text-xs text-gray-text"
        >
          © 2024
        </motion.div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 glass-panel z-50 flex items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-sans font-bold text-black text-lg tracking-tight cursor-pointer"
          onClick={() => onNavigate(0)}
        >
          DM
        </motion.div>

        <nav className="flex items-center gap-4">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => onNavigate(index)}
              className="flex items-center justify-center p-2"
              aria-label={`Navigate to ${section}`}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.08, duration: 0.3 }}
                className={`text-xs transition-all duration-200 ${activeSection === index
                  ? 'text-black'
                  : 'text-gray-text'
                  }`}
              >
                {activeSection === index ? '●' : '○'}
              </motion.span>
            </button>
          ))}
        </nav>
      </header>
    </>
  );
}
