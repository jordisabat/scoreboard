import ScoreBoard from "./ScoreBoard";
import fetchData from "../data/fetchData";
import { sortGames } from "../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { GameType } from "../data/types";

const Home = () => {
  const results = useQuery(["games"], fetchData);

  if (results.isLoading) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">Loading...</div>
      </div>
    );
  }

  const games: GameType[] = results?.data ? sortGames(results?.data) : [];

  return (
    <div className="m-0 h-screen p-10">
      <ScoreBoard games={games} />
    </div>
  );
};

export default Home;
