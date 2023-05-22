import { Score as ScoreType } from "../data/types";

export const sortScores = (scores: ScoreType[]): ScoreType[] => {
  return scores.sort((current, next) => {
    const currentTotalGoals = current.homeScore + current.awayScore;
    const nextTotalGoals = next.homeScore + next.awayScore;
    return nextTotalGoals - currentTotalGoals;
  });
};
