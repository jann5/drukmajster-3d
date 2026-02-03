import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-border py-12 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4 w-12 h-12">
              <img src={logo} alt="Logo" className="w-full h-full object-contain dark:invert" />
            </div>
            <p className="font-sans text-muted-foreground text-sm">
              DrukMajster3D<br />
              Twój partner w druku 3D
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-mono text-muted-foreground text-xs uppercase tracking-wider block mb-3">
              Nawigacja
            </span>
            <nav className="space-y-2">
              <a href="#home" className="font-sans text-foreground text-sm block hover:underline">Home</a>
              <a href="#benefits" className="font-sans text-foreground text-sm block hover:underline">Dlaczego my</a>
              <a href="#gallery" className="font-sans text-foreground text-sm block hover:underline">Realizacje</a>
              <a href="#contact" className="font-sans text-foreground text-sm block hover:underline">Kontakt</a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <span className="font-mono text-muted-foreground text-xs uppercase tracking-wider block mb-3">
              Kontakt
            </span>
            <div className="space-y-2">
              <a
                href="mailto:biuro@drukmajster3d.pl"
                className="font-sans text-foreground text-sm block hover:underline"
              >
                biuro@drukmajster3d.pl
              </a>
              <a
                href="tel:+48509480456"
                className="font-sans text-foreground text-sm block hover:underline"
              >
                +48 509 480 456
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-muted-foreground text-xs">
            © {currentYear} DrukMajster3D. Wszelkie prawa zastrzeżone.
          </p>
          <p className="font-mono text-muted-foreground text-xs">
            Stratasys F170 — Przemysłowy druk 3D
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
