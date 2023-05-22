import React from "react";

interface ScoreProps {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
}

const Score = (props: ScoreProps) => {
  const { id, homeTeam, awayTeam, homeScore, awayScore, status } = props;

  return (
    <div>
      {id} {homeTeam} {homeScore} vs {awayTeam} {awayScore} ({status})
    </div>
  );
};

export default Score;
