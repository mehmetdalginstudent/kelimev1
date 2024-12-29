export interface CurrentQuestion {
  letter: string;
  words: string[];
  correctAnswer: boolean;
}

export interface Player {
  name: string;
  avatarId: number;
}

export interface GameStats {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  avatarId: number;
  score: number;
  date: string;
}