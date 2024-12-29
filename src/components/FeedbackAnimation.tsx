import React from 'react';
import { Check, X } from 'lucide-react';

interface FeedbackAnimationProps {
  isVisible: boolean;
  isCorrect: boolean;
}

export function FeedbackAnimation({ isVisible, isCorrect }: FeedbackAnimationProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div
        className={`
          ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
          rounded-full p-8 animate-feedback
        `}
      >
        {isCorrect ? (
          <Check className="w-16 h-16 text-white" />
        ) : (
          <X className="w-16 h-16 text-white" />
        )}
      </div>
    </div>
  );
}