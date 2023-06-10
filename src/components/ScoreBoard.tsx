import Game from "./Game";
import { GameType } from "../data/types";
import { List, ListItem, Card } from "@material-tailwind/react";

const ScoreBoard = ({
  games,
  onOpenGame,
}: {
  games: GameType[];
  onOpenGame: (game: GameType) => void;
}) => {
  return (
    <div className="w-[450px]">
      {!games.length ? (
        <>
          <h2>Scoreboard</h2>
          <p>No games yet</p>
        </>
      ) : (
        <div data-testid="scoreboard">
          <Card>
            <List>
              {games.map((game) => (
                <ListItem key={game.id} onClick={() => onOpenGame(game)}>
                  <Game
                    id={game.id}
                    homeTeam={game.homeTeam}
                    awayTeam={game.awayTeam}
                    gameEvents={game.gameEvents}
                    status={game.status}
                    startTime={game.startTime}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
