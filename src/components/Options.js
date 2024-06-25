function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          key={option}
          className={`btn btn-option ${answer === i ? "answer" : ""} ${
            answer !== null
              ? i === question.correctOption
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
