import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/ui/Reveal';
import { Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

interface FormErrors {
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: FormData): boolean => {
    const newErrors: FormErrors = {};
    const email = data.get('email') as string;
    const subject = data.get('subject') as string;
    const message = data.get('message') as string;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Proszę podać poprawny adres e-mail';
    }

    if (!subject || subject.length < 2) {
      newErrors.subject = 'Proszę podać temat zapytania';
    }

    if (!message || message.length < 10) {
      newErrors.message = 'Wiadomość powinna mieć co najmniej 10 znaków';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validate(formData)) return;

    setFormState('loading');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState('success');

    setTimeout(() => {
      setFormState('idle');
      setErrors({});
      formRef.current?.reset();
    }, 5000);
  };

  const ErrorMessage = ({ error }: { error?: string }) => (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2 mt-2 text-red-500 text-xs font-sans"
        >
          <AlertCircle size={10} />
          <span>{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24">
          <Reveal>
            <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
              04 — Kontakt
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-6">
              Zapytaj o cenę
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-sans text-gray-text text-lg max-w-xl leading-relaxed">
              Zapytania handlowe, wyceny, konsultacje techniczne dotyczące drukarki Statysus F170.
            </p>
          </Reveal>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-black mt-8"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Left Column - Contact Info */}
          <div className="order-2 lg:order-1">
            <div className="space-y-8 md:space-y-12">
              <Reveal delay={0.3}>
                <div className="flex items-start gap-5 group">
                  <div className="w-10 h-10 flex items-center justify-center border border-black/5 group-hover:border-black/10 transition-colors">
                    <Mail className="text-black" size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-gray-text text-[10px] md:text-xs uppercase tracking-[0.2em] block mb-2">
                      Napisz do nas
                    </span>
                    <a href="mailto:biuro@drukmajster3d.pl" className="font-sans text-black text-lg md:text-xl hover:text-gray-600 transition-colors">
                      biuro@drukmajster3d.pl
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex items-start gap-5 group">
                  <div className="w-10 h-10 flex items-center justify-center border border-black/5 group-hover:border-black/10 transition-colors">
                    <Phone className="text-black" size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-gray-text text-[10px] md:text-xs uppercase tracking-[0.2em] block mb-2">
                      Zadzwoń
                    </span>
                    <a href="tel:+48500600700" className="font-sans text-black text-lg md:text-xl hover:text-gray-600 transition-colors">
                      +48 500 600 700
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="flex items-start gap-5 group">
                  <div className="w-10 h-10 flex items-center justify-center border border-black/5 group-hover:border-black/10 transition-colors">
                    <MapPin className="text-black" size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-gray-text text-[10px] md:text-xs uppercase tracking-[0.2em] block mb-2">
                      Lokalizacja
                    </span>
                    <p className="font-sans text-black text-lg md:text-xl leading-snug">
                      ul. Przemysłowa 12<br />
                      61-000 Poznań
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="order-1 lg:order-2 relative">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              <div className="group">
                <label htmlFor="email" className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2 group-focus-within:text-black transition-colors">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-0 py-4 bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-gray-200 group-focus-within:border-black'
                    } text-black font-sans text-lg focus:outline-none transition-all duration-300`}
                  placeholder="twoj@email.pl"
                />
                <ErrorMessage error={errors.email} />
              </div>

              <div className="group">
                <label htmlFor="subject" className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2 group-focus-within:text-black transition-colors">
                  Temat *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={`w-full px-0 py-4 bg-transparent border-b ${errors.subject ? 'border-red-500' : 'border-gray-200 group-focus-within:border-black'
                    } text-black font-sans text-lg focus:outline-none transition-all duration-300`}
                  placeholder="Zapytanie o druk"
                />
                <ErrorMessage error={errors.subject} />
              </div>

              <div className="group">
                <label htmlFor="message" className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2 group-focus-within:text-black transition-colors">
                  Wiadomość *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`w-full px-0 py-4 bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-gray-200 group-focus-within:border-black'
                    } text-black font-sans text-lg focus:outline-none transition-all duration-300 resize-none`}
                  placeholder="Opisz czego potrzebujesz..."
                />
                <ErrorMessage error={errors.message} />
              </div>

              <motion.button
                type="submit"
                disabled={formState === 'loading'}
                whileHover={{ x: 10 }}
                className="btn-underline relative font-sans font-bold text-black text-lg py-4 px-0 mt-8 flex items-center gap-4 transition-all"
              >
                {formState === 'loading' ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </motion.button>
            </form>

            <AnimatePresence>
              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center z-10"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6"
                  >
                    <motion.svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-10 h-10 text-white"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.div>
                  <Reveal>
                    <h3 className="font-sans font-bold text-black text-2xl mb-2">Transmisja pomyślna</h3>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="font-sans text-gray-text">Twoja wiadomość jest w drodze do DrukMajstra.</p>
                  </Reveal>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setFormState('idle')}
                    className="mt-8 font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                  >
                    WYŚLIJ KOLEJNĄ
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
