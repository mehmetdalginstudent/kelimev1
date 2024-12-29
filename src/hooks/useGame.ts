import { useState, useCallback } from 'react';
import { CurrentQuestion, GameStats, Player } from '../types';
import { getRandomQuestion } from '../data/letters';

export function useGame() {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(getRandomQuestion());
  const [gameStats, setGameStats] = useState<GameStats>({
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 0
  });
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = useCallback(async (answer: boolean) => {
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setGameStats(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
      totalQuestions: prev.totalQuestions + 1
    }));

    if (gameStats.totalQuestions + 1 >= 10) {
      setGameOver(true);
      return true; // Return true to indicate game over
    } else {
      setCurrentQuestion(getRandomQuestion());
      return false; // Return false to indicate game continues
    }
  }, [currentQuestion, gameStats.totalQuestions]);

  const resetGame = useCallback(() => {
    setGameStats({
      correctAnswers: 0,
      wrongAnswers: 0,
      totalQuestions: 0
    });
    setGameOver(false);
    setCurrentQuestion(getRandomQuestion());
  }, []);

  return {
    currentQuestion,
    gameStats,
    gameOver,
    handleAnswer,
    resetGame
  };
}