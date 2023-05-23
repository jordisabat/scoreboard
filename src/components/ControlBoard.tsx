import { useState } from "react";
import { GameType, GameStatus } from "../data/types";

const defaultGame: GameType = {
  id: 0,
  homeTeam: "",
  awayTeam: "",
  homeScore: 0,
  awayScore: 0,
  status: "scheduled",
};

const GameStatusList: string[] = ["scheduled", "in progress", "final"];

interface IProps {
  games: GameType[];
  onSave: (game: GameType) => void;
}

const ControlBoard = (props: IProps) => {
  const [game, setGame] = useState<GameType>(defaultGame);
  const { games, onSave } = props || [];
  const [saved, setSaved] = useState(false);

  return (
    <div className="m-4 mx-auto my-0 flex w-[450px] flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setGame(defaultGame);
          setSaved(true);
          onSave(game);
        }}
      >
        <div className="pb-2 ">
          <label htmlFor="home-team">
            Select game
            <select
              data-testid="game-selector"
              id="id"
              name="id"
              onChange={(e) => {
                setSaved(false);
                setGame(
                  games.find((g) => g.id === parseInt(e.target.value)) ??
                    defaultGame
                );
              }}
            >
              <option key={0} value={0}>
                Add new game...
              </option>
              {games.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.homeTeam + " vs " + g.awayTeam}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="pb-2 ">
          <label htmlFor="away-team">
            Status
            <select
              data-testid="status-selector"
              id="status"
              name="status"
              value={game.status}
              onChange={(e) => {
                setGame({ ...game, status: e.target.value as GameStatus });
              }}
            >
              {GameStatusList.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-row pb-2 ">
          <label htmlFor="home-team">
            Home Team
            <input
              type="text"
              id="home-team"
              placeholder="Home Team"
              value={game.homeTeam}
              onChange={(e) => {
                setGame({ ...game, homeTeam: e.target.value });
              }}
            />
          </label>

          <label htmlFor="away-team">
            Away Team
            <input
              type="text"
              id="away-team"
              placeholder="Away Team"
              value={game.awayTeam}
              onChange={(e) => {
                setGame({ ...game, awayTeam: e.target.value });
              }}
            />
          </label>
        </div>
        <div className="flex flex-row pb-2">
          <label htmlFor="home-score">
            Home Score
            <input
              type="number"
              id="home-score"
              placeholder="Home Score"
              value={game.homeScore}
              onChange={(e) => {
                setGame({ ...game, homeScore: parseInt(e.target.value) });
              }}
            />
          </label>
          <label htmlFor="away-score">
            Away Score
            <input
              type="number"
              id="away-score"
              placeholder="Away Score"
              value={game.awayScore}
              onChange={(e) => {
                setGame({ ...game, awayScore: parseInt(e.target.value) });
              }}
            />
          </label>
        </div>
        <button className="rounded bg-orange-500 p-2 text-white" type="submit">
          {game.id == 0 ? "Add Game" : "Update Game"}
        </button>
      </form>
      {saved && <p className="text-success fw-bold">Game saved correctly!</p>}
    </div>
  );
};

export default ControlBoard;
