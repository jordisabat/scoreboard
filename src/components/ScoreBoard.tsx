import Game from "./Game";
import { GameType } from "../data/types";
import { List, ListItem, Card } from "@material-tailwind/react";

const ScoreBoard = ({ games }: { games: GameType[] }) => {
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
                <ListItem
                  key={game.id}
                  onClick={() => console.log(`Open modal for ${game.id}`)}
                >
                  <Game
                    id={game.id}
                    homeTeam={game.homeTeam}
                    awayTeam={game.awayTeam}
                    homeScore={game.homeScore}
                    awayScore={game.awayScore}
                    status={game.status}
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
