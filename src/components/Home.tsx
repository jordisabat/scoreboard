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

  const handleOpen = () => setIsModalOpen(!isModalOpen);

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

  const filteredGames: GameType[] = games ? filterGames(games) : [];

  return (
    <div className="m-0 mx-auto my-0 h-screen p-10 ">
      <ScoreBoard games={filteredGames} />
      <div className="flex flex-row  pt-4">
        <Button onClick={handleOpen}>Edit Game</Button>
      </div>
      <Dialog size="lg" open={isModalOpen} handler={handleOpen}>
        <DialogHeader>
          {}
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogHeader>
        <DialogBody divider>
          <ControlBoard games={filteredGames} onSave={handleOnChange} />
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
