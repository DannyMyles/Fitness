'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from "react-icons/fa6";
import { X } from 'lucide-react';
import { whatsappLink } from '@/app/lib/backend';

// Hidden where it would get in the way: the admin area, and checkout (which
// already ends on WhatsApp and needs the space for its form).
const HIDDEN_ON = ['/admin', '/cart'];

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsOpen(false), [pathname]);

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <>
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-80 bg-white rounded-2xl shadow-fitness-lg overflow-hidden animate-scale-in">
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
              href={whatsappLink("Hi Marksila254! I'd like to know more about training.")}
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
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-green-900/25 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <FaWhatsapp size={28} />
        )}
      </button>
    </>
  );
};

export default WhatsAppWidget;

