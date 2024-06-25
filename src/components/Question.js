import { useQuestion } from "../context/questionscontext";
import Options from "./Options";

function Question() {
  const { question } = useQuestion();
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
