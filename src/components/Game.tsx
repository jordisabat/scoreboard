import React from "react";

import { GameProps } from "./Interfaces";

const Game = (props: GameProps) => {
  const { id, homeTeam, awayTeam, homeScore, awayScore, status } = props;

  return (
    <div data-testid="game">
      {id}. {homeTeam} {homeScore} - {awayTeam} {awayScore} ({status})
    </div>
  );
};

export default Game;
