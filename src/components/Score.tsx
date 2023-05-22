import React from "react";

import { ScoreProps } from "./Interfaces";

const Score = (props: ScoreProps) => {
  const { id, homeTeam, awayTeam, homeScore, awayScore, status } = props;

  return (
    <div data-testid="score">
      {id}. {homeTeam} {homeScore} - {awayTeam} {awayScore} ({status})
    </div>
  );
};

export default Score;
