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
              05 — Kontakt
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
        <div className="grid md:grid-cols-2 gap-24">
          {/* Left Column - Contact Info */}
          <div>
            <div className="space-y-12">
              <Reveal delay={0.3}>
                <div className="flex items-start gap-4">
                  <Mail className="text-black mt-1" size={18} />
                  <div>
                    <span className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2">
                      Email
                    </span>
                    <a href="mailto:biuro@drukmajster3d.pl" className="font-sans text-black text-xl hover:text-gray-600 transition-colors">
                      biuro@drukmajster3d.pl
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex items-start gap-4">
                  <Phone className="text-black mt-1" size={18} />
                  <div>
                    <span className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2">
                      Telefon
                    </span>
                    <a href="tel:+48500600700" className="font-sans text-black text-xl hover:text-gray-600 transition-colors">
                      +48 500 600 700
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="flex items-start gap-4">
                  <MapPin className="text-black mt-1" size={18} />
                  <div>
                    <span className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2">
                      Lokalizacja
                    </span>
                    <p className="font-sans text-black text-xl">
                      Poznań, Polska
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column - Form */}
          <Reveal delay={0.4} width="100%">
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-12">
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
                {formState === 'loading' ? 'Wysyłanie...' : formState === 'success' ? 'Wysłano pomyślnie ✓' : 'Wyślij zapytanie'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
