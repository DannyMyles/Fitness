'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from "react-icons/fa6";
import { X } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Don't show on admin pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/admin')) {
        setIsVisible(false);
      }
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-fitness-lg overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-br from-[#25D366] to-[#20BD5A] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-fitness">
                <FaWhatsapp size={20} className="text-[#25D366]" />
              </div>
              <div>
                <p className="font-semibold">Marksila254</p>
                <p className="text-xs text-green-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  Typically replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-5 bg-gradient-to-br from-gray-50 to-white">
            <div className="bg-white rounded-xl p-4 shadow-soft mb-4">
              <p className="text-sm text-gray-700">
                Hi there! 👋 How can I help you with your fitness journey today?
              </p>
            </div>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-br from-[#25D366] to-[#20BD5A] text-white text-center py-3.5 rounded-xl font-semibold hover:shadow-fitness-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={20} />
              Start Chat
            </a>
          </div>
        </div>
      )}

      {/* WhatsApp Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#20BD5A] text-white rounded-full shadow-fitness-lg flex items-center justify-center hover:shadow-fitness-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Toggle WhatsApp chat"
      >
        {isOpen ? (
          <X size={24} className="animate-rotate" />
        ) : (
          <FaWhatsapp size={26} className="animate-pulse" />
        )}
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping"></span>
      </button>
    </>
  );
};

export default WhatsAppWidget;

