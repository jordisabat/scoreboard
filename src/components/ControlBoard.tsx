import { useState } from "react";
import { GameType, GameStatus } from "../data/types";
import { Button, Input } from "@material-tailwind/react";
import { capitalize } from "../utils/helper";

const GameStatusList: string[] = ["scheduled", "in progress", "finished"];

interface IProps {
  game: GameType;
  onSave: (game: GameType) => void;
}

const ControlBoard = (props: IProps) => {
  const { game: gameToEdit, onSave } = props || [];

  const [gameItem, setGameItem] = useState<GameType>(gameToEdit);

  const handleOnChange = () => {
    onSave(gameItem);
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
              value={gameItem.status}
              onChange={(e) => {
                setGameItem({
                  ...gameItem,
                  status: e.target.value as GameStatus,
                });
              }}
            >
              {GameStatusList.map((status) => (
                <option key={status} value={status} label={capitalize(status)}>
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
            value={gameItem.homeTeam}
            onChange={(e) => {
              setGameItem({ ...gameItem, homeTeam: e.target.value });
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
              value={gameItem.awayTeam}
              onChange={(e) => {
                setGameItem({ ...gameItem, awayTeam: e.target.value });
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
              value={gameItem.homeScore}
              onChange={(e) => {
                setGameItem({
                  ...gameItem,
                  homeScore: parseInt(e.target.value),
                });
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
              value={gameItem.awayScore}
              onChange={(e) => {
                setGameItem({
                  ...gameItem,
                  awayScore: parseInt(e.target.value),
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="ml-auto pb-4">
        <Button variant="gradient" color="green" onClick={handleOnChange}>
          {gameItem.id == 0 ? "Add Game" : "Update Game"}
        </Button>
      </div>
    </div>
  );
};

export default ControlBoard;
