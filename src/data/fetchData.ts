import { QueryFunction } from "@tanstack/react-query";
import { Game } from "./types";
import { initialData } from "./data";

const fakeFetchAPiCall = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(initialData), 2000);
  });

const fetchData: QueryFunction<Game[]> = async () => {
  const apiRes = await fakeFetchAPiCall();

  if (!apiRes) {
    throw new Error("API call failed");
  }

  return apiRes as Game[];
};
export default fetchData;
