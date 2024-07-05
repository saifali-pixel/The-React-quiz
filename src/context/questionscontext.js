import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  ErrorMsg: "",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: null,
};

const SECS_PER_QUESTIONS = 30;

//setstate
function reducer(state = initialState, action) {
  switch (action.type) {
    case "DataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "datafailed":
      return {
        ...state,
        questions: [],
        status: "error",
        ErrorMsg: action.payload,
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTIONS,
      };

    case "newAnswer":
      const currQues = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currQues.correctOption
            ? state.points + currQues.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
      };

    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };

    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      return state;
  }
}

function QuestionscontextProvider({ children }) {
  const [
    {
      questions,
      ErrorMsg,
      status,
      index,
      answer,
      points,
      highScore,
      secondRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);

        const data = await res.json();

        dispatch({ type: "DataReceived", payload: data });
        // console.log(data, "data");
      } catch (error) {
        dispatch({ type: "datafailed", payload: error.message });
      }
    }

    fetchQuestions();
  }, []);

  const numQuestions = questions.length;
  const totalPoints = questions
    .map((ques) => ques.points)
    .reduce((curr, acc) => curr + acc, 0);

  return (
    <QuestionsContext.Provider
      value={{
        numQuestions,
        dispatch,
        answer,
        highScore,
        totalPoints,
        ErrorMsg,
        status,
        index,
        points,
        secondRemaining,
        questions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestion() {
  const context = useContext(QuestionsContext);
  if (context === undefined)
    return console.log("using outside question Provider.");
  return context;
}

export { QuestionscontextProvider, useQuestion };
