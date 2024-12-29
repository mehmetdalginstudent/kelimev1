import React, { useState } from 'react';
import { CurrentQuestion } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { ProgressBar } from './ProgressBar';
import { FeedbackAnimation } from './FeedbackAnimation';
import { WordDisplay } from './WordDisplay';
import { AnswerButtons } from './AnswerButtons';
import { GameOver } from './GameOver';

interface GameCardProps {
  gameOver: boolean;
  score: number;
  questionCount: number;
  currentQuestion: CurrentQuestion;
  onAnswer: (isCorrect: boolean) => void;
  onRestart: () => void;
  onNewPlayer: () => void;
}

export function GameCard({ 
  gameOver, 
  score, 
  questionCount, 
  currentQuestion, 
  onAnswer, 
  onRestart,
  onNewPlayer 
}: GameCardProps) {
  const [timerKey, setTimerKey] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === true;
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(answer);
      setTimerKey(prev => prev + 1);
    }, 1000);
  };

  const handleTimeout = () => {
    setLastAnswerCorrect(false);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(false);
      setTimerKey(prev => prev + 1);
    }, 1000);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Kelime Okuma</h1>
        <p className="text-gray-600 mb-4 sm:mb-6">Skor: {score} / {questionCount}</p>
      </div>

      {!gameOver ? (
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <ProgressBar current={questionCount} total={10} />
          <WordDisplay word={currentQuestion.words[0]} />
          <CountdownTimer
            key={timerKey}
            duration={10}
            onTimeout={handleTimeout}
            isActive={!gameOver && !showFeedback}
          />
          <AnswerButtons
            onAnswer={handleAnswer}
            disabled={showFeedback}
          />
        </div>
      ) : (
        <GameOver
          score={score}
          onRestart={onRestart}
          onNewPlayer={onNewPlayer}
        />
      )}
      
      <FeedbackAnimation
        isVisible={showFeedback}
        isCorrect={lastAnswerCorrect}
      />
    </div>
  );
}