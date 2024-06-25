import { useQuestion } from "../context/questionscontext";

function Options() {
  const { questions, dispatch, answer, index } = useQuestion();

  return (
    <div className="options">
      {questions.at(index).options.map((option, i) => (
        <button
          key={option}
          className={`btn btn-option ${answer === i ? "answer" : ""} ${
            answer !== null
              ? i === questions.at(index).correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
