import { useQuestion } from "../context/questionscontext";

function Error() {
  const { ErrorMsg } = useQuestion();
  return (
    <p className="error">
      <span>💥</span> {ErrorMsg}
    </p>
  );
}

export default Error;
