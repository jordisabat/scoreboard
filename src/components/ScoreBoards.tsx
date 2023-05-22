import Score from "./Score";
import { Score as ScoreType } from "./ScoreTypes";

const ScoreBoards = ({ scores }: { scores: ScoreType[] }) => {
  return (
    <div className="scoreboards">
      {!scores.length ? (
        <>
          <h2>Scoreboards</h2>
          <p>No scores yet</p>
        </>
      ) : (
        <div data-testid="scoreboard">
          {scores.map((score) => (
            <Score
              id={score.id}
              homeTeam={score.homeTeam}
              awayTeam={score.awayTeam}
              homeScore={score.homeScore}
              awayScore={score.awayScore}
              status={score.status}
              key={score.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreBoards;
