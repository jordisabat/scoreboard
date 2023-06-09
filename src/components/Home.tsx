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

  const [game, setGame] = useState<GameType | undefined>();

  const handleModal = () => setShowModal(!showModal);

  const handleOpenGame = (game: GameType) => {
    setGame(game);
    handleModal();
  };

  const handleHideAlert = () => {
    setShowAlert(false);
  };

  const handleAddGame = () => {
    setGame(undefined);
    handleModal();
  };

  const updateGames = (games: GameType[]) => {
    const filteredGames: GameType[] = games ? filterGames(games) : [];
    console.log(filteredGames);
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
    setShowAlert(true);
    handleModal();
  };

  return (
    <div className="m-0 mx-auto my-0 h-screen p-10 ">
      <ScoreBoard games={games} onOpenGame={handleOpenGame} />
      <div className="flex flex-row  pt-4">
        <Button onClick={handleAddGame}>Add Game</Button>
      </div>
      <Dialog size="lg" open={showModal} handler={handleModal}>
        <DialogHeader>
          <div className="flex flex-row">
            {game && game.id === 0 && "Add new game"}
            {game && game.id > 0 && `${game.homeTeam} vs ${game.awayTeam}`}
          </div>
          <div className="ml-auto">
            <Button
              variant="text"
              color="red"
              onClick={handleModal}
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
      <AlertComponent
        showAlert={showAlert}
        hideAlert={handleHideAlert}
        color="green"
        message={
          game && game.id !== 0
            ? `Game ${game.id} - ${game.homeTeam} vs ${game.awayTeam} - updated!`
            : "Game added successfully!"
        }
      />
    </div>
  );
};

export default Home;