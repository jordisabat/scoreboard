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
} from "@material-tailwind/react";
import AlertComponent from "../common/AlertComponent";

const Home = () => {
  const results = useQuery(["games"], fetchData, {
    refetchInterval: 600000, // with a real API we should configure this
  });
  const [games, setGames] = useState<GameType[]>([] as GameType[]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const defaultGame: GameType = {
    id: 0,
    homeTeam: "",
    awayTeam: "",
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
  };
  const [game, setGame] = useState(defaultGame);

  const handleOpen = () => setShowModal(!showModal);

  const handleOpenGame = (game: GameType) => {
    setGame(game);
    handleOpen();
  };

  const handleSave = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleAddGame = () => {
    setGame(defaultGame);
    handleOpen();
  };

  const updateGames = (games: GameType[]) => {
    const filteredGames: GameType[] = games ? filterGames(games) : [];
    setGames(filteredGames);
  };

  const getHighestID = (): number => {
    return games.reduce((maxId, game) => {
      return game.id > maxId ? game.id : maxId;
    }, 0);
  };

  // this will not be used in the final version
  useEffect(() => {
    if (results.data) {
      updateGames(results.data);
    }
  }, [results.data]);

  // here we will call the POST endpoint to save the game
  // for now we will just update the state
  const handleOnChange = (updatedGame: GameType) => {
    if (updatedGame.id === 0) {
      updatedGame.id = getHighestID() + 1;

      updateGames([...games, updatedGame]);
    } else {
      updateGames(
        games.map((game): GameType => {
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

  return (
    <div className="m-0 mx-auto my-0 h-screen p-10 ">
      <ScoreBoard games={games} onOpenGame={handleOpenGame} />
      <div className="flex flex-row  pt-4">
        <Button onClick={handleAddGame}>Add Game</Button>
      </div>
      <Dialog size="lg" open={showModal} handler={handleOpen}>
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
      <AlertComponent showAlert={showAlert} closeAlert={handleSave} />
    </div>
  );
};

export default Home;
