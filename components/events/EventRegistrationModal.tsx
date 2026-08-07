'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2, AlertCircle, CheckCircle, X, RefreshCw, XCircle } from 'lucide-react';
import { eventService, EventItem } from '@/app/api_services/eventService';
import { usePaymentPolling } from '@/app/lib/usePaymentPolling';

const PHONE_REGEX = /^\+?[0-9\s-]{7,20}$/;

interface EventRegistrationModalProps {
  event: EventItem;
  onClose: () => void;
  // Lets the caller refresh its own copy of the event (e.g. updated
  // spotsRemaining) once a registration goes through.
  onRegistered?: () => void;
}

/**
 * Full registration flow (form -> M-Pesa STK push -> payment polling ->
 * ticket confirmation) as a self-contained modal. Shared between the events
 * list page and the event detail page so this non-trivial polling/retry
 * logic only lives in one place.
 */
export default function EventRegistrationModal({ event, onClose, onRegistered }: EventRegistrationModalProps) {
  const { data: session } = useSession();

  const [attendeeName, setAttendeeName] = useState(session?.user?.name || '');
  const [attendeePhone, setAttendeePhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [pendingTicket, setPendingTicket] = useState<{ id: number; ticketNumber: string } | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const registrationIdRef = useRef<number | null>(null);

  const pollPayment = usePaymentPolling<{ status: string; paymentFailed?: boolean; paymentFailureReason?: string }>({
    checkFn: () => eventService.getRegistrationStatus(registrationIdRef.current!),
    isSuccess: (r) => r.status === 'confirmed',
    isFailed: (r) => r.paymentFailed === true,
  });

  useEffect(() => {
    if (pollPayment.phase === 'success' && pendingTicket) {
      setTicketNumber(pendingTicket.ticketNumber);
      setPendingTicket(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollPayment.phase]);

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!PHONE_REGEX.test(attendeePhone.trim())) {
      setFormError('Please enter a valid phone number');
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await eventService.register(event.slug, { attendeeName, attendeePhone });
      if (event.price > 0 && result.registration.status === 'pending_payment') {
        registrationIdRef.current = Number(result.registration.id);
        setPendingTicket({ id: Number(result.registration.id), ticketNumber: result.registration.ticketNumber });
        pollPayment.start();
      } else {
        setTicketNumber(result.registration.ticketNumber);
      }
      onRegistered?.();
    } catch (err: any) {
      setFormError(err?.message || 'Could not complete registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const retryEventPayment = async () => {
    if (!pendingTicket) return;
    setIsRetrying(true);
    setFormError('');
    try {
      await eventService.retryPayment(pendingTicket.id);
      pollPayment.start();
    } catch (err: any) {
      setFormError(err?.message || 'Could not retry payment. Please try again.');
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {ticketNumber
              ? 'Registered!'
              : pendingTicket
                ? 'Confirm Payment'
                : `Register for ${event.title}`}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {ticketNumber ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-gradient-to-br from-fitness-primary to-fitness-primary-dark rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-white" />
            </div>
            <p className="text-gray-700 mb-2">Your spot is reserved. A ticket with a QR code has been sent to your email.</p>
            <p className="font-mono text-sm text-gray-500 mb-6">{ticketNumber}</p>
            <button onClick={onClose} className="btn-fitness w-full">Done</button>
          </div>
        ) : pendingTicket ? (
          <div className="text-center py-4">
            {pollPayment.phase === 'failed' || pollPayment.phase === 'timeout' ? (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle size={32} className="text-red-500" />
                </div>
                <p className="text-gray-700 mb-2">
                  {pollPayment.phase === 'timeout'
                    ? "We didn't receive a confirmation in time. If you already paid, it may still go through — otherwise, try again."
                    : (pollPayment.lastResult?.paymentFailureReason ??
                      'The M-Pesa payment was cancelled or declined. Try again to confirm your spot.')}
                </p>
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-600 mb-4 text-left">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {formError}
                  </div>
                )}
                <button
                  onClick={retryEventPayment}
                  disabled={isRetrying}
                  className="btn-fitness w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isRetrying ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending M-Pesa STK push…
                    </>
                  ) : (
                    <>
                      <RefreshCw size={18} />
                      Retry Payment
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-fitness-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 size={32} className="text-fitness-primary animate-spin" />
                </div>
                <p className="text-gray-700 mb-2">Check your phone and enter your M-Pesa PIN to confirm your spot.</p>
                <p className="font-mono text-sm text-gray-500">{pendingTicket.ticketNumber}</p>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmitRegistration} className="space-y-4">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-600">
                <AlertCircle size={16} className="flex-shrink-0" />
                {formError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                required
                maxLength={100}
                value={attendeeName}
                onChange={(e) => setAttendeeName(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                required
                maxLength={20}
                value={attendeePhone}
                onChange={(e) => setAttendeePhone(e.target.value)}
                placeholder="+254 701 437 959"
                className="form-input"
              />
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
              {event.price > 0
                ? `KES ${event.price.toLocaleString()} — you'll get an M-Pesa STK push prompt to complete payment.`
                : 'This is a free event.'}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-fitness flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Registering...
                </>
              ) : (
                'Confirm Registration'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
