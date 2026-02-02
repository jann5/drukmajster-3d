import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/ui/Reveal';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: FormData): boolean => {
    const newErrors: FormErrors = {};
    const email = data.get('email') as string;
    const name = data.get('name') as string;
    const message = data.get('message') as string;

    if (!name || name.length < 2) {
      newErrors.name = 'Proszę podać imię i nazwisko';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Proszę podać poprawny adres e-mail';
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormState('success');
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
          <AlertCircle size={12} />
          <span>{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section id="contact" className="py-24 px-6 md:px-16 lg:px-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div>
            <Reveal>
              <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
                05 — Zapytaj o cenę
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-sans font-bold text-black text-3xl md:text-5xl lg:text-6xl mb-8">
                Zapytaj o cenę
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-sans text-gray-text text-lg mb-12 max-w-md">
                Chcesz wiedzieć ile będzie kosztował Twój projekt? Wyślij zapytanie, a wrócimy do Ciebie z wyceną w ciągu 24h.
              </p>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={0.3}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center rounded-sm shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-gray-text tracking-widest block mb-1">
                      Email
                    </span>
                    <a href="mailto:biuro@drukmajster3d.pl" className="font-sans text-black text-lg hover:underline decoration-1 underline-offset-4">
                      biuro@drukmajster3d.pl
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center rounded-sm shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-gray-text tracking-widest block mb-1">
                      Telefon
                    </span>
                    <a href="tel:+48500600700" className="font-sans text-black text-lg hover:underline decoration-1 underline-offset-4">
                      +48 500 600 700
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center rounded-sm shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-gray-text tracking-widest block mb-1">
                      Lokalizacja
                    </span>
                    <p className="font-sans text-black text-lg">
                      Poznań, Polska
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <Reveal delay={0.4} width="100%">
              <div className="bg-gray-50 p-8 md:p-12 rounded-sm border border-gray-100">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-white" size={40} />
                      </div>
                      <h3 className="font-sans font-bold text-2xl mb-4">Wiadomość wysłana!</h3>
                      <p className="font-sans text-gray-text mb-8">
                        Dziękujemy za kontakt. Odpowiemy na Twoje zapytanie tak szybko, jak to możliwe.
                      </p>
                      <button
                        onClick={() => setFormState('idle')}
                        className="btn-underline font-sans font-bold"
                      >
                        Wyślij kolejną wiadomość
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="font-mono text-[10px] uppercase text-gray-text tracking-widest block mb-2">
                            Imię i nazwisko
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Jan Kowalski"
                            className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-gray-200'} px-6 py-4 font-sans text-black outline-none focus:border-black transition-colors rounded-sm`}
                          />
                          <ErrorMessage error={errors.name} />
                        </div>
                        <div>
                          <label htmlFor="email" className="font-mono text-[10px] uppercase text-gray-text tracking-widest block mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="jan@przyklad.pl"
                            className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} px-6 py-4 font-sans text-black outline-none focus:border-black transition-colors rounded-sm`}
                          />
                          <ErrorMessage error={errors.email} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="font-mono text-[10px] uppercase text-gray-text tracking-widest block mb-2">
                          Temat
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          className="w-full bg-white border border-gray-200 px-6 py-4 font-sans text-black outline-none focus:border-black transition-colors rounded-sm appearance-none"
                        >
                          <option>Zapytanie o wycenę</option>
                          <option>Współpraca</option>
                          <option>Inne</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="font-mono text-[10px] uppercase text-gray-text tracking-widest block mb-2">
                          Wiadomość
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          placeholder="Opisz swój projekt..."
                          className={`w-full bg-white border ${errors.message ? 'border-red-500' : 'border-gray-200'} px-6 py-4 font-sans text-black outline-none focus:border-black transition-colors rounded-sm resize-none`}
                        />
                        <ErrorMessage error={errors.message} />
                      </div>

                      <button
                        type="submit"
                        disabled={formState === 'loading'}
                        className="w-full bg-black text-white py-5 font-sans font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                      >
                        {formState === 'loading' ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* Decorative background element */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-gray-100 rounded-full -z-10 blur-3xl opacity-50" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-gray-100 rounded-full -z-10 blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
