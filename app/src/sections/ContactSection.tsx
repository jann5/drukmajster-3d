import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/ui/Reveal';

interface FormData {
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Temat jest wymagany';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Wiadomość musi mieć min. 10 znaków';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
    >
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
              Skontaktuj się
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
                <div>
                  <span className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2">
                    Email
                  </span>
                  <a
                    href="mailto:kontakt@grzegorznawrot.pl"
                    className="font-sans text-black text-xl hover:text-gray-600 transition-colors"
                  >
                    kontakt@grzegorznawrot.pl
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div>
                  <span className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2">
                    Telefon
                  </span>
                  <a
                    href="tel:+48123456789"
                    className="font-sans text-black text-xl hover:text-gray-600 transition-colors"
                  >
                    +48 123 456 789
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div>
                  <span className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-4">
                    Usługi
                  </span>
                  <ul className="space-y-2">
                    <li className="font-sans text-black text-base flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-black rounded-full" />Sprzedaż drukarek F170
                    </li>
                    <li className="font-sans text-black text-base flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-black rounded-full" />Serwis i wsparcie techniczne
                    </li>
                    <li className="font-sans text-black text-base flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-black rounded-full" />Konsultacje i szkolenia
                    </li>
                    <li className="font-sans text-black text-base flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-black rounded-full" />Druk prototypowy
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column - Form */}
          <Reveal delay={0.4} width="100%">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2 group-focus-within:text-black transition-colors">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-0 py-4 bg-transparent border-b ${errors.email ? 'border-error' : 'border-gray-200 group-focus-within:border-black'
                    } text-black font-sans text-lg focus:outline-none transition-all duration-300`}
                  placeholder="twoj@email.pl"
                />
                {errors.email && (
                  <span className="text-error text-xs mt-2 block">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Subject Field */}
              <div className="group">
                <label htmlFor="subject" className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2 group-focus-within:text-black transition-colors">
                  Temat *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-0 py-4 bg-transparent border-b ${errors.subject ? 'border-error' : 'border-gray-200 group-focus-within:border-black'
                    } text-black font-sans text-lg focus:outline-none transition-all duration-300`}
                  placeholder="Zapytanie o drukarkę F170"
                />
                {errors.subject && (
                  <span className="text-error text-xs mt-2 block">
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div className="group">
                <label htmlFor="message" className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-2 group-focus-within:text-black transition-colors">
                  Wiadomość *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-0 py-4 bg-transparent border-b ${errors.message ? 'border-error' : 'border-gray-200 group-focus-within:border-black'
                    } text-black font-sans text-lg focus:outline-none transition-all duration-300 resize-none`}
                  placeholder="Opisz czego potrzebujesz..."
                />
                {errors.message && (
                  <span className="text-error text-xs mt-2 block">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                className="btn-underline relative font-sans font-bold text-black text-lg py-4 px-0 mt-8 flex items-center gap-4"
              >
                {isSubmitted ? 'Wysłano pomyślnie ✓' : 'Wyślij wiadomość'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
