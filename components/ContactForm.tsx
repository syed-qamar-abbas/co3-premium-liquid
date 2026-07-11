'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { genericWhatsAppLink } from '@/lib/site';
import { WhatsAppIcon } from './OrderModal';

/**
 * ContactForm — Formspree-powered enquiry form (works on static hosting).
 * 1. Create a form at https://formspree.io and copy your form ID.
 * 2. Replace FORM_ID below.
 * The form posts via fetch (no redirect) and shows an inline success state.
 * A WhatsApp fast-path sits alongside for users who'd rather just message.
 */
const FORM_ID = 'your_form_id'; // ← replace with your Formspree ID

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full flex-col items-center justify-center rounded-3xl border border-teal/10 bg-cream-warm p-10 text-center"
      >
        <span className="text-5xl">🎉</span>
        <h3 className="mt-4 font-display text-2xl text-teal">Message sent!</h3>
        <p className="mt-2 text-sm text-ink/65">
          Thanks for reaching out — we’ll get back to you shortly. For instant replies, WhatsApp is fastest.
        </p>
        <a href={genericWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6">
          <WhatsAppIcon /> Chat on WhatsApp
        </a>
      </motion.div>
    );
  }

  const field =
    'w-full rounded-2xl border border-teal/15 bg-cream-warm px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-gold/30';

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-teal/10 bg-cream-warm p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide2 text-ink/60">
            Name
          </label>
          <input id="name" name="name" required placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide2 text-ink/60">
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" required placeholder="03xx xxxxxxx" className={field} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide2 text-ink/60">
          Subject
        </label>
        <select id="subject" name="subject" className={field} defaultValue="General enquiry">
          <option>General enquiry</option>
          <option>Bulk / event order</option>
          <option>Catering</option>
          <option>Feedback</option>
          <option>Partnership</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide2 text-ink/60">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} placeholder="How can we help?" className={`${field} resize-none`} />
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn-gold mt-6 w-full disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'error' && (
        <p className="mt-3 text-center text-sm text-[#C84B5A]">
          Something went wrong. Please WhatsApp us instead — we’ll reply right away.
        </p>
      )}
      <p className="mt-3 text-center text-[11px] text-ink/40">
        Prefer instant? Skip the form and message us on WhatsApp.
      </p>
    </form>
  );
}
