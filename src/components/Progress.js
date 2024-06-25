import { useQuestion } from "../context/questionscontext";

function Progress() {
  const { points, index, numQuestions, totalPoints } = useQuestion();
  return (
    <header className="progress">
      <progress max={totalPoints} value={points} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> /{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
