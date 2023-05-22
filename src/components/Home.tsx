import { useEffect, useState } from "react";
import ScoreBoard from "./ScoreBoard";
import { Score as StoreType } from "../data/types";
import fetchData from "../data/fetchData";
import { sortScores } from "../utils/helper";

const Home = () => {
  const [scores, setScores] = useState<StoreType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAndSortData = async () => {
      try {
        setLoading(true);
        const initialData: StoreType[] = await fetchData();
        const sortedData = sortScores(initialData);
        setScores(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    void loadAndSortData();
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
