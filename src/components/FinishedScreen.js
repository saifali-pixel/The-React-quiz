import { useQuestion } from "../context/questionscontext";

function FinishedScreen() {
  const { points, totalPoints, highScore, dispatch } = useQuestion();

  const perc = (points / totalPoints) * 100;

  let emoji;

  if (perc === 0) emoji = "😱";
  if (perc >= 80 && perc < 100) emoji = "🎉";
  if (perc >= 50 && perc < 80) emoji = "😊";
  if (perc >= 10 && perc < 50) emoji = "🙂";
  if (perc === 100) emoji = "😎";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {totalPoints} ({Math.ceil(perc)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishedScreen;
