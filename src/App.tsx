import React, { useState } from 'react';
import { GameCard } from './components/GameCard';
import { AnimatedBackground } from './components/AnimatedBackground';
import { PlayerSetup } from './components/PlayerSetup';
import { ScoreBoard } from './components/ScoreBoard';
import { Leaderboard } from './components/Leaderboard';
import { Player } from './types';
import { avatars } from './data/avatars';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useGame } from './hooks/useGame';

export default function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const { entries: leaderboard, loading: leaderboardLoading, addEntry } = useLeaderboard();
  const { currentQuestion, gameStats, gameOver, handleAnswer, resetGame } = useGame();

  const handlePlayerAnswer = async (answer: boolean) => {
    const isGameOver = await handleAnswer(answer);
    if (isGameOver && player) {
      await addEntry({
        playerName: player.name,
        avatarId: player.avatarId,
        score: gameStats.correctAnswers + (answer === currentQuestion.correctAnswer ? 1 : 0)
      });
    }
  };

  const handleNewPlayer = () => {
    setPlayer(null);
    resetGame();
  };

  const avatarUrl = player ? (avatars.find(a => a.id === player.avatarId)?.url || avatars[0].url) : '';

  return (
    <div className="min-h-screen flex items-start justify-center p-4 pt-8 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Main Game Area */}
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto relative">
        {/* Top Bar with Leaderboard and ScoreBoard */}
        {player && (
          <div className="w-full flex justify-between items-start mb-8 gap-4">
            {!leaderboardLoading && (
              <div className="hidden md:block absolute left-4">
                <Leaderboard entries={leaderboard.slice(0, 5)} />
              </div>
            )}
            <div className="absolute right-4">
              <ScoreBoard
                stats={gameStats}
                playerName={player.name}
                avatarUrl={avatarUrl}
              />
            </div>
          </div>
        )}

        {/* Game Card - Centered and Moved Up */}
        <div className="w-full max-w-md mx-auto mt-20 md:mt-16">
          {!player ? (
            <PlayerSetup onComplete={setPlayer} />
          ) : (
            <GameCard
              gameOver={gameOver}
              score={gameStats.correctAnswers}
              questionCount={gameStats.totalQuestions}
              currentQuestion={currentQuestion}
              onAnswer={handlePlayerAnswer}
              onRestart={resetGame}
              onNewPlayer={handleNewPlayer}
            />
          )}
        </div>

        {/* Mobile Leaderboard - Only shown when game is over */}
        {player && gameOver && !leaderboardLoading && (
          <div className="mt-6 w-full max-w-md mx-auto md:hidden">
            <Leaderboard entries={leaderboard.slice(0, 5)} />
          </div>
        )}
      </div>
    </div>
  );
}