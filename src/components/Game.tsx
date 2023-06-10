import { Chip } from "@material-tailwind/react";
import { GameEvent } from "../data/types";
import { capitalize, getInitials, getMinutesPassed } from "../utils/helper";

import { GameProps } from "./Interfaces";

const Game = (props: GameProps) => {
  const { id, homeTeam, awayTeam, gameEvents, status, startTime } = props;

  /*
{
    id: 1,
    homeTeam: "France",
    awayTeam: "Brazil",
    gameEvents: [{
      player: "Messi",
      minute: '1';
      type: "goal";
      team: "France";
    }],
    status: "scheduled",
  },
  */

  const getHomeScore = (): number => {
    const goals = gameEvents.filter(
      (g) => g.team === homeTeam && g.type === "goal"
    );
    return goals.length;
  };
  const getAwayScore = (): number => {
    const goals = gameEvents.filter(
      (g) => g.team === awayTeam && g.type === "goal"
    );
    return goals.length;
  };
  const getEventFormat = (event: GameEvent) => {
    return ` ${event.type}: ${getInitials(event.player)} ${getMinutesPassed(
      startTime,
      event.time
    )}'`;
  };

  return (
    <div data-testid="game" className="w-full">
      <div className="flex flex-col border-b-2 px-8 py-2">
        <div className="pb-2">
          Game {id} - {capitalize(status)}
        </div>
        <div className="flex flex-col">
          <div className="my-1 flex flex-row justify-between ">
            <div className="font-bold">{homeTeam}</div>
            <div className="">
              <Chip value={getHomeScore()} />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold">{awayTeam}</div>
            <div className="">
              <Chip value={getAwayScore()} />
            </div>
          </div>
        </div>
        <div>
          {gameEvents.map((e) => {
            return <div key={e.id}>{getEventFormat(e)}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Game;
