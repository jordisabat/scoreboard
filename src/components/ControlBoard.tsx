import { FormEvent, useState } from "react";
import { GameEvent, GameType, typeEvent } from "../data/types";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { capitalize } from "../utils/helper";
import { isGameEventValid, isGameValid } from "../utils/validations";
import AlertComponent from "../common/AlertComponent";

const GameEventTypes: string[] = ["goal", "yellow", "red"];

const ControlBoard = ({
  game: gameToEdit,
  onSave,
}: {
  game: GameType | undefined;
  onSave: (game: GameType) => void;
}) => {
  const defaultGame: GameType = {
    id: 0,
    homeTeam: "",
    awayTeam: "",
    gameEvents: [],
    status: "scheduled",
    startTime: "",
  };
  const [gameItem, setGameItem] = useState<GameType>(gameToEdit || defaultGame);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [type, setType] = useState<typeEvent>("goal");
  const [team, setTeam] = useState<string>("home");

  const getHighestID = (): number => {
    return gameItem.gameEvents.reduce((maxId, gameEvent) => {
      return gameEvent.id > maxId ? gameEvent.id : maxId;
    }, 0);
  };

  const handleEndGame = () => {
    gameItem.status = "finished";
    onSave(gameItem);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isGameValid(gameItem)) {
      if (gameItem.id === 0) {
        gameItem.id = getHighestID() + 1;
        gameItem.gameEvents = [];
        gameItem.homeTeam =
          (event.currentTarget["home-team"] as HTMLInputElement)?.value ?? "";
        gameItem.awayTeam =
          (event.currentTarget["away-team"] as HTMLInputElement)?.value ?? "";
        gameItem.status = "scheduled";
        onSave(gameItem);
      } else {
        if (gameItem.status === "scheduled") {
          gameItem.status = "in progress";
          gameItem.startTime = new Date().toISOString();
          onSave(gameItem);
        } else {
          const playerName = (event.currentTarget.player as HTMLInputElement)
            ?.value;

          const newGameEvent: GameEvent = {
            id: getHighestID() + 1,
            type: type,
            player: playerName,
            time: new Date().toISOString(),
            team: team,
          };

          if (isGameEventValid(newGameEvent)) {
            gameItem.gameEvents.push(newGameEvent);
            onSave(gameItem);
          } else {
            setShowErrorAlert(true);
          }
        }
      }
    } else {
      setShowErrorAlert(true);
    }
  };

  const handleHideAlert = () => {
    setShowErrorAlert(false);
  };

  const getButtonLabel = (): string => {
    if (gameItem.id === 0) {
      return "Add Game";
    }
    if (gameItem.status === "scheduled") {
      return "Start Game";
    } else {
      return "Add Event";
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col">
        {gameItem && gameItem.id === 0 && (
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
        )}
        {gameItem.status === "scheduled" ? (
          <>ready to start</>
        ) : (
          <div className="flex flex-col justify-around pb-4 md:flex-row">
            <div className="flex flex-col pb-4">
              <div className="pb-4">
                <div className="flex justify-start pb-2">
                  <label htmlFor="team-selector">Select team</label>
                </div>
                <div>
                  <Select
                    data-testid="team-selector"
                    id="team"
                    name="team"
                    onChange={(e) => {
                      setTeam(e as string);
                    }}
                  >
                    <Option key={gameItem.homeTeam} value={gameItem.homeTeam}>
                      {gameItem.homeTeam}
                    </Option>
                    <Option key={gameItem.awayTeam} value={gameItem.awayTeam}>
                      {gameItem.awayTeam}
                    </Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-4">
              <div className="pb-4">
                <div className="flex justify-start pb-2">
                  <label htmlFor="away-team">Game event</label>
                </div>
                <div>
                  <Select
                    data-testid="type-selector"
                    id="type"
                    name="type"
                    onChange={(e) => {
                      setType(e as typeEvent);
                    }}
                  >
                    {GameEventTypes.map((status) => (
                      <Option key={status} value={status}>
                        {capitalize(status)}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-4">
              <div>
                <label htmlFor="player">Player</label>
              </div>
              <div>
                <Input type="string" id="player" placeholder="Player" />
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-around pb-4">
          {gameItem.status === "in progress" && (
            <Button
              data-testid="end-game-button"
              variant="gradient"
              color="red"
              onClick={handleEndGame}
            >
              End Game
            </Button>
          )}
          <Button type="submit" variant="gradient" color="green">
            {getButtonLabel()}
          </Button>
        </div>
        <AlertComponent
          showAlert={showErrorAlert}
          hideAlert={handleHideAlert}
          color="red"
          message="Error: All fields are required!"
        />
      </div>
    </form>
  );
};

export default ControlBoard;
