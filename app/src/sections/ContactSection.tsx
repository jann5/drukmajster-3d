import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/ui/Reveal';
import { Mail, Phone, MapPin, AlertCircle, Upload, X, FileText, Image } from 'lucide-react';

interface FormErrors {
  email?: string;
  subject?: string;
  message?: string;
  files?: string;
}

interface UploadedFile {
  file: File;
  preview?: string;
}

// WAŻNE: Zamień na swój klucz z https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';

export function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Obsługiwane formaty plików
  const acceptedFormats = '.stl,.obj,.step,.stp,.iges,.igs,.3mf,.gcode,.jpg,.jpeg,.png,.gif,.pdf';
  const maxFileSize = 10 * 1024 * 1024; // 10MB per file
  const maxFiles = 5;

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    const fileErrors: string[] = [];

    Array.from(files).forEach((file) => {
      // Check file count
      if (uploadedFiles.length + newFiles.length >= maxFiles) {
        fileErrors.push(`Maksymalna liczba plików to ${maxFiles}`);
        return;
      }

      // Check file size
      if (file.size > maxFileSize) {
        fileErrors.push(`Plik "${file.name}" przekracza limit 10MB`);
        return;
      }

      // Create preview for images
      const isImage = file.type.startsWith('image/');
      const uploadedFile: UploadedFile = { file };

      if (isImage) {
        uploadedFile.preview = URL.createObjectURL(file);
      }

      newFiles.push(uploadedFile);
    });

    if (fileErrors.length > 0) {
      setErrors((prev) => ({ ...prev, files: fileErrors.join(', ') }));
    } else {
      setErrors((prev) => ({ ...prev, files: undefined }));
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const file = prev[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image size={16} />;
    }
    return <FileText size={16} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validate(formData)) return;

    setFormState('loading');
    setErrorMessage('');

    try {
      // Przygotuj FormData dla Web3Forms
      const submitData = new FormData();
      submitData.append('access_key', WEB3FORMS_ACCESS_KEY);
      submitData.append('email', formData.get('email') as string);
      submitData.append('subject', formData.get('subject') as string);
      submitData.append('message', formData.get('message') as string);
      submitData.append('from_name', 'DrukMajster3D Website');

      // Dodaj pliki
      uploadedFiles.forEach((uploadedFile, index) => {
        submitData.append(`attachment_${index + 1}`, uploadedFile.file);
      });

      // Lista załączonych plików w wiadomości
      if (uploadedFiles.length > 0) {
        const fileList = uploadedFiles.map((f) => f.file.name).join(', ');
        submitData.append('files_info', `Załączone pliki: ${fileList}`);
      }

      // Wyślij do Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setFormState('success');

        // Wyczyść pliki
        uploadedFiles.forEach((f) => {
          if (f.preview) URL.revokeObjectURL(f.preview);
        });
        setUploadedFiles([]);

        setTimeout(() => {
          setFormState('idle');
          setErrors({});
          formRef.current?.reset();
        }, 5000);
      } else {
        throw new Error(result.message || 'Wystąpił błąd podczas wysyłania');
      }
    } catch (error) {
      setFormState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd');

      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    }
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
              Zapytania handlowe, wyceny, konsultacje techniczne. Możesz załączyć projekt 3D lub zdjęcia.
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
                    <a href="tel:+48509480456" className="font-sans text-black text-lg md:text-xl hover:text-gray-600 transition-colors">
                      +48 509 480 456
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

              {/* File Upload Section */}
              <div className="group">
                <label className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-4">
                  Załącz pliki (opcjonalnie)
                </label>

                {/* Upload Button */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 hover:border-[#1d4ed8] rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:bg-blue-50/30"
                >
                  <Upload className="mx-auto mb-3 text-gray-400" size={24} />
                  <p className="font-sans text-gray-text text-sm mb-1">
                    Kliknij aby dodać pliki
                  </p>
                  <p className="font-mono text-gray-400 text-[10px] uppercase tracking-wider">
                    STL, OBJ, STEP, 3MF, JPG, PNG, PDF • max 10MB
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={acceptedFormats}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <ErrorMessage error={errors.files} />

                {/* Uploaded Files List */}
                <AnimatePresence>
                  {uploadedFiles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-2"
                    >
                      {uploadedFiles.map((uploadedFile, index) => (
                        <motion.div
                          key={`${uploadedFile.file.name}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group/file"
                        >
                          {/* Preview or Icon */}
                          {uploadedFile.preview ? (
                            <img
                              src={uploadedFile.preview}
                              alt={uploadedFile.file.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                              {getFileIcon(uploadedFile.file)}
                            </div>
                          )}

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-black text-sm truncate">
                              {uploadedFile.file.name}
                            </p>
                            <p className="font-mono text-gray-400 text-[10px]">
                              {formatFileSize(uploadedFile.file.size)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                disabled={formState === 'loading'}
                whileHover={{ x: 10 }}
                className="btn-underline relative font-sans font-bold text-lg py-4 px-0 mt-8 transition-all disabled:opacity-50"
              >
                {formState === 'loading' ? 'Wysyłanie...' : 'Wyślij zapytanie'}
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
                    className="w-20 h-20 bg-[#1d4ed8] rounded-full flex items-center justify-center mb-6"
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
                    <h3 className="font-sans font-bold text-black text-2xl mb-2">Wiadomość wysłana!</h3>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="font-sans text-gray-text">Odpowiemy najszybciej jak to możliwe.</p>
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

              {formState === 'error' && (
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
                    className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6"
                  >
                    <X className="w-10 h-10 text-white" />
                  </motion.div>
                  <Reveal>
                    <h3 className="font-sans font-bold text-black text-2xl mb-2">Wystąpił błąd</h3>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="font-sans text-gray-text max-w-xs">{errorMessage}</p>
                  </Reveal>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setFormState('idle')}
                    className="mt-8 font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                  >
                    SPRÓBUJ PONOWNIE
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
