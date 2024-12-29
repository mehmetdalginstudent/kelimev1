import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { GameStats } from '../types';

interface ScoreBoardProps {
  stats: GameStats;
  playerName: string;
  avatarUrl: string;
}

export function ScoreBoard({ stats, playerName, avatarUrl }: ScoreBoardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-5">
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={`${playerName}'in avatarı`}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="font-medium text-gray-800 text-lg">{playerName}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="text-green-700 font-bold text-xl">{stats.correctAnswers}</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" />
              <span className="text-red-700 font-bold text-xl">{stats.wrongAnswers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}