import Game from "./Game";
import { GameType } from "../data/types";

const ScoreBoard = ({ games }: { games: GameType[] }) => {
  return (
    <div className="mx-auto my-0">
      {!games.length ? (
        <>
          <h2>Scoreboard</h2>
          <p>No games yet</p>
        </>
      ) : (
        <div data-testid="scoreboard">
          {games.map((game) => (
            <Game
              id={game.id}
              homeTeam={game.homeTeam}
              awayTeam={game.awayTeam}
              homeScore={game.homeScore}
              awayScore={game.awayScore}
              status={game.status}
              key={game.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
