import { Chip } from "@material-tailwind/react";
import React from "react";

import { GameProps } from "./Interfaces";

const Game = (props: GameProps) => {
  const { id, homeTeam, awayTeam, homeScore, awayScore, status } = props;

  return (
    <div data-testid="game" className="w-full">
      <div className="flex flex-col px-8">
        <div className="pb-2">
          Game {id} - {status}
        </div>
        <div className="flex flex-col ">
          <div className="flex flex-row justify-between">
            <div className="font-bold">{homeTeam}</div>
            <div className="">
              <Chip value={homeScore} />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold">{awayTeam}</div>
            <div className="">
              <Chip value={awayScore} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
