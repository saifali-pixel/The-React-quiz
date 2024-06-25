/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import Progress from "./components/Progress";
import NextButton from "./components/NextButton";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";

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
function reducer(state, action) {
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
      return initialState;
  }
}

function App() {
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
        // console.log(data);
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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error msg={ErrorMsg} />}

        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              totalPoints={totalPoints}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondRemaining={secondRemaining} dispatch={dispatch} />

              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

function Timer({ secondRemaining, dispatch }) {
  const min = secondRemaining / 60;
  const sec = secondRemaining % 60;

  // console.log(min.toFixed(0));

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {min < 10 ? `0${min.toFixed(0)}` : min}:{sec < 10 ? `0${sec}` : `${sec}`}
    </div>
  );
}

export default App;
