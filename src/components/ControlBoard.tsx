import { useState } from "react";
import { GameType, GameStatus } from "../data/types";
import { Button, Input } from "@material-tailwind/react";

const GameStatusList: string[] = ["Scheduled", "In progress", "Finished"];

interface IProps {
  gameToEdit: GameType;
  onSave: (game: GameType) => void;
}

const ControlBoard = (props: IProps) => {
  const { gameToEdit, onSave } = props || [];

  const [game, setGame] = useState<GameType>(gameToEdit);

  const handleOnChange = () => {
    onSave(game);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-around pb-4 md:flex-row">
        <div className="pb-4">
          <div>
            <label htmlFor="away-team">Game status</label>
          </div>
          <div>
            <select
              data-testid="status-selector"
              id="status"
              name="status"
              value={game.status}
              onChange={(e) => {
                const newStatus = e.target.value.toLowerCase() as GameStatus;
                setGame({ ...game, status: newStatus });
              }}
            >
              {GameStatusList.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around pb-4 md:flex-row">
        <div className="flex flex-col pb-4">
          <label htmlFor="home-team">Home Team</label>
          <Input
            type="text"
            id="home-team"
            placeholder="Home Team"
            value={game.homeTeam}
            onChange={(e) => {
              setGame({ ...game, homeTeam: e.target.value });
            }}
          />
        </div>

        <div className="flex flex-col pb-4">
          <div>
            <label htmlFor="away-team">Away Team</label>
          </div>
          <div>
            <Input
              type="text"
              id="away-team"
              placeholder="Away Team"
              value={game.awayTeam}
              onChange={(e) => {
                setGame({ ...game, awayTeam: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around pb-4 md:flex-row">
        <div className="flex flex-col pb-4">
          <div>
            <label htmlFor="home-score">Home Score</label>
          </div>
          <div>
            <Input
              type="number"
              id="home-score"
              placeholder="Home Score"
              value={game.homeScore}
              onChange={(e) => {
                setGame({ ...game, homeScore: parseInt(e.target.value) });
              }}
            />
          </div>
        </div>
        <div className="flex flex-col pb-4">
          <div>
            <label htmlFor="away-score">Away Score</label>
          </div>
          <div>
            <Input
              type="number"
              id="away-score"
              placeholder="Away Score"
              value={game.awayScore}
              onChange={(e) => {
                setGame({ ...game, awayScore: parseInt(e.target.value) });
              }}
            />
          </div>
        </div>
      </div>
      <div className="ml-auto pb-4">
        <Button variant="gradient" color="green" onClick={handleOnChange}>
          {game.id == 0 ? "Add Game" : "Update Game"}
        </Button>
      </div>
    </div>
  );
};

export default ControlBoard;
