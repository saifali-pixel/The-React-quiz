import { useEffect } from "react";
import { useQuestion } from "../context/questionscontext";

function Timer() {
  const { secondRemaining, dispatch } = useQuestion();
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
export default Timer;
