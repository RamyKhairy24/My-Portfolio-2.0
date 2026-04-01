'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// ✏️  Sign up at formspree.io → create a form → paste your form ID below.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykbpdlp';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputCls =
    'w-full bg-transparent text-brand-cream placeholder:text-brand-cream/20 text-base font-serif italic outline-none border-b border-brand-cream/10 focus:border-brand-cream/50 pb-2 transition-colors duration-300';
  const labelCls =
    'block text-[9px] uppercase tracking-[0.35em] font-bold text-brand-cream/35 mb-3';

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-brand-cream/8 divide-y divide-brand-cream/8">

        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-brand-cream/8">
          <div className="p-5 md:p-7">
            <label className={labelCls}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className={inputCls}
            />
          </div>
          <div className="p-5 md:p-7">
            <label className={labelCls}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className={inputCls}
            />
          </div>
        </div>

        {/* Message */}
        <div className="p-5 md:p-7">
          <label className={labelCls}>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Tell me about your project..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Submit / Feedback */}
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-5 md:p-7"
            >
              <CheckCircle size={17} className="flex-shrink-0 text-emerald-400/70" />
              <span className="text-sm font-serif italic text-brand-cream/70">
                Message sent — I&apos;ll get back to you shortly.
              </span>
            </motion.div>
          ) : status === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-5 md:p-7"
            >
              <AlertCircle size={17} className="flex-shrink-0 text-red-400/70" />
              <span className="text-sm font-serif italic text-brand-cream/70 flex-1">
                Something went wrong. Try{' '}
                <a
                  href="mailto:ramykhairybuisness@gmail.com"
                  className="underline underline-offset-2"
                >
                  emailing me directly
                </a>
                .
              </span>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="text-[9px] uppercase tracking-widest text-brand-cream/40 hover:text-brand-cream transition-colors"
              >
                Retry
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="submit"
              type="submit"
              disabled={status === 'sending'}
              initial={false}
              whileTap={{ scale: 0.98 }}
              className="group w-full p-5 md:p-7 flex items-center justify-between hover:bg-brand-cream/5 transition-colors duration-300 disabled:opacity-60"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </span>
              {status === 'sending' ? (
                <Loader2 size={16} className="animate-spin text-brand-cream/40" />
              ) : (
                <Send
                  size={16}
                  className="text-brand-cream/30 group-hover:text-brand-cream/70 group-hover:translate-x-1 transition-all duration-300"
                />
              )}
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </form>
  );
}
