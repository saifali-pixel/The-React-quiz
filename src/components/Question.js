import { useQuestion } from "../context/questionscontext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuestion();
  return (
    <div>
      <h4>{questions.at(index).question}</h4>
      <Options />
    </div>
  );
}

export default Question;
