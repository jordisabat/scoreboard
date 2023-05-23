import ScoreBoard from "./ScoreBoard";
import fetchData from "../data/fetchData";
import { filterGames } from "../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { GameType } from "../data/types";
import ControlBoard from "./ControlBoard";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Alert,
} from "@material-tailwind/react";

const Home = () => {
  const results = useQuery(["games"], fetchData, {
    refetchInterval: 600000, // we can set this to 1 minute to keep the data fresh
  });
  const [games, setGames] = useState<GameType[]>([] as GameType[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const defaultGame: GameType = {
    id: 0,
    homeTeam: "",
    awayTeam: "",
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
  };
  const [game, setGame] = useState(defaultGame);

  const handleOpen = () => setIsModalOpen(!isModalOpen);

  const handleOpenGame = (game: GameType) => {
    setGame(game);
    handleOpen();
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 5000);
  };

  // this will not be used in the final version
  useEffect(() => {
    if (results.data) {
      setGames(results.data);
    }
  }, [results.data]);

  const getHighestID = (): number => {
    return games.reduce((maxId, game) => {
      return game.id > maxId ? game.id : maxId;
    }, 0);
  };

  const handleOnChange = (updatedGame: GameType) => {
    // here we will call the POST endpoint to save the game
    // for now we will just update the state

    if (updatedGame.id === 0) {
      updatedGame.id = getHighestID() + 1;
      setGames((prev) => [...prev, updatedGame]);
    } else {
      setGames((prev) =>
        prev.map((game): GameType => {
          if (game.id === updatedGame.id) {
            return updatedGame;
          }
          return game;
        })
      );
    }
    handleSave();
    handleOpen();
  };

  const handleAddGame = () => {
    setGame(defaultGame);
    handleOpen();
  };

  const filteredGames: GameType[] = games ? filterGames(games) : [];

  return (
    <div className="m-0 mx-auto my-0 h-screen p-10 ">
      <ScoreBoard games={filteredGames} onOpenGame={handleOpenGame} />
      <div className="flex flex-row  pt-4">
        <Button onClick={handleAddGame}>Add Game</Button>
      </div>
      <Dialog size="lg" open={isModalOpen} handler={handleOpen}>
        <DialogHeader>
          <div className="flex flex-row">
            {game.id === 0 ? "Add new game" : "Edit game"}
          </div>
          <div className="ml-auto">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
          </div>
        </DialogHeader>
        <DialogBody divider>
          <ControlBoard game={game} onSave={handleOnChange} />
        </DialogBody>
      </Dialog>

      <div className="flex w-full flex-col gap-2 pt-8">
        <Alert
          color="green"
          variant="outlined"
          open={saved}
          onClose={() => setSaved(false)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          Game saved successfully!
        </Alert>
      </div>
    </div>
  );
};

export default Home;
