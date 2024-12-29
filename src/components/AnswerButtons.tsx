import React from 'react';
import { Check, X } from 'lucide-react';

interface AnswerButtonsProps {
  onAnswer: (answer: boolean) => void;
  disabled: boolean;
}

export function AnswerButtons({ onAnswer, disabled }: AnswerButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => onAnswer(true)}
        disabled={disabled}
        className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 text-xl flex items-center justify-center gap-2 hover:scale-105"
      >
        <Check className="w-6 h-6" />
        Evet
      </button>
      <button
        onClick={() => onAnswer(false)}
        disabled={disabled}
        className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 text-xl flex items-center justify-center gap-2 hover:scale-105"
      >
        <X className="w-6 h-6" />
        Hayır
      </button>
    </div>
  );
}