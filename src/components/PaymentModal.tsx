import React, { useState } from 'react';
import { useStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  price: number;
}

export function PaymentModal({ isOpen, onClose, courseId, courseTitle, price }: PaymentModalProps) {
  const stripe = useStripe();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please sign in to enroll in courses');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          userId: user.id,
          priceId: price,
        }),
      });

      const session = await response.json();

      if (session.error) {
        toast.error('Payment failed. Please try again.');
        return;
      }

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Enroll in Course</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{courseTitle}</h3>
          <p className="text-gray-600">Price: ${price}</p>
        </div>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}