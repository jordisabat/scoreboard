import { useEffect, useState } from "react";
import ScoreBoard from "./ScoreBoard";
import { Score } from "./ScoreTypes";
import dummyData from "../__tests__/fixtures/scores.fixtures";

const Home = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        try {
          setScores(dummyData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching scores:", error);
        }
      }, 2000);
    };

    fetchData();
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <ScoreBoard scores={scores} />
    </div>
  );
};

export default Home;
