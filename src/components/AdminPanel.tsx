/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  X, 
  LogIn, 
  LogOut, 
  Mail, 
  Calendar, 
  Trash2, 
  User, 
  Info,
  ExternalLink,
  Lock,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Monitor Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to messages in Firestore if the user is verified Edwin
  useEffect(() => {
    if (!user || user.email !== 'godspeed200407@gmail.com') {
      setMessages([]);
      return;
    }

    setLoadError(null);
    const messagesCollection = 'messages';
    const q = query(collection(db, messagesCollection), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs: UserMessage[] = [];
        snapshot.forEach((document) => {
          const data = document.data();
          msgs.push({
            id: document.id,
            name: data.name || 'Anonymous Sender',
            email: data.email || 'None Provided',
            subject: data.subject || 'No Subject',
            message: data.message || '',
            createdAt: data.createdAt,
          });
        });
        setMessages(msgs);
      },
      (error) => {
        setLoadError("Failed to fetch real-time messages. Insufficient rights or connection breakdown.");
        try {
          handleFirestoreError(error, OperationType.GET, messagesCollection);
        } catch (err) {
          // Handled, error packed in console
        }
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Auth flow failed: ", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Signout flow failed: ", err);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!window.confirm("Are you absolutely sure you want to delete this recruiter connection?")) {
      return;
    }

    setIsDeleting(messageId);
    const messagesCollection = 'messages';
    try {
      await deleteDoc(doc(db, messagesCollection, messageId));
      setIsDeleting(null);
    } catch (error) {
      setIsDeleting(null);
      alert("Insufficient rights. Delete failed.");
      try {
        handleFirestoreError(error, OperationType.DELETE, `${messagesCollection}/${messageId}`);
      } catch (err) {
        // Logged
      }
    }
  };

  const isAdminUser = user?.email === 'godspeed200407@gmail.com';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-end no-print" id="admin-panel-portal">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Sizing & Drawer body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-lg md:max-w-xl h-full bg-[#fdfdfd] border-l border-black/10 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="bg-black text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-500 animate-pulse" />
                <span className="font-extrabold text-xs uppercase tracking-widest text-neutral-100">
                  Firebase Controller Portal
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition cursor-pointer"
                aria-label="Close Admin controls"
                id="admin-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {authLoading ? (
                <div className="h-full flex flex-col justify-center items-center py-12">
                  <div className="w-10 h-10 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin"></div>
                  <p className="mt-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    Authenticating connection state...
                  </p>
                </div>
              ) : !user ? (
                /* Unauthenticated View */
                <div className="h-full flex flex-col justify-center text-center max-w-md mx-auto py-12 space-y-6">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mx-auto border border-blue-100/50">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-lg text-[#121212] uppercase tracking-tighter">
                      Secure Administrative Area
                    </h3>
                    <p className="text-neutral-500 text-xs md:text-sm font-sans font-medium leading-relaxed">
                      Log in to access real-time visitor submissions and review messages directly stored within Firestore in europe-west1.
                    </p>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full bg-black hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-full text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition cursor-pointer shadow-md"
                    id="admin-auth-submit"
                  >
                    <LogIn className="w-4.5 h-4.5 text-blue-400" />
                    <span>Authorize with Google</span>
                  </button>
                  
                  <div className="pt-4 border-t border-black/5 text-left space-y-2 bg-neutral-50 p-4 rounded text-[11px] text-neutral-400">
                    <p className="font-bold uppercase text-[9px] text-[#121212]/50 tracking-wider">
                      Developer Reference Scope:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Only verified administrator credentials matching Edwin's portfolio database configuration will be granted access.</li>
                      <li>Unauthenticated database queries are filtered out directly at the Firestore rule layers.</li>
                    </ul>
                  </div>
                </div>
              ) : !isAdminUser ? (
                /* Authenticated But Not Admin View */
                <div className="h-full flex flex-col justify-center text-center max-w-md mx-auto py-12 space-y-6">
                  <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center mx-auto border border-rose-100">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-lg text-[#121212] uppercase tracking-tighter">
                      Access Restriction Active
                    </h3>
                    <p className="text-neutral-500 text-sm font-medium leading-relaxed">
                      You are correctly signed in using <code className="text-rose-600 font-mono text-xs">{user.email}</code>. 
                    </p>
                    <p className="text-neutral-400 text-xs font-sans">
                      However, access inside this secure database is restricted solely to Edwin's registered email identifier: <code className="text-neutral-700 bg-neutral-100 px-1 py-0.5 rounded font-mono text-xs">godspeed200407@gmail.com</code>.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleLogout}
                      className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-[#121212] font-bold py-3 px-4 rounded text-xs uppercase tracking-widest transition cursor-pointer"
                    >
                      Sign Out
                    </button>
                    <button
                      onClick={handleLogin}
                      className="flex-1 bg-black hover:bg-blue-600 text-white font-bold py-3 px-4 rounded text-xs uppercase tracking-widest transition cursor-pointer"
                    >
                      Switch Account
                    </button>
                  </div>
                </div>
              ) : (
                /* Authenticated Admin View: Read Submissions */
                <div className="space-y-6">
                  {/* Account Header info */}
                  <div className="p-4 bg-blue-600/5 rounded-lg border border-blue-600/10 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase font-black text-[#121212]/50 tracking-wider">Admin Authenticated</p>
                      <p className="text-xs font-bold text-[#121212] truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="border border-[#121212]/15 text-[#121212]/80 hover:bg-red-50 hover:text-red-600 hover:border-red-200 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  {/* Message Title */}
                  <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                    <h4 className="text-xs font-black text-[#121212] tracking-widest uppercase flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span>Received Recruiter Leads ({messages.length})</span>
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400">Live Syncing</span>
                  </div>

                  {loadError && (
                    <div className="p-4 text-xs text-red-600 bg-red-50 border border-red-200/50 rounded flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{loadError}</span>
                    </div>
                  )}

                  {/* Messages list */}
                  {messages.length === 0 ? (
                    <div className="py-16 text-center text-neutral-400 space-y-2 border-2 border-dashed border-black/5 rounded">
                      <Mail className="w-8 h-8 mx-auto text-neutral-300 stroke-[1.5]" />
                      <p className="text-xs font-medium font-sans">No messages logged yet inside Firestore.</p>
                      <p className="text-[10px] text-neutral-400 font-sans max-w-xs mx-auto">
                        Once external recruiters complete submissions on the Contact Form, they will instantly stream here!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => {
                        let dateString = "Now";
                        if (msg.createdAt?.toDate) {
                          dateString = msg.createdAt.toDate().toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          });
                        }

                        return (
                          <div 
                            key={msg.id} 
                            className="bg-white rounded border border-black/10 p-4 relative hover:border-blue-600/30 transition shadow-xs group"
                            id={`msg-${msg.id}`}
                          >
                            {/* Delete button (Standard Firestore action) */}
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              disabled={isDeleting === msg.id}
                              className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition cursor-pointer opacity-10 md:opacity-0 group-hover:opacity-100 shrink-0 select-none"
                              title="Archive leads record"
                              aria-label="Delete connection record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="space-y-2.5 max-w-[90%]">
                              {/* Meta Info */}
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono font-bold">
                                <span className="text-blue-600 uppercase tracking-wide px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded">
                                  {msg.subject}
                                </span>
                                <span className="text-neutral-400 tracking-tight flex items-center gap-1 mt-0.5">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {dateString}
                                </span>
                              </div>

                              {/* Title Details */}
                              <div className="space-y-0.5">
                                <h5 className="text-xs font-bold text-[#121212] uppercase flex items-center gap-1">
                                  <User className="w-3.5 h-3.5 text-neutral-400" />
                                  <span>{msg.name}</span>
                                </h5>
                                <a 
                                  href={`mailto:${msg.email}`} 
                                  className="text-[11px] font-medium text-blue-600 hover:underline inline-flex items-center gap-1"
                                >
                                  {msg.email}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>

                              {/* Paragraph comments section */}
                              <p className="text-xs text-neutral-600 leading-relaxed font-sans font-medium whitespace-pre-wrap pt-1 border-t border-black/5">
                                {msg.message}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Drawer Status bar */}
            <div className="bg-neutral-50 px-6 py-4.5 border-t border-black/10 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-neutral-400" />
                Firestore Storage Instance
              </span>
              <span>v1.0.3</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
