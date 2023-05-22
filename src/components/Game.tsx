import React from "react";

import { GameProps } from "./Interfaces";

const Game = (props: GameProps) => {
  const { id, homeTeam, awayTeam, homeScore, awayScore, status } = props;

  return (
    <div data-testid="game" className="m-4 rounded bg-slate-200 px-8 py-4">
      {id}. {homeTeam} {homeScore} - {awayTeam} {awayScore} ({status})
    </div>
  );
};

export default Game;
