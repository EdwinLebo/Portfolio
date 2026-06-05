/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data';
import { Mail, Github, Linkedin, ExternalLink, Send, CheckCircle2, ShoppingBag, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const messagesCollectionPath = 'messages';
    try {
      await addDoc(collection(db, messagesCollectionPath), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
        createdAt: serverTimestamp()
      });

      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });

      // Clear notification after 5 seconds
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Submission failed: ", error);
      setErrorMessage("Transmit failed. Verify email format and ensure inputs are valid.");
      try {
        handleFirestoreError(error, OperationType.CREATE, `${messagesCollectionPath}/auto-generated-id`);
      } catch (tracedErr) {
        // Handled & logged to stderr/stdout
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="contact-form-component">
      {/* Detail Block */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Let's Connect</span>
            <h3 className="text-2xl md:text-3xl font-black text-[#121212] tracking-tighter uppercase leading-none">Expand Your Network</h3>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-sans font-medium">
              Are you currently looking for a hard-working, creative student developer to support your web engineering, UI systems, or desktop Java codebases? Drop me a direct message!
            </p>
          </div>

          <div className="space-y-4">
            {/* Email link */}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group flex items-center gap-4 p-4 rounded-lg border border-black/10 bg-white hover:border-blue-600 transition duration-300"
              id="social-email-card"
            >
              <div className="w-10 h-10 rounded bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:scale-105 transition duration-300 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] uppercase font-black text-[#121212]/50 tracking-wider">Primary Email</p>
                <p className="text-sm font-bold text-[#121212] truncate select-all">{PERSONAL_INFO.email}</p>
              </div>
            </a>

            {/* LinkedIn link */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-lg border border-black/10 bg-white hover:border-blue-600 transition duration-300"
              id="social-linkedin-card"
            >
              <div className="w-10 h-10 rounded bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:scale-105 transition duration-300 shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black text-[#121212]/50 tracking-wider">Professional LinkedIn</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-sm font-bold text-[#121212]">Edwin Mantsho</p>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600 transition" />
                </div>
              </div>
            </a>

            {/* GitHub link */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-lg border border-black/10 bg-white hover:border-blue-600 transition duration-300"
              id="social-github-card"
            >
              <div className="w-10 h-10 rounded bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:scale-105 transition duration-300 shrink-0">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black text-[#121212]/50 tracking-wider">Code Platform</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-sm font-bold text-[#121212]">EdwinLebo</p>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600 transition" />
                </div>
              </div>
            </a>

            {/* Student Marketplace link */}
            <a
              href={PERSONAL_INFO.marketplace}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-lg border border-blue-600/15 bg-blue-600/[0.03] hover:border-blue-600 transition duration-300"
              id="social-marketplace-card"
            >
              <div className="w-10 h-10 rounded bg-blue-600 px-1 text-white flex items-center justify-center group-hover:scale-105 transition duration-300 shrink-0">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black text-blue-600 tracking-widest">Live Student Marketplace</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-sm font-black text-[#121212]">TUT Market Portal</p>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Info detail */}
        <div className="mt-8 pt-6 border-t border-black/10 hidden lg:block">
          <p className="text-xs text-neutral-400 leading-relaxed font-sans font-medium">
            Based in Pretoria, South Africa. Actively enrolled in class labs at Tshwane University of Technology. Responsive within 24 working hours.
          </p>
        </div>
      </div>

      {/* Actual Form */}
      <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-lg border border-black/10 relative overflow-hidden">
        {isSent && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 z-10 transition duration-300">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 shrink-0 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-[#121212] tracking-tighter uppercase">Message Transmitted!</h4>
            <p className="text-neutral-500 text-xs md:text-sm max-w-sm mt-1.5 leading-relaxed font-sans font-medium">
              Thank you for reaching out, Edwin will review your notes and respond shortly at your provided email coordinates!
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="mt-5 text-xs text-blue-600 font-bold hover:underline cursor-pointer"
              id="send-another-btn"
            >
              Send Another Message
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 text-xs text-red-600 bg-red-50 border border-red-200/50 rounded animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-[10px] uppercase font-black text-[#121212]/80 tracking-widest">Your Name</label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Edwin Mantsho"
                className="w-full text-sm px-4 py-3 bg-neutral-50 border border-black/10 rounded focus:bg-[#fdfdfd] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-[10px] uppercase font-black text-[#121212]/80 tracking-widest">Email Coordinates</label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="recruiter@tut.ac.za"
                className="w-full text-sm px-4 py-3 bg-neutral-50 border border-black/10 rounded focus:bg-[#fdfdfd] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5 flex flex-col">
            <label htmlFor="contact-subject" className="text-[10px] uppercase font-black text-[#121212]/80 tracking-widest">Project Theme</label>
            <select
              id="contact-subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full text-sm px-4 py-3 bg-neutral-50 border border-black/10 rounded focus:bg-[#fdfdfd] focus:border-blue-600 outline-none transition"
            >
              <option value="General Inquiry">General Consultation Inquiry</option>
              <option value="Java Project Collaboration">Java OOP Collaboration</option>
              <option value="Web Agency Gig / Freelance">Frontend Design Project</option>
              <option value="Multimedia Render Assignment">Multimedia Video/Audio Assembly</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="text-[10px] uppercase font-black text-[#121212]/80 tracking-widest">Your Details</label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Hi Edwin, we loved your TUT Student Marketplace layout! Let's arrange a brief conference chat..."
              className="w-full text-sm px-4 py-3 bg-neutral-50 border border-black/10 rounded focus:bg-[#fdfdfd] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-full text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition duration-300 select-none cursor-pointer"
            id="contact-submit-btn"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="w-4 h-4 text-blue-400" />
                <span>Transmit Secure Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
