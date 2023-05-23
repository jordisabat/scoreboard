import ScoreBoard from "./ScoreBoard";
import fetchData from "../data/fetchData";
import { filterGames } from "../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { GameType } from "../data/types";
import ControlBoard from "./ControlBoard";

const Home = () => {
  const results = useQuery(["games"], fetchData);

  const handleOnChange = (game: GameType) => {
    console.log("game to save", game);
  };

  if (results.isLoading) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">Loading...</div>
      </div>
    );
  }

  const games: GameType[] = results?.data ? filterGames(results?.data) : [];

  return (
    <div className="m-0 h-screen p-10">
      <ScoreBoard games={games} />
      <ControlBoard games={games} onSave={handleOnChange} />
    </div>
  );
};

export default Home;
