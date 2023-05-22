import ScoreBoard from "./ScoreBoard";
import fetchData from "../data/fetchData";
import { sortScores } from "../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { Game } from "../data/types";

const Home = () => {
  const results = useQuery(["scores"], fetchData);

  if (results.isLoading) {
    return <p>Loading...</p>;
  }

  const scores: Game[] = results?.data ? sortScores(results?.data) : [];

  return (
    <div className="App">
      <ScoreBoard scores={scores} />
    </div>
  );
};

export default Home;
