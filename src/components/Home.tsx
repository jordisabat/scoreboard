import ScoreBoard from "./ScoreBoard";
import fetchData from "../data/fetchData";
import { sortGames } from "../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { GameType } from "../data/types";

const Home = () => {
  const results = useQuery(["games"], fetchData);

  if (results.isLoading) {
    return <p>Loading...</p>;
  }

  const games: GameType[] = results?.data ? sortGames(results?.data) : [];

  return (
    <div className="App">
      <ScoreBoard games={games} />
    </div>
  );
};

export default Home;
